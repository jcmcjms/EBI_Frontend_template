export const APP_NAME = "Enterprise Bank Inc."

export const CURRENT_USER = {
  displayName: "Olivia",
} satisfies { displayName: string }

export interface NavItem {
  label: string
  to: string
  count?: number
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export interface ExternalLink {
  label: string
  href: string
}

export const HEADER_NAV: NavItem[] = [
  { label: "Dashboard", to: "/" },
  { label: "Layout Builder", to: "/layout-builder" },
  { label: "Crafted", to: "/crafted" },
  { label: "Apps", to: "/apps" },
  { label: "Mega Menu", to: "/mega-menu" },
]

export const SIDEBAR_SECTIONS: NavSection[] = [
  {
    title: "Public",
    items: [
      { label: "All Questions", to: "/questions", count: 5_120 },
      { label: "Search", to: "/search" },
      { label: "Tags", to: "/tags" },
      { label: "Ask Question", to: "/ask" },
    ],
  },
  {
    title: "My Activity",
    items: [
      { label: "My Questions", to: "/my/questions", count: 18 },
      { label: "Resolved", to: "/my/resolved", count: 96 },
      { label: "Enrolled", to: "/my/enrolled", count: 7 },
      { label: "Saved", to: "/my/saved", count: 4 },
    ],
  },
  {
    title: "Categories",
    items: [
      { label: "Admin Panel", to: "/categories/admin-panel", count: 1_240 },
      { label: "Backend Integration", to: "/categories/backend-integration", count: 310 },
      { label: "Suggestions", to: "/categories/suggestions", count: 42 },
      { label: "Pre-sale Questions", to: "/categories/pre-sale-questions", count: 128 },
      { label: "Starter Kit", to: "/categories/starter-kit", count: 560 },
    ],
  },
]

export const EXTERNAL_LINKS: ExternalLink[] = [
  { label: "All Components", href: "https://ui.shadcn.com/docs/components" },
  { label: "All Blocks", href: "https://ui.shadcn.com/blocks" },
  { label: "All Examples", href: "https://ui.shadcn.com/examples" },
]