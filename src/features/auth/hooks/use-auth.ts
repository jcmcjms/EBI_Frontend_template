import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/auth-service';

export function useAuth() {
  return useQuery({
    queryKey: ['auth', 'currentUser'],
    queryFn: fetchCurrentUser,
    staleTime: 60_000,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
