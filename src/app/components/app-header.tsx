import { Bank, ChartBar, List, MagnifyingGlass, PuzzlePiece, SquaresFour, Stack } from "@phosphor-icons/react"
import { Link, NavLink } from "react-router"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import { ThemeToggle } from "@/shared/components/theme-toggle"
import { cn } from "@/shared/lib/utils"
import { APP_NAME, CURRENT_USER, HEADER_NAV } from "../app-config"

interface AppHeaderProps {
  onOpenMobileNav: () => void
}

export function AppHeader({ onOpenMobileNav }: AppHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b bg-background px-4 md:gap-6 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" onClick={onOpenMobileNav}>
        <List weight="bold" aria-hidden="true" />
      </Button>

      <Link to="/" className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center bg-foreground text-background" aria-hidden="true">
          <Bank weight="fill" className="size-4" />
        </span>
        <span className="text-base font-semibold tracking-tight">{APP_NAME}</span>
      </Link>

      <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
        {HEADER_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground",
                isActive && "bg-muted text-foreground"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex-1" />

      <div className="hidden items-center gap-1 md:flex">
        <Button variant="ghost" size="icon" aria-label="Search">
          <MagnifyingGlass aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Analytics">
          <ChartBar aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Stack aria-hidden="true" />
          <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Integrations">
          <PuzzlePiece aria-hidden="true" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Apps">
          <SquaresFour aria-hidden="true" />
        </Button>
      </div>

      <ThemeToggle />

      <div className="flex items-center gap-2">
        <div className="hidden text-right leading-tight sm:block">
          <span className="block text-xs text-muted-foreground">Hello</span>
          <span className="block text-sm font-medium">{CURRENT_USER.displayName}</span>
        </div>
        <Avatar className="size-9">
          <AvatarFallback>{CURRENT_USER.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}