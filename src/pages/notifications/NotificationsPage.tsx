import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useNotificationStore } from '@/store/notificationStore'
import { formatRelativeTime } from '@/lib/utils'
import type { Notification } from '@/lib/types'
import { Info, Warning, WarningCircle, CheckCircle, CheckSquare, Check } from '@phosphor-icons/react'

const dummyNotifications: Notification[] = [
  { id: '1', title: 'New Loan Application', message: 'Juan Dela Cruz submitted a new loan application for ₱250,000', type: 'info', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), actionUrl: '/loans/monitoring', actionLabel: 'Review' },
  { id: '2', title: 'Loan Approved', message: 'Loan LN-2024-015 for Maria Santos has been approved', type: 'success', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
  { id: '3', title: 'Overdue Payment', message: 'Pedro Reyes has missed 2 consecutive payments on Loan LN-2024-008', type: 'warning', isRead: false, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), actionUrl: '/loans/monitoring', actionLabel: 'View Details' },
  { id: '4', title: 'System Maintenance', message: 'Scheduled maintenance on Sunday 2:00 AM - 4:00 AM', type: 'info', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
  { id: '5', title: 'Loan Rejected', message: 'Application from Carlos Mendoza did not meet credit requirements', type: 'error', isRead: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
]

async function fetchNotifications(): Promise<Notification[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return dummyNotifications
}

const iconMap = {
  info: Info,
  success: CheckCircle,
  warning: Warning,
  error: WarningCircle,
}

const iconColorMap = {
  info: 'text-blue-500',
  success: 'text-green-500',
  warning: 'text-yellow-500',
  error: 'text-destructive',
}

export default function NotificationsPage() {
  const { setNotifications, markAsRead, markAllAsRead } = useNotificationStore()

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const data = await fetchNotifications()
      setNotifications(data)
      return data
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on loan activities and system events</p>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          <CheckSquare className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          : notifications?.map((notification) => {
              const Icon = iconMap[notification.type]
              return (
                <Card
                  key={notification.id}
                  className={!notification.isRead ? 'border-l-4 border-l-primary' : ''}
                >
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted ${iconColorMap[notification.type]}`}>
                        <Icon className="h-5 w-5" weight="fill" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{notification.title}</h3>
                          <span className="text-xs text-muted-foreground">
                            {formatRelativeTime(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-2 pt-2">
                          {notification.actionUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={notification.actionUrl}>
                                {notification.actionLabel || 'View'}
                              </a>
                            </Button>
                          )}
                          {!notification.isRead && (
                            <Button size="sm" variant="ghost" onClick={() => markAsRead(notification.id)}>
                              <Check className="mr-1 h-3 w-3" weight="bold" />
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
      </div>
    </div>
  )
}
