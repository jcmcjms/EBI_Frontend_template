import { apiClient } from '@/lib/apiClient'
import type { Loan, PaginatedResponse, PaginationParams, LoanProduct } from '@/lib/types'

export interface LoanFilters extends PaginationParams {
  search?: string
  status?: string
}

export const loansApi = {
  getAll: (params: LoanFilters) =>
    apiClient.get<PaginatedResponse<Loan>>('/api/loans', { params }),

  getById: (id: string) => apiClient.get<Loan>(`/api/loans/${id}`),

  create: (data: Partial<Loan>) => apiClient.post<Loan>('/api/loans', data),

  approve: (id: string) => apiClient.post(`/api/loans/${id}/approve`),

  reject: (id: string, reason: string) =>
    apiClient.post(`/api/loans/${id}/reject`, { reason }),

  getProducts: () => apiClient.get<LoanProduct[]>('/api/loan-products'),

  createProduct: (data: Partial<LoanProduct>) =>
    apiClient.post<LoanProduct>('/api/loan-products', data),

  updateProduct: (id: string, data: Partial<LoanProduct>) =>
    apiClient.put<LoanProduct>(`/api/loan-products/${id}`, data),
}
