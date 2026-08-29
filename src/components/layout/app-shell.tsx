import type { ReactNode } from "react";
import { Bell, Moon, Sun, UserCircle } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/button";
import { useTheme } from "@/src/hooks/theme";

export function AppShell({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-background flex min-h-svh flex-col">
      <header className="border-border bg-background/95 sticky top-0 z-10 border-b backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center px-4 md:px-6">
          <a href="/" aria-label="Enterprise Bank Inc home" className="flex items-center">
            <img src="/enterprise_bank-logo.png" alt="" className="h-6 object-contain" />
          </a>

          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="size-4" />
              <span className="bg-destructive absolute top-1.5 right-1.5 size-1.5 rounded-full" aria-hidden />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button variant="ghost" size="icon" aria-label="Account">
              <UserCircle className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
