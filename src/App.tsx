import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Spinner } from "@/src/components/ui/spinner.tsx";

const Login = lazy(() => import("./pages/auth/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <Spinner className="size-8" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
