import { useMutation } from '@tanstack/react-query';
import { signInWithPassword, type SignInResult } from '../services/auth-service';
import type { Credentials } from '../auth-validation';

export function useLogin() {
  const mutation = useMutation<SignInResult, Error, Credentials>({
    mutationFn: signInWithPassword,
  });

  return {
    login: mutation.mutateAsync,
    isSubmitting: mutation.isPending,
    result: mutation.data ?? null,
    error: mutation.error,
    reset: mutation.reset,
  };
}
