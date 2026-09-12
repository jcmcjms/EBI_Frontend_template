import type { ReactNode } from 'react'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { ShieldWarning } from '@phosphor-icons/react'
import { useAuthStore } from '@/store/authStore'
import type { Permission } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

interface ProtectedRouteProps {
  children: ReactNode
  requiredPermissions?: Permission[]
  requireAll?: boolean
}

export function ProtectedRoute({
  children,
  requiredPermissions,
  requireAll = false,
}: ProtectedRouteProps) {
  const {
    isAuthenticated,
    isLoading,
    hasAnyPermission,
    hasAllPermissions,
  } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-8" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasAccess = requireAll
      ? hasAllPermissions(requiredPermissions)
      : hasAnyPermission(requiredPermissions)

    if (!hasAccess) {
      return <Forbidden requiredPermissions={requiredPermissions} />
    }
  }

  return <>{children}</>
}

function Forbidden({
  requiredPermissions,
}: {
  requiredPermissions: Permission[]
}) {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <ShieldWarning className="h-8 w-8 text-destructive" weight="fill" />
          </div>
          <CardTitle className="text-xl">Access Denied</CardTitle>
          <CardDescription>
            You do not have the required permissions to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredPermissions.length > 0 && (
            <div className="rounded-md bg-muted p-3 text-center">
              <span className="text-sm text-muted-foreground">Required: </span>
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">
                {requiredPermissions.join(', ')}
              </code>
            </div>
          )}
          <Button asChild className="w-full">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
