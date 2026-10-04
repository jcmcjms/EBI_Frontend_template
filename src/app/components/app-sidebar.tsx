import { ArrowSquareOut } from "@phosphor-icons/react"
import { NavLink } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import { EXTERNAL_LINKS, SIDEBAR_SECTIONS, type NavSection } from "../app-config"

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
      <AppSidebarBody />
    </aside>
  )
}

export function AppSidebarBody() {
  return (
    <div className="flex h-full flex-col">
      <nav aria-label="Sections" className="flex-1 space-y-6 overflow-y-auto p-4">
        {SIDEBAR_SECTIONS.map((section) => (
          <NavSectionList key={section.title} section={section} />
        ))}
      </nav>
      <div className="flex flex-col items-start gap-2 p-4">
        {EXTERNAL_LINKS.map((link) => (
          <Button key={link.href} asChild size="sm">
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
              <ArrowSquareOut aria-hidden="true" />
            </a>
          </Button>
        ))}
      </div>
    </div>
  )
}

function NavSectionList({ section }: { section: NavSection }) {
  return (
    <div className="grid gap-1">
      <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">{section.title}</p>
      {section.items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted/60",
              isActive && "bg-muted"
            )
          }
        >
          {item.label}
          {item.count !== undefined && (
            <span className="ml-auto text-xs tabular-nums text-muted-foreground">
              {item.count.toLocaleString("en-US")}
            </span>
          )}
        </NavLink>
      ))}
    </div>
  )
}