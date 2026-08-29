import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "@/src/components/ui/spinner.tsx";
import { RequireAuth } from "@/src/components/require-auth";

const Login = lazy(() => import("./pages/auth/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Placeholder = lazy(() => import("./pages/placeholder"));

// Sidebar destinations without a real page yet — remove entries as pages ship.
const PLACEHOLDER_PATHS = [
  "/transactions",
  "/accounts",
  "/cards",
  "/analytics",
  "/reports",
  "/statements",
  "/settings",
  "/help",
  "/search",
  "/transfers/new",
];

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Spinner className="size-8" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          {PLACEHOLDER_PATHS.map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <RequireAuth>
                  <Placeholder />
                </RequireAuth>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
