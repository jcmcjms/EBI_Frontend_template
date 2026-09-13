import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AppShell } from '@/components/layout/AppShell'
import { Spinner } from '@/components/ui/spinner'

const LoginPage = lazy(() => import('@/pages/login/LoginPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/login/ForgotPasswordPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const MonitoringPage = lazy(() => import('@/pages/monitoring/MonitoringPage'))
const LoanCreatePage = lazy(() => import('@/pages/loans/create/LoanCreatePage'))
const UsersPage = lazy(() => import('@/pages/admin/users/UsersPage'))
const RolesPage = lazy(() => import('@/pages/admin/roles/RolesPage'))
const ProductsPage = lazy(() => import('@/pages/admin/products/ProductsPage'))
const NotificationsPage = lazy(() => import('@/pages/notifications/NotificationsPage'))
const AccountPage = lazy(() => import('@/pages/account/AccountPage'))

const LoadingFallback = () => (
  <div className="flex h-screen items-center justify-center">
    <Spinner className="size-8" />
  </div>
)

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/loans/monitoring" element={<MonitoringPage />} />
          <Route path="/loans/create" element={<LoanCreatePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/account" element={<AccountPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredPermissions={['user.view']}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <ProtectedRoute requiredPermissions={['role.view']}>
                <RolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/loan-products"
            element={
              <ProtectedRoute requiredPermissions={['loan_product.manage']}>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}
