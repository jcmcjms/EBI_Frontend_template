import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { NAVIGATION, type NavGroup } from '@/lib/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import { NavUser } from './NavUser'
import { Bank } from '@phosphor-icons/react'
import type { Permission } from '@/lib/types'

function filterNavByPermissions(
  groups: NavGroup[],
  permissions: Permission[]
): NavGroup[] {
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
          return true
        }
        return item.requiredPermissions.some((p) => permissions.includes(p))
      }),
    }))
    .filter((group) => group.items.length > 0)
}

export function AppSidebar() {
  const { pathname } = useLocation()
  const { user } = useAuthStore()
  const { setOpenMobile } = useSidebar()

  const filteredNav = user
    ? filterNavByPermissions(NAVIGATION, user.permissions)
    : NAVIGATION

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex h-14 items-center border-b px-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
          onClick={() => setOpenMobile(false)}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Bank className="h-4 w-4 text-primary-foreground" weight="fill" />
          </div>
          <span className="font-semibold group-data-[collapsible=icon]:hidden">
            Enterprise Bank
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {filteredNav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.label}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpenMobile(false)}
                        className="flex items-center gap-3"
                      >
                        <item.icon className="h-4 w-4" weight="duotone" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
