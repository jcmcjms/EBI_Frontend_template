import { useQuery } from '@tanstack/react-query';
import type { AuthenticatedUser } from '../services/auth-service';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '';

async function fetchCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
    });

    if (response.status === 401) return null;
    if (!response.ok) return null;

    const payload = (await response.json().catch(() => null)) as {
      user?: AuthenticatedUser;
    } | null;
    return payload?.user ?? null;
  } catch {
    return null;
  }
}

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
