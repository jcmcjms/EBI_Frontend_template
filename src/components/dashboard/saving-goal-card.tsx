import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { formatCurrency } from "@/src/lib/format";

interface SavingGoalCardProps {
  current: number;
  target: number;
}

export function SavingGoalCard({ current, target }: SavingGoalCardProps) {
  const percent = Math.round((current / target) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Saving Goal
          <Badge variant="muted">{percent}% Progress</Badge>
        </CardTitle>
        <Button variant="outline" size="sm">View Report</Button>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight tabular-nums">
          {formatCurrency(current, { exact: true })}{" "}
          <span className="text-muted-foreground text-xs font-normal">of {formatCurrency(target)}</span>
        </p>
        <Progress value={percent} aria-label="Saving goal progress" />
      </CardContent>
    </Card>
  );
}
