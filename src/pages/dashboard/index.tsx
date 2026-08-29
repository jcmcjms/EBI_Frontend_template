import { ArrowDown, ArrowUp, CalendarBlank, DownloadSimple } from "@phosphor-icons/react";
import { AppShell } from "@/src/components/layout/app-shell";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Sparkline } from "@/src/components/dashboard/charts";
import { IncomeSourcesCard } from "@/src/components/dashboard/income-sources-card";
import { MonthlyExpensesCard } from "@/src/components/dashboard/monthly-expenses-card";
import { SavingGoalCard } from "@/src/components/dashboard/saving-goal-card";
import { SpendingSummaryCard } from "@/src/components/dashboard/spending-summary-card";
import { StatCard, StatCardSkeleton } from "@/src/components/dashboard/stat-card";
import { TransactionsCard } from "@/src/components/dashboard/transactions-card";
import { WalletSection } from "@/src/components/dashboard/wallet";
import { useDashboardSummary } from "@/src/hooks/dashboard";
import { formatDateRange } from "@/src/lib/format";

function DashboardSkeleton() {
  return (
    <div role="status" aria-label="Loading dashboard" className="flex flex-col gap-4 md:gap-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Card key={index}>
            <CardContent>
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid items-start gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardContent>
            <Skeleton className="h-72 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Skeleton className="h-72 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboardSummary();

  const rangeEnd = new Date();
  const rangeStart = new Date();
  rangeStart.setDate(rangeEnd.getDate() - 27);

  return (
    <AppShell>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">Finance Dashboard</h1>
          <div className="flex items-center gap-2">
            <span className="border-border text-muted-foreground flex h-8 items-center gap-2 border px-2.5 text-xs">
              <CalendarBlank className="size-4" />
              {formatDateRange(rangeStart, rangeEnd)}
            </span>
            {/* TODO: wire to report export endpoint */}
            <Button size="icon" aria-label="Export dashboard report">
              <DownloadSimple className="size-4" />
            </Button>
          </div>
        </div>

        {isLoading || !data ? (
          <DashboardSkeleton />
        ) : (
          <>
            <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="My Balance"
                amount={data.balance.amount}
                changePercent={data.balance.changePercent}
                footer={
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <ArrowUp />
                      Transfer
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <ArrowDown />
                      Request
                    </Button>
                  </div>
                }
              />
              <StatCard title="Net Profit" amount={data.netProfit.amount} changePercent={data.netProfit.changePercent} />
              <StatCard title="Expenses" amount={data.expenses.amount} changePercent={data.expenses.changePercent} />
              <StatCard
                title="Pending Invoices"
                amount={data.pendingInvoices.amount}
                caption="outstanding this cycle"
                badge={<Badge variant="destructive">{data.pendingInvoices.overdueCount} overdue invoices</Badge>}
                footer={<Sparkline values={data.pendingInvoices.dailyTotals} />}
              />
            </section>

            <section aria-label="Insights" className="grid gap-4 lg:grid-cols-3">
              <IncomeSourcesCard {...data.income} />
              <MonthlyExpensesCard data={data.monthlyExpenses} />
              <SpendingSummaryCard {...data.spending} />
            </section>

            <section aria-label="Activity" className="grid items-start gap-4 xl:grid-cols-3">
              <div className="min-w-0 xl:col-span-2">
                <TransactionsCard transactions={data.transactions} />
              </div>
              <div className="flex flex-col gap-4">
                <SavingGoalCard {...data.savingGoal} />
                <WalletSection cards={data.cards} />
              </div>
            </section>
          </>
        )}
      </div>
    </AppShell>
  );
}
