// View models for the dashboard. When the .NET API lands, keep these shapes as
// the contract and map DTOs -> view models here (tones/masks stay server-safe).

export interface KeyMetric {
  amount: number;
  changePercent: number;
}

export type IncomeTone = "blue" | "teal" | "amber" | "violet";

export interface IncomeSource {
  name: string;
  amount: number;
  tone: IncomeTone;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

export interface SpendingCategory {
  name: string;
  percent: number;
  /** Index into the grayscale ramp used by the donut/legend. */
  shade: 0 | 1 | 2 | 3;
}

export type TransactionCategory =
  | "person"
  | "freelance"
  | "grocery"
  | "coffee"
  | "transport"
  | "education";

export type AccentTone = "pink" | "green" | "amber" | "violet" | "red" | "blue";

export interface Transaction {
  id: string;
  counterparty: string;
  occurredAt: string; // ISO 8601
  type: "income" | "expense";
  /** Always positive; `type` determines the sign in the UI. */
  amount: number;
  category: TransactionCategory;
  accent: AccentTone;
}

export interface CardAccount {
  id: string;
  label: string;
  /** Pre-masked by the "server". A raw PAN must never reach the client. */
  maskedNumber: string;
  balance: number;
  variant: "credit" | "digital";
}

export interface DashboardSummary {
  balance: KeyMetric;
  netProfit: KeyMetric;
  expenses: KeyMetric;
  pendingInvoices: { amount: number; overdueCount: number; dailyTotals: number[] };
  income: { total: number; changePercent: number; sources: IncomeSource[] };
  monthlyExpenses: MonthlyExpense[];
  spending: { total: number; categories: SpendingCategory[] };
  transactions: Transaction[];
  savingGoal: { current: number; target: number };
  cards: CardAccount[];
}

function daysAgo(days: number, hour: number, minute: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function monthLabel(monthsBack: number): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - monthsBack);
  return d.toLocaleString("en-US", { month: "short" });
}

const EXPENSE_AMOUNTS = [2400, 7800, 3900, 7400, 4600, 5200];

const MOCK: DashboardSummary = {
  balance: { amount: 125_430, changePercent: 12.5 },
  netProfit: { amount: 38_700, changePercent: 8.5 },
  expenses: { amount: 26_450, changePercent: -5.5 },
  pendingInvoices: {
    amount: 3_200,
    overdueCount: 3,
    dailyTotals: [12, 18, 9, 14, 22, 17, 8, 13, 19, 24, 15, 10, 21, 16, 11, 20, 25, 14, 9, 18, 23, 12, 17, 26, 20, 15, 10, 22, 18, 24, 16, 21],
  },
  income: {
    total: 92_000,
    changePercent: 15.5,
    sources: [
      { name: "Rental", amount: 35_000, tone: "blue" },
      { name: "Investments", amount: 28_000, tone: "teal" },
      { name: "Business", amount: 18_000, tone: "amber" },
      { name: "Freelance", amount: 11_000, tone: "violet" },
    ],
  },
  monthlyExpenses: EXPENSE_AMOUNTS.map((amount, i) => ({
    month: monthLabel(EXPENSE_AMOUNTS.length - 1 - i),
    amount,
  })),
  spending: {
    total: 1_125,
    categories: [
      { name: "Food & Drink", percent: 48, shade: 3 },
      { name: "Grocery", percent: 32, shade: 2 },
      { name: "Shopping", percent: 13, shade: 1 },
      { name: "Transport", percent: 7, shade: 0 },
    ],
  },
  transactions: [
    { id: "t-1", counterparty: "Samantha William", occurredAt: daysAgo(0, 10, 15), type: "income", amount: 1640.26, category: "person", accent: "pink" },
    { id: "t-2", counterparty: "Grocery at Shop", occurredAt: daysAgo(1, 18, 45), type: "expense", amount: 72.64, category: "grocery", accent: "green" },
    { id: "t-3", counterparty: "Coffee", occurredAt: daysAgo(8, 8, 30), type: "expense", amount: 8.65, category: "coffee", accent: "amber" },
    { id: "t-4", counterparty: "Karen Smith", occurredAt: daysAgo(19, 15, 50), type: "income", amount: 842.5, category: "person", accent: "violet" },
    { id: "t-5", counterparty: "Transportation", occurredAt: daysAgo(27, 17, 20), type: "expense", amount: 18.52, category: "transport", accent: "red" },
    { id: "t-6", counterparty: "Online Course Purchase", occurredAt: daysAgo(48, 14, 10), type: "expense", amount: 120.0, category: "education", accent: "blue" },
    { id: "t-7", counterparty: "Freelance Project Payment", occurredAt: daysAgo(55, 11, 0), type: "income", amount: 980.75, category: "freelance", accent: "green" },
  ],
  savingGoal: { current: 1052.98, target: 1200 },
  cards: [
    { id: "c-1", label: "Credit Card", maskedNumber: "5375 **** **** 2368", balance: 5325.57, variant: "credit" },
    { id: "c-2", label: "Digital Card", maskedNumber: "5375 **** **** 1847", balance: 10_892.43, variant: "digital" },
  ],
};

/**
 * Simulates network latency so loading/skeleton states are exercised.
 * Swap the body for `apiClient.get<DashboardSummary>("/api/dashboard/summary")`
 * once the backend endpoint exists — callers won't change.
 */
export function fetchDashboardSummary(): Promise<DashboardSummary> {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK), 400));
}
