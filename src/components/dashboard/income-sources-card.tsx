import { ArrowUpRight, TrendUp } from "@phosphor-icons/react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { StackedBar } from "@/src/components/dashboard/charts";
import { formatCurrency } from "@/src/lib/format";
import type { IncomeSource, IncomeTone } from "@/src/lib/dashboard";
import { cn } from "@/src/lib/utils";

const TONE_CLASS: Record<IncomeTone, string> = {
  blue: "bg-blue-500",
  teal: "bg-teal-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
};

interface IncomeSourcesCardProps {
  total: number;
  changePercent: number;
  sources: IncomeSource[];
}

export function IncomeSourcesCard({ total, changePercent, sources }: IncomeSourcesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Sources</CardTitle>
        <Button variant="ghost" size="icon-sm" aria-label="Open income sources report">
          <ArrowUpRight />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-xs">Total Income</p>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatCurrency(total)}</p>
        <div className="flex items-center gap-2">
          <Badge variant="success">
            <TrendUp />
            {changePercent}%
          </Badge>
          <span className="text-muted-foreground text-xs">compared to last month</span>
        </div>

        <StackedBar
          segments={sources.map((source) => ({
            label: source.name,
            percent: (source.amount / total) * 100,
            className: TONE_CLASS[source.tone],
          }))}
        />

        <ul className="flex flex-col gap-2">
          {sources.map((source) => (
            <li key={source.name} className="flex items-center gap-2 text-sm">
              <span className={cn("size-2 shrink-0 rounded-full", TONE_CLASS[source.tone])} aria-hidden />
              <span className="text-muted-foreground min-w-0 flex-1 truncate">{source.name}</span>
              <span className="font-medium tabular-nums">{formatCurrency(source.amount)}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
