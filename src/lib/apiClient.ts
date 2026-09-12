import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/authStore'
import type { ApiError } from '@/lib/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content')
    if (csrfToken && config.headers) {
      config.headers['X-CSRF-TOKEN'] = csrfToken
    }

    return config
  },
  (error) => Promise.reject(error)
)

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config
    if (!originalRequest) return Promise.reject(error)

    const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh')
    const isLoginEndpoint = originalRequest.url?.includes('/auth/login')

    if (
      error.response?.status === 401 &&
      !isRefreshEndpoint &&
      !isLoginEndpoint
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return apiClient(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      isRefreshing = true

      try {
        const { data } = await apiClient.post('/api/auth/refresh')
        const newToken = data.accessToken

        useAuthStore.getState().setAccessToken(newToken)
        processQueue(null, newToken)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`
        }
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        useAuthStore.getState().logout()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message
    }
    if (error.response?.data?.errors) {
      const validationErrors = Object.values(error.response.data.errors).flat()
      const firstError = validationErrors[0]
      return (typeof firstError === 'string' ? firstError : 'Validation error occurred') || 'Validation error occurred'
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.'
    }
    if (!error.response) {
      return 'Network error. Please check your connection.'
    }
    return `Error ${error.response.status}: ${error.response.statusText}`
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}
