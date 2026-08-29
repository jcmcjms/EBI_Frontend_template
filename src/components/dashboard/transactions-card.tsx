import type { Icon } from "@phosphor-icons/react";
import { BookOpen, Car, Coffee, Storefront } from "@phosphor-icons/react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { formatCurrency, formatDateTime } from "@/src/lib/format";
import type { AccentTone, Transaction, TransactionCategory } from "@/src/lib/dashboard";
import { cn } from "@/src/lib/utils";

const CATEGORY_ICON: Partial<Record<TransactionCategory, Icon>> = {
  grocery: Storefront,
  coffee: Coffee,
  transport: Car,
  education: BookOpen,
};

const ACCENT_CLASS: Record<AccentTone, string> = {
  pink: "bg-pink-500",
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  violet: "bg-violet-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

function TransactionAvatar({ transaction }: { transaction: Transaction }) {
  const CategoryIcon = CATEGORY_ICON[transaction.category];

  return (
    <span
      className={cn(
        "text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        ACCENT_CLASS[transaction.accent],
      )}
      aria-hidden
    >
      {CategoryIcon ? <CategoryIcon className="size-4" weight="fill" /> : transaction.counterparty.charAt(0)}
    </span>
  );
}

export function TransactionsCard({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        {/* TODO: navigate to full transaction history (TanStack Table + pagination) */}
        <Button variant="outline" size="sm">View All</Button>
      </CardHeader>
      <CardContent className="p-0!">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="pr-4 text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="pl-4">
                  <div className="flex items-center gap-3">
                    <TransactionAvatar transaction={transaction} />
                    <span className="max-w-45 truncate font-medium">{transaction.counterparty}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {formatDateTime(transaction.occurredAt)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{transaction.type === "income" ? "Income" : "Expenses"}</Badge>
                </TableCell>
                <TableCell
                  className={cn(
                    "pr-4 text-right font-medium tabular-nums",
                    transaction.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-destructive",
                  )}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount, { exact: true })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
