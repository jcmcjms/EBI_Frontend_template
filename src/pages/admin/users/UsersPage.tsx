import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Gate } from '@/components/auth/Gate'
import { formatDate } from '@/lib/utils'
import type { User } from '@/lib/types'
import { Plus, MagnifyingGlass, PencilSimple, UserMinus, UserPlus } from '@phosphor-icons/react'

function generateDummyUsers(count: number): User[] {
  const roles = ['Admin', 'Loan Officer', 'Teller', 'Viewer']
  const branches = ['Main Branch', 'North Branch', 'South Branch']
  const names = [
    'John Smith', 'Jane Doe', 'Bob Johnson', 'Alice Williams',
    'Charlie Brown', 'Diana Prince', 'Edward Norton', 'Fiona Apple',
    'George Lucas', 'Helen Hunt',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `USR-${1000 + i}`,
    email: `user${i + 1}@enterprisebank.com`,
    fullName: names[i % names.length],
    role: roles[i % roles.length],
    branchId: `BR-${(i % 3) + 1}`,
    branchName: branches[i % branches.length],
    isActive: Math.random() > 0.2,
    lastLogin: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
  }))
}

async function fetchUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return generateDummyUsers(15)
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const filteredUsers = users?.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage system users and their permissions</p>
        </div>
        <Gate permission="user.create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Gate>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-sm">
              <MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.fullName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.branchName}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'success' : 'secondary'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Gate permission="user.edit">
                          <Button size="sm" variant="ghost">
                            <PencilSimple className="h-4 w-4" />
                          </Button>
                        </Gate>
                        <Gate permission="user.delete">
                          <Button size="sm" variant="ghost">
                            {user.isActive ? (
                              <UserMinus className="h-4 w-4 text-destructive" />
                            ) : (
                              <UserPlus className="h-4 w-4" />
                            )}
                          </Button>
                        </Gate>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
