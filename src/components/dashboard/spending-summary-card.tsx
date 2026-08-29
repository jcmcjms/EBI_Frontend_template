import { CaretRight, Info } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { DonutChart } from "@/src/components/dashboard/charts";
import { formatCurrency } from "@/src/lib/format";
import type { SpendingCategory } from "@/src/lib/dashboard";
import { cn } from "@/src/lib/utils";

/** Grayscale ramp (darkest -> lightest); opacity-based so dark mode inverts for free. */
const SHADES = [
  "text-foreground",
  "text-foreground/70",
  "text-foreground/45",
  "text-foreground/25",
] as const;

interface SpendingSummaryCardProps {
  total: number;
  categories: SpendingCategory[];
}

export function SpendingSummaryCard({ total, categories }: SpendingSummaryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          Summary
          <Info className="text-muted-foreground size-3.5" role="img" aria-label="Category breakdown of spending this month" />
        </CardTitle>
        <Button variant="ghost" size="icon-sm" aria-label="Expand summary">
          <CaretRight />
        </Button>
      </CardHeader>
      <CardContent className="items-center">
        <DonutChart
          centerLabel={formatCurrency(total)}
          segments={categories.map((category) => ({
            label: category.name,
            percent: category.percent,
            className: SHADES[category.shade],
          }))}
        />
        <ul className="grid w-full gap-2 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category.name} className="bg-muted flex items-center gap-2 px-2.5 py-2">
              <span className={cn("size-2 shrink-0 rounded-full bg-current", SHADES[category.shade])} aria-hidden />
              <span className="text-muted-foreground min-w-0 flex-1 truncate text-xs">{category.name}</span>
              <span className="text-xs font-medium tabular-nums">{category.percent}%</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
