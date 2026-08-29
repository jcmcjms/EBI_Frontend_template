import { Wrench } from "@phosphor-icons/react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppShell } from "@/src/components/layout/app-shell";
import { Button } from "@/src/components/ui/button";

/**
 * Temporary stand-in for roadmap modules so sidebar links never dead-end
 * (the catch-all would otherwise bounce authenticated users to /login).
 * Delete a route here when the real page lands.
 */
export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-center">
        <Wrench className="text-muted-foreground size-8" />
        <h1 className="text-lg font-semibold tracking-tight">This module is under construction</h1>
        <p className="text-muted-foreground max-w-sm text-sm">
          <code className="bg-muted px-1 py-0.5 text-xs">{pathname}</code> is on the roadmap and not
          wired to the API yet.
        </p>
        <Button variant="outline" onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </Button>
      </div>
    </AppShell>
  );
}
