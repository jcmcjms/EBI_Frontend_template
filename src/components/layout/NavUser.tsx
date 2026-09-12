import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api/auth'
import { getErrorMessage } from '@/lib/apiClient'
import { toast } from 'sonner'
import { SignOut, GearSix, User, CaretUp } from '@phosphor-icons/react'

export function NavUser() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.warn('Logout API failed:', getErrorMessage(error))
    } finally {
      logout()
      navigate('/login')
      toast.success('Logged out successfully')
    }
  }

  if (!user) return null

  const initials = user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex w-full items-center gap-3 rounded-lg p-2 text-sm hover:bg-accent">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <p className="font-medium">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.branchName}</p>
          </div>
          <CaretUp className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/account" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" weight="duotone" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/account" className="cursor-pointer">
              <GearSix className="mr-2 h-4 w-4" weight="duotone" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <SignOut className="mr-2 h-4 w-4" weight="duotone" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
