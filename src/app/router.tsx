import { createBrowserRouter, useNavigate } from "react-router"
import { LoginPage } from "@/features/auth/components/login-page"
import { DashboardPage } from "@/features/dashboard/components/dashboard-page"
import { AppShell } from "./components/app-shell"
import { SectionPlaceholderPage } from "./components/section-placeholder-page"
import { ProtectedRoute } from "@/features/auth/components/protected-route"

function LoginRoute() {
  const navigate = useNavigate()
  return <LoginPage onAuthenticated={() => navigate("/", { replace: true })} />
}

export const router = createBrowserRouter([
  { path: "login", element: <LoginRoute /> },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "*", element: <SectionPlaceholderPage /> },
    ],
  },
])