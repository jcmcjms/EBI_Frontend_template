import { apiClient } from '@/lib/apiClient'
import type { User, PaginatedResponse, PaginationParams, Role } from '@/lib/types'

export const usersApi = {
  getAll: (params: PaginationParams & { search?: string }) =>
    apiClient.get<PaginatedResponse<User>>('/api/users', { params }),

  getById: (id: string) => apiClient.get<User>(`/api/users/${id}`),

  create: (data: Partial<User> & { password: string }) =>
    apiClient.post<User>('/api/users', data),

  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(`/api/users/${id}`, data),

  delete: (id: string) => apiClient.delete(`/api/users/${id}`),

  toggleActive: (id: string) =>
    apiClient.post<User>(`/api/users/${id}/toggle-active`),

  getRoles: () => apiClient.get<Role[]>('/api/roles'),
}
