import type { ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import type { Permission } from '@/lib/types'

interface GateProps {
  children: ReactNode
  permission?: Permission
  permissions?: Permission[]
  requireAll?: boolean
  fallback?: ReactNode
}

export function Gate({
  children,
  permission,
  permissions,
  requireAll = false,
  fallback = null,
}: GateProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuthStore()

  if (permission) {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>
  }

  if (permissions && permissions.length > 0) {
    const hasAccess = requireAll
      ? hasAllPermissions(permissions)
      : hasAnyPermission(permissions)
    return hasAccess ? <>{children}</> : <>{fallback}</>
  }

  return <>{children}</>
}
