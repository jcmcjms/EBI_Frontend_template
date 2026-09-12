import { decodeJwt } from 'jose'
import type { UserSession, Permission } from '@/lib/types'

export function extractUserFromToken(token: string): UserSession | null {
  try {
    const payload = decodeJwt(token)

    if (!payload.sub || !payload.email) {
      console.error('JWT missing required claims')
      return null
    }

    return {
      id: payload.sub,
      email: payload.email as string,
      fullName: (payload.full_name as string) || (payload.name as string) || '',
      role: (payload.role as string) || '',
      permissions: ((payload.permissions as string[]) || []) as Permission[],
      branchId: (payload.branch_id as string) || '',
      branchName: (payload.branch_name as string) || '',
      mustChangePassword: (payload.must_change_password as boolean) || false,
    }
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = decodeJwt(token)
    if (!payload.exp) return true

    const bufferSeconds = 30
    return Date.now() >= (payload.exp - bufferSeconds) * 1000
  } catch {
    return true
  }
}
