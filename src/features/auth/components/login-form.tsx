import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { hasErrors, validateCredentials, type CredentialsFieldErrors } from '../auth-validation';
import { useLogin } from '../hooks/use-login';
import { type AuthenticatedUser, type SignInResult } from '../services/auth-service';

interface LoginFormProps {
  onAuthenticated?: (user: AuthenticatedUser) => void;
}

function describeFailure(result: SignInResult | null): string | null {
  if (result === null || result.status === 'success') return null;
  switch (result.status) {
    case 'rate-limited':
      return result.retryAfterSeconds === null
        ? 'Too many sign-in attempts. Try again later.'
        : `Too many sign-in attempts. Try again in ${result.retryAfterSeconds} seconds.`;
    case 'unavailable':
      return 'The sign-in service is unreachable. Try again.';
    case 'invalid-credentials':
      // Deliberately generic — never reveal whether the email or the password was wrong (account enumeration).
      return 'Invalid email or password.';
  }
}

export function LoginForm({ onAuthenticated }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<CredentialsFieldErrors>({});
  const { login, isSubmitting, result } = useLogin();

  const failureMessage = describeFailure(result);

  const handleDefaultAuth = (user: AuthenticatedUser) => {
    onAuthenticated?.(user);
    navigate('/');
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const errors = validateCredentials({ email, password });
    setFieldErrors(errors);
    if (hasErrors(errors)) return;

    const signInResult = await login({ email, password });
    if (signInResult.status === 'success') handleDefaultAuth(signInResult.user);
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-1.5 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {failureMessage !== null && (
        <p
          role="alert"
          className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive"
        >
          {failureMessage}
        </p>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          autoComplete="email"
          value={email}
          disabled={isSubmitting}
          aria-invalid={fieldErrors.email !== undefined}
          aria-describedby={fieldErrors.email !== undefined ? 'email-error' : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            setFieldErrors(previous => ({ ...previous, email: undefined }));
          }}
        />
        {fieldErrors.email !== undefined && (
          <p id="email-error" className="text-xs text-destructive">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <a href="/forgot-password" className="text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          disabled={isSubmitting}
          aria-invalid={fieldErrors.password !== undefined}
          aria-describedby={fieldErrors.password !== undefined ? 'password-error' : undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setFieldErrors(previous => ({ ...previous, password: undefined }));
          }}
        />
        {fieldErrors.password !== undefined && (
          <p id="password-error" className="text-xs text-destructive">
            {fieldErrors.password}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in…' : 'Login'}
      </Button>
    </form>
  );
}
