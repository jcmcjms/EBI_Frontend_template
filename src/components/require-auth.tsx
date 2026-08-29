import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/src/store/authStore";

export function RequireAuth({ children }: { children: ReactElement }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
