import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Loan, LoanStatus } from '@/lib/types'
import { MagnifyingGlass, Download, Eye } from '@phosphor-icons/react'

function generateDummyLoans(count: number): Loan[] {
  const statuses: LoanStatus[] = ['pending', 'under_review', 'approved', 'rejected', 'disbursed']
  const names = [
    'Juan Dela Cruz', 'Maria Santos', 'Pedro Reyes', 'Ana Gonzales',
    'Carlos Mendoza', 'Roberto Garcia', 'Cristina Lim', 'Miguel Torres',
    'Elena Ramos', 'Francisco Cruz',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `LN-2024-${String(i + 1).padStart(3, '0')}`,
    applicationNumber: `APP-${Date.now()}-${i}`,
    borrowerName: names[i % names.length],
    borrowerId: `BRW-${10000 + i}`,
    amount: Math.floor(Math.random() * 400000) + 50000,
    term: [12, 18, 24, 36, 48][Math.floor(Math.random() * 5)],
    interestRate: parseFloat((Math.random() * 5 + 8).toFixed(2)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    assignedTo: 'Loan Officer ' + ((i % 5) + 1),
    branchId: `BR-${(i % 3) + 1}`,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }))
}

async function fetchLoans(): Promise<Loan[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return generateDummyLoans(25)
}

export default function MonitoringPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const { data: loans, isLoading } = useQuery({
    queryKey: ['loans', searchTerm, statusFilter],
    queryFn: fetchLoans,
  })

  const filteredLoans = loans?.filter((loan) => {
    const matchesSearch =
      loan.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusVariant = (status: LoanStatus) => {
    switch (status) {
      case 'approved':
      case 'disbursed':
        return 'success' as const
      case 'pending':
      case 'under_review':
        return 'warning' as const
      case 'rejected':
        return 'destructive' as const
      default:
        return 'secondary' as const
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Loan Monitoring</h1>
          <p className="text-muted-foreground">View and manage all loan applications</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 gap-2">
              <div className="relative flex-1 max-w-sm">
                <MagnifyingGlass className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by borrower or loan ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="disbursed">Disbursed</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Term</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLoans?.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.borrowerName}</TableCell>
                    <TableCell>{formatCurrency(loan.amount)}</TableCell>
                    <TableCell>{loan.term} mo</TableCell>
                    <TableCell>{loan.interestRate}%</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(loan.status)}>
                        {loan.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(loan.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
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
