import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'
import type { DashboardSummary } from '@/lib/types'
import { CurrencyDollar, FileText, Clock, Users } from '@phosphor-icons/react'
import { WeeklyTrend } from './components/WeeklyTrend'
import { PendingQueue } from './components/PendingQueue'
import { ApprovedLoans } from './components/ApprovedLoans'

async function fetchDashboardSummary(): Promise<DashboardSummary> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    totalLoans: 1247,
    pendingLoans: 89,
    approvedLoans: 1023,
    rejectedLoans: 135,
    totalDisbursed: 456789012.5,
    activeUsers: 45,
  }
}

export default function DashboardPage() {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: fetchDashboardSummary,
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of loan operations</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of loan operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.totalLoans.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.pendingLoans}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CurrencyDollar className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {summary?.approvedLoans.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(summary?.totalDisbursed || 0)} disbursed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" weight="duotone" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Online now</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Trend</CardTitle>
            <CardDescription>
              Loan applications and approvals over the past 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeeklyTrend />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pending Queue</CardTitle>
            <CardDescription>Loans awaiting your review</CardDescription>
          </CardHeader>
          <CardContent>
            <PendingQueue />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recently Approved</CardTitle>
          <CardDescription>Latest approved loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <ApprovedLoans />
        </CardContent>
      </Card>
    </div>
  )
}
