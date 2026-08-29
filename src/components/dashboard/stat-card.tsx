import type { ReactNode } from "react";
import { TrendDown, TrendUp } from "@phosphor-icons/react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";
import { formatCurrency } from "@/src/lib/format";

interface StatCardProps {
  title: string;
  amount: number;
  changePercent?: number;
  badge?: ReactNode;
  caption?: string;
  footer?: ReactNode;
}

export function StatCard({
  title,
  amount,
  changePercent,
  badge,
  caption = "compared to last month",
  footer,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {changePercent !== undefined ? (
          <Badge variant={changePercent >= 0 ? "success" : "destructive"}>
            {changePercent >= 0 ? <TrendUp /> : <TrendDown />}
            {Math.abs(changePercent)}%
          </Badge>
        ) : (
          badge
        )}
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">{formatCurrency(amount)}</p>
        <p className="text-muted-foreground text-xs">{caption}</p>
        {footer}
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-14" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-3 w-28" />
      </CardContent>
    </Card>
  );
}
