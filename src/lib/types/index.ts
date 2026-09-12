export type Permission =
  | 'loans.view'
  | 'loans.create'
  | 'loans.approve'
  | 'user.view'
  | 'user.create'
  | 'user.edit'
  | 'user.delete'
  | 'role.view'
  | 'role.manage'
  | 'loan_product.manage'
  | 'reports.view'

export const PERMISSIONS = {
  ADMIN: [
    'loans.view', 'loans.create', 'loans.approve',
    'user.view', 'user.create', 'user.edit', 'user.delete',
    'role.view', 'role.manage',
    'loan_product.manage',
    'reports.view',
  ] as Permission[],
  LOAN_OFFICER: ['loans.view', 'loans.create', 'loans.approve', 'reports.view'] as Permission[],
  TELLER: ['loans.view', 'loans.create'] as Permission[],
  VIEWER: ['loans.view'] as Permission[],
} as const

export interface UserSession {
  id: string
  email: string
  fullName: string
  role: string
  permissions: Permission[]
  branchId: string
  branchName: string
  mustChangePassword: boolean
}

export interface Branch {
  id: string
  code: string
  name: string
  address: string
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiError {
  statusCode: number
  message: string
  errors?: Record<string, string[]>
}

export type LoanStatus =
  | 'pending'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'disbursed'
  | 'cancelled'

export interface Loan {
  id: string
  applicationNumber: string
  borrowerName: string
  borrowerId: string
  amount: number
  term: number
  interestRate: number
  status: LoanStatus
  assignedTo: string
  branchId: string
  createdAt: string
  updatedAt: string
}

export interface LoanProduct {
  id: string
  name: string
  description: string
  minAmount: number
  maxAmount: number
  minTerm: number
  maxTerm: number
  interestRate: number
  isActive: boolean
}

export interface User {
  id: string
  email: string
  fullName: string
  role: string
  branchId: string
  branchName: string
  isActive: boolean
  lastLogin?: string
  createdAt: string
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  isSystem: boolean
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: string
  actionUrl?: string
  actionLabel?: string
}

export interface DashboardSummary {
  totalLoans: number
  pendingLoans: number
  approvedLoans: number
  rejectedLoans: number
  totalDisbursed: number
  activeUsers: number
}

export interface DashboardTrend {
  date: string
  applications: number
  approvals: number
  rejections: number
}
