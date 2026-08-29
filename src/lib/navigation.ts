import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsLeftRight,
  ChartLineUp,
  ClipboardText,
  CreditCard,
  FileText,
  Gauge,
  Gear,
  Lifebuoy,
  MagnifyingGlass,
  Wallet,
} from "@phosphor-icons/react";

export interface NavItem {
  label: string;
  to: string;
  icon: Icon;
  /** Exact-match for index routes like /dashboard. */
  end?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export const QUICK_ACTION = {
  label: "New Transfer",
  to: "/transfers/new",
};

export const NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { label: "Dashboard", to: "/dashboard", icon: Gauge, end: true },
      { label: "Transactions", to: "/transactions", icon: ArrowsLeftRight },
      { label: "Accounts", to: "/accounts", icon: Wallet },
      { label: "Cards", to: "/cards", icon: CreditCard },
      { label: "Analytics", to: "/analytics", icon: ChartLineUp },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Reports", to: "/reports", icon: ClipboardText },
      { label: "Statements", to: "/statements", icon: FileText },
    ],
  },
];

export const FOOTER_ITEMS: NavItem[] = [
  { label: "Settings", to: "/settings", icon: Gear },
  { label: "Get Help", to: "/help", icon: Lifebuoy },
  { label: "Search", to: "/search", icon: MagnifyingGlass },
];
