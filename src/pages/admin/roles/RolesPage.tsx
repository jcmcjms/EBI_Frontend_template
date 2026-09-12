import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Role } from '@/lib/types'
import { Shield } from '@phosphor-icons/react'

const dummyRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access with all permissions',
    permissions: ['loans.view', 'loans.create', 'loans.approve', 'user.view', 'user.create', 'user.edit', 'user.delete', 'role.view', 'role.manage', 'loan_product.manage', 'reports.view'],
    isSystem: true,
  },
  {
    id: '2',
    name: 'Loan Officer',
    description: 'Can create, review, and approve loan applications',
    permissions: ['loans.view', 'loans.create', 'loans.approve', 'reports.view'],
    isSystem: true,
  },
  {
    id: '3',
    name: 'Teller',
    description: 'Can view and create loan applications',
    permissions: ['loans.view', 'loans.create'],
    isSystem: true,
  },
  {
    id: '4',
    name: 'Viewer',
    description: 'Read-only access to loan data',
    permissions: ['loans.view'],
    isSystem: true,
  },
]

async function fetchRoles(): Promise<Role[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyRoles
}

export default function RolesPage() {
  const { data: roles, isLoading } = useQuery({
    queryKey: ['roles'],
    queryFn: fetchRoles,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">Define roles and their permission sets</p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {roles?.map((role) => (
            <Card key={role.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" weight="duotone" />
                    <CardTitle>{role.name}</CardTitle>
                  </div>
                  {role.isSystem && <Badge variant="secondary">System</Badge>}
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((permission) => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
