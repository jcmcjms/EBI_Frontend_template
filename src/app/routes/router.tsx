import { createBrowserRouter } from 'react-router';
import { LoginPage } from '@/features/auth/components/login-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: (
      <div className="flex min-h-svh items-center justify-center">Sign up page coming soon</div>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <div className="flex min-h-svh items-center justify-center">
        Forgot password page coming soon
      </div>
    ),
  },
]);
