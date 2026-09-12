import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Permission, UserSession } from '@/lib/types'
import { extractUserFromToken, isTokenExpired } from '@/lib/jwt'

interface AuthState {
  accessToken: string | null
  user: UserSession | null
  isAuthenticated: boolean
  isLoading: boolean

  setAccessToken: (token: string | null) => void
  setUser: (user: UserSession | null) => void
  login: (token: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  hasPermission: (permission: Permission) => boolean
  hasAnyPermission: (permissions: Permission[]) => boolean
  hasAllPermissions: (permissions: Permission[]) => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: true,

      setAccessToken: (token) => {
        if (token && !isTokenExpired(token)) {
          const user = extractUserFromToken(token)
          set({
            accessToken: token,
            user,
            isAuthenticated: !!user,
          })
        } else {
          set({ accessToken: null, user: null, isAuthenticated: false })
        }
      },

      setUser: (user) => set({ user }),

      login: (token) => {
        const user = extractUserFromToken(token)
        if (user) {
          set({
            accessToken: token,
            user,
            isAuthenticated: true,
          })
        }
      },

      logout: () => {
        set({
          accessToken: null,
          user: null,
          isAuthenticated: false,
        })
      },

      setLoading: (loading) => set({ isLoading: loading }),

      hasPermission: (permission) => {
        const { user } = get()
        return !!user && user.permissions.includes(permission)
      },

      hasAnyPermission: (permissions) => {
        const { user } = get()
        return !!user && permissions.some((p) => user.permissions.includes(p))
      },

      hasAllPermissions: (permissions) => {
        const { user } = get()
        return !!user && permissions.every((p) => user.permissions.includes(p))
      },
    }),
    {
      name: 'auth-session',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user ? { id: state.user.id, role: state.user.role } : null,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
