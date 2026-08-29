import { Info, TrendDown, TrendUp } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { BarChart } from "@/src/components/dashboard/charts";
import { formatCurrency } from "@/src/lib/format";
import type { MonthlyExpense } from "@/src/lib/dashboard";

export function MonthlyExpensesCard({ data }: { data: MonthlyExpense[] }) {
  const last = data[data.length - 1]?.amount ?? 0;
  const previous = data[data.length - 2]?.amount ?? 0;
  const trend = previous > 0 ? ((last - previous) / previous) * 100 : 0;
  const trendingUp = trend >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          Monthly Expenses
          <Info className="text-muted-foreground size-3.5" role="img" aria-label="Total posted expenses per calendar month" />
        </CardTitle>
        {/* TODO: wire to report export endpoint */}
        <Button variant="outline" size="sm">View Report</Button>
      </CardHeader>
      <CardContent>
        <BarChart
          data={data.map((d) => ({ label: d.month, value: d.amount }))}
          formatValue={(value) => formatCurrency(value)}
        />
        <div className="border-border flex flex-col gap-1 border-t pt-3">
          <p className="flex items-center gap-1 text-xs">
            <span>
              Trending {trendingUp ? "up" : "down"} by{" "}
              <span className="font-semibold">{Math.abs(trend).toFixed(1)}%</span> this month
            </span>
            {trendingUp ? (
              <TrendUp className="text-emerald-600 size-3.5 dark:text-emerald-400" />
            ) : (
              <TrendDown className="text-destructive size-3.5" />
            )}
          </p>
          <p className="text-muted-foreground text-xs">Showing data for the last 6 months</p>
        </div>
      </CardContent>
    </Card>
  );
}
