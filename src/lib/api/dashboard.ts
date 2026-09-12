import { apiClient } from '@/lib/apiClient'
import type { DashboardSummary, DashboardTrend } from '@/lib/types'

export const dashboardApi = {
  getSummary: () =>
    apiClient.get<DashboardSummary>('/api/dashboard/summary'),

  getWeeklyTrend: () =>
    apiClient.get<DashboardTrend[]>('/api/dashboard/weekly-trend'),
}
