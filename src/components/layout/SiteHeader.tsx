import { Link } from 'react-router-dom'
import { Bell, List } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSidebar } from '@/components/ui/sidebar'
import { useNotificationStore } from '@/store/notificationStore'
import { useAuthStore } from '@/store/authStore'

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const { unreadCount } = useNotificationStore()
  const { user } = useAuthStore()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={toggleSidebar}
      >
        <List className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/notifications" className="relative">
            <Bell className="h-5 w-5" weight="duotone" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-4 min-w-[16px] px-1 text-[10px]"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Link>
        </Button>

        <div className="hidden items-center gap-2 md:flex">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-muted-foreground">{user?.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
