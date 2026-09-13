import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/lib/api/auth';
import { getErrorMessage } from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

/**
 * Split-screen login (Lyra reference layout):
 * - Left: brand mark + vertically centered form
 * - Right: brand imagery (hidden below lg)
 *
 * Internal enterprise app: no self-signup, no social providers.
 * Account provisioning is handled by administrators via /admin/users.
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
const ENTERPRISE_BANK_URL = "https://www.enterprisebank.ph/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Already authenticated? Skip the form entirely.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      login(response.data.accessToken);

      // Return to the page the user was originally heading to
      const from =
        (location.state as { from?: Location })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });

      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left: form panel */}
      <div className="bg-muted/40 flex flex-col p-6 lg:p-10">
        {/* Brand mark */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={ENTERPRISE_BANK_URL}>
            <img
                src="/enterprise_bank-logo.png"
                alt="Enterprise Bank Inc"
                className="h-8 object-contain"
            />
          </a>
        </div>

        {/* Vertically centered form */}
        <div className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold tracking-tight">
                Login to your account
              </h1>
              <p className="text-muted-foreground text-sm">
                Enter your email below to login to your account
              </p>
            </div>

            {/* noValidate: RHF + Zod own the validation, not the browser */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
              noValidate
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-destructive text-sm" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner className="size-4" />
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>

              {/* Dev-only helper; never rendered in production builds */}
              {import.meta.env.DEV && (
                <p className="text-muted-foreground text-center text-xs">
                  Demo: admin@enterprisebank.com / Password123!
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Right: brand imagery (decorative, desktop only) */}
      <div className="relative hidden overflow-hidden lg:block">
        {/* Blurred, zoomed copy fills the letterbox so the panel reads full-bleed */}
        <img
            src="/EBI_bg_login.png"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-125 object-cover blur-xl dark:brightness-[0.2] dark:grayscale"
        />
        {/* Crisp, uncropped artwork on top */}
        <img
            src="/EBI_bg_login.png"
            alt=""
            className="absolute inset-0 h-full w-full object-contain dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
