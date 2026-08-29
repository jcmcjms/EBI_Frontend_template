import { Plus } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { formatCurrency } from "@/src/lib/format";
import type { CardAccount } from "@/src/lib/dashboard";
import { cn } from "@/src/lib/utils";

const VARIANT_CLASS: Record<CardAccount["variant"], string> = {
  credit: "from-emerald-500 to-green-700",
  digital: "from-blue-500 to-blue-700",
};

function WalletCard({ account }: { account: CardAccount }) {
  return (
    <div
      role="group"
      aria-label={`${account.label} ending ${account.maskedNumber.slice(-4)}`}
      className={cn(
        "flex aspect-[1.586] flex-col justify-between bg-gradient-to-br p-4 text-white",
        VARIANT_CLASS[account.variant],
      )}
    >
      <p className="text-xs font-medium">{account.label}</p>
      <p className="text-sm tracking-[0.18em] tabular-nums">{account.maskedNumber}</p>
      <div className="flex items-end justify-between gap-2">
        <span className="text-xl font-semibold tabular-nums">
          {formatCurrency(account.balance, { exact: true })}
        </span>
        {account.variant === "credit" && (
          <span className="rounded-xs border border-white/80 px-1.5 py-0.5 text-[10px] font-bold italic tracking-wider">
            VISA
          </span>
        )}
      </div>
    </div>
  );
}

export function WalletSection({ cards }: { cards: CardAccount[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-0.5">
          <CardTitle>My Wallet</CardTitle>
          <CardDescription>A total of {cards.length} cards are listed</CardDescription>
        </div>
        <Button variant="outline" size="sm">
          <Plus />
          Add New
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        {cards.map((account) => (
          <WalletCard key={account.id} account={account} />
        ))}
      </CardContent>
    </Card>
  );
}
