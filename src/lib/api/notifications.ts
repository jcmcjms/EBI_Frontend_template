import { apiClient } from '@/lib/apiClient'
import type { Notification } from '@/lib/types'

export const notificationsApi = {
  getAll: () => apiClient.get<Notification[]>('/api/notifications'),

  markAsRead: (id: string) =>
    apiClient.post(`/api/notifications/${id}/read`),

  markAllAsRead: () => apiClient.post('/api/notifications/read-all'),

  delete: (id: string) => apiClient.delete(`/api/notifications/${id}`),
}
