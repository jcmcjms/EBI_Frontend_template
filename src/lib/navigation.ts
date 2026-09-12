import {
  House,
  MagnifyingGlass,
  FilePlus,
  Users,
  Shield,
  Package,
  Bell,
  UserCircle,
  type Icon,
} from '@phosphor-icons/react'
import type { Permission } from '@/lib/types'

export interface NavItem {
  label: string
  href: string
  icon: Icon
  requiredPermissions?: Permission[]
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const NAVIGATION: NavGroup[] = [
  {
    label: 'Main',
    items: [
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: House,
      },
      {
        label: 'Loan Monitoring',
        href: '/loans/monitoring',
        icon: MagnifyingGlass,
        requiredPermissions: ['loans.view'],
      },
      {
        label: 'Create Loan',
        href: '/loans/create',
        icon: FilePlus,
        requiredPermissions: ['loans.create'],
      },
    ],
  },
  {
    label: 'Communication',
    items: [
      {
        label: 'Notifications',
        href: '/notifications',
        icon: Bell,
        badge: '3',
      },
    ],
  },
  {
    label: 'Administration',
    items: [
      {
        label: 'Users',
        href: '/admin/users',
        icon: Users,
        requiredPermissions: ['user.view'],
      },
      {
        label: 'Roles',
        href: '/admin/roles',
        icon: Shield,
        requiredPermissions: ['role.view'],
      },
      {
        label: 'Loan Products',
        href: '/admin/loan-products',
        icon: Package,
        requiredPermissions: ['loan_product.manage'],
      },
    ],
  },
  {
    label: 'Account',
    items: [
      {
        label: 'Profile',
        href: '/account',
        icon: UserCircle,
      },
    ],
  },
]
