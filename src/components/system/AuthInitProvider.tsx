import { useEffect, type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/lib/api/auth'
import { getErrorMessage } from '@/lib/apiClient'
import { extractUserFromToken } from '@/lib/jwt'
import { Spinner } from '@/components/ui/spinner'

interface AuthInitProviderProps {
  children: ReactNode
}

export function AuthInitProvider({ children }: AuthInitProviderProps) {
  const { isAuthenticated, isLoading, setLoading, login, logout } =
    useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function initAuth() {
      try {
        if (isAuthenticated) {
          setLoading(false)
          return
        }

        const response = await authApi.refresh()
        const token = response.data.accessToken

        if (token) {
          const user = extractUserFromToken(token)
          if (user) {
            login(token)

            if (
              user.mustChangePassword &&
              location.pathname !== '/change-password'
            ) {
              navigate('/change-password', { replace: true })
              return
            }
          }
        }
      } catch (error) {
        console.warn('Session restore failed:', getErrorMessage(error))
        logout()
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [isAuthenticated, setLoading, login, logout, navigate, location.pathname])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">Loading session...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
