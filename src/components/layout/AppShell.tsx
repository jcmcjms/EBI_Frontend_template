import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { SiteHeader } from './SiteHeader'
import { SidebarProvider } from '@/components/ui/sidebar'

interface AppShellProps {
  children?: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <SiteHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children || <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
