import { Link, useLocation } from "react-router"
import { Button } from "@/shared/components/ui/button"
import { HEADER_NAV, SIDEBAR_SECTIONS } from "../app-config"

function findNavLabel(pathname: string): string | undefined {
  const allItems = [...HEADER_NAV, ...SIDEBAR_SECTIONS.flatMap((section) => section.items)]
  return allItems.find((item) => item.to === pathname)?.label
}

export function SectionPlaceholderPage() {
  const { pathname } = useLocation()
  const label = findNavLabel(pathname)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{label ?? "Page not found"}</h1>
      <p className="max-w-sm text-sm text-muted-foreground">
        {label === undefined
          ? `No route matches "${pathname}".`
          : "This route is scaffolded by the shell. Implement it as a feature under src/features and register it in src/app/router.tsx."}
      </p>
      <Button asChild variant="outline" className="mt-2">
        <Link to="/">Back to dashboard</Link>
      </Button>
    </div>
  )
}