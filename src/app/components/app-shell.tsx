import { useState } from "react"
import { Outlet } from "react-router"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/sheet"
import { AppHeader } from "./app-header"
import { AppSidebar, AppSidebarBody } from "./app-sidebar"

export function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-svh flex-col overflow-hidden bg-background">
      <AppHeader onOpenMobileNav={() => setMobileNavOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <AppSidebarBody />
          </SheetContent>
        </Sheet>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}