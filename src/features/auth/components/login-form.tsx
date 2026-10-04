import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { CircleNotch, Eye, EyeSlash } from '@phosphor-icons/react';
import { cn } from 'cn';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { useLogin } from '../hooks/use-login';
import { type AuthenticatedUser, type SignInResult } from '../services/auth-service';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(3, 'Username is required').max(50),
  password: z.string().min(8, 'Password must be at least 8 characters').max(100),
});

type LoginFormData = z.infer<typeof loginSchema>;

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
      return 'Invalid credentials';
  }
}

export function LoginForm({ onAuthenticated }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, isSubmitting, result } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const failureMessage = describeFailure(result);

  const handleDefaultAuth = (user: AuthenticatedUser) => {
    onAuthenticated?.(user);
    navigate('/');
  };

  const onSubmit = async (data: LoginFormData) => {
    const signInResult = await login({
      email: data.username,
      password: data.password,
    });
    if (signInResult.status === 'success') handleDefaultAuth(signInResult.user);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-6')} noValidate>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your username and password to sign in.
          </p>
        </div>

        {failureMessage !== null && (
          <p
            role="alert"
            className="w-full border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive text-center"
          >
            {failureMessage}
          </p>
        )}

        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            placeholder="Username"
            autoComplete="username"
            disabled={isSubmitting}
            aria-invalid={errors.username !== undefined}
            {...register('username')}
          />
          {errors.username && (
            <p className="text-xs text-destructive mt-1">{errors.username.message}</p>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="https://itsupport.enterprisebank.ph/support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="current-password"
              disabled={isSubmitting}
              aria-invalid={errors.password !== undefined}
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">Invalid credentials</p>}
        </Field>

        <Field>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <CircleNotch size={20} weight="bold" className="animate-spin" />
            ) : (
              'Login'
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
