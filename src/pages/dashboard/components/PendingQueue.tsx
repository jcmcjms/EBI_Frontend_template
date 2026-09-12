import { Button } from '@/components/ui/button'
import { Clock, ArrowRight } from '@phosphor-icons/react'

const dummyQueue = [
  { id: '1', borrower: 'Juan Dela Cruz', amount: 150000, submittedAt: '2h ago' },
  { id: '2', borrower: 'Maria Santos', amount: 250000, submittedAt: '4h ago' },
  { id: '3', borrower: 'Pedro Reyes', amount: 180000, submittedAt: '6h ago' },
  { id: '4', borrower: 'Ana Gonzales', amount: 320000, submittedAt: '8h ago' },
  { id: '5', borrower: 'Carlos Mendoza', amount: 95000, submittedAt: '1d ago' },
]

export function PendingQueue() {
  return (
    <div className="space-y-4">
      {dummyQueue.map((loan) => (
        <div key={loan.id} className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{loan.borrower}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>₱{loan.amount.toLocaleString()}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" weight="duotone" />
                {loan.submittedAt}
              </span>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Review
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  )
}
