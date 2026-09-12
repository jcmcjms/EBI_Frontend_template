import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'

const dummyLoans = [
  { id: 'LN-2024-001', borrower: 'Roberto Garcia', amount: 250000, term: 24, approvedAt: '2024-01-15', status: 'approved' },
  { id: 'LN-2024-002', borrower: 'Cristina Lim', amount: 180000, term: 12, approvedAt: '2024-01-14', status: 'disbursed' },
  { id: 'LN-2024-003', borrower: 'Miguel Torres', amount: 320000, term: 36, approvedAt: '2024-01-13', status: 'approved' },
  { id: 'LN-2024-004', borrower: 'Elena Ramos', amount: 150000, term: 18, approvedAt: '2024-01-12', status: 'disbursed' },
  { id: 'LN-2024-005', borrower: 'Francisco Cruz', amount: 420000, term: 48, approvedAt: '2024-01-11', status: 'approved' },
]

export function ApprovedLoans() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Loan ID</TableHead>
          <TableHead>Borrower</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Approved</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyLoans.map((loan) => (
          <TableRow key={loan.id}>
            <TableCell className="font-medium">{loan.id}</TableCell>
            <TableCell>{loan.borrower}</TableCell>
            <TableCell>{formatCurrency(loan.amount)}</TableCell>
            <TableCell>{loan.term} months</TableCell>
            <TableCell>{formatDate(loan.approvedAt)}</TableCell>
            <TableCell>
              <Badge variant={loan.status === 'disbursed' ? 'success' : 'default'}>
                {loan.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
