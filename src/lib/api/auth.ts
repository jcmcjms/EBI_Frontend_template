import { apiClient } from '@/lib/apiClient'
import type { UserSession } from '@/lib/types'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: UserSession
}

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/api/auth/login', data),

  refresh: () =>
    apiClient.post<{ accessToken: string }>('/api/auth/refresh'),

  logout: () => apiClient.post('/api/auth/logout'),

  changePassword: (data: {
    currentPassword: string
    newPassword: string
  }) => apiClient.post('/api/auth/change-password', data),
}
