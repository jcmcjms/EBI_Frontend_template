import type { Icon } from "@phosphor-icons/react";
import { Bell, DotsThreeVertical, GearSix, SignOut, UserCircle } from "@phosphor-icons/react";
import { Menu } from "@base-ui/react/menu";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Separator } from "@/src/components/ui/separator";
import { useAuthStore } from "@/src/store/authStore";
import { cn } from "@/src/lib/utils";

// Placeholder identity until the profile endpoint exists — fetch from /api/me later.
const CURRENT_USER = {
  name: "Juan Dela Cruz",
  email: "juan.delacruz@example.com",
  initials: "JD",
};

function UserAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
        className,
      )}
    >
      {CURRENT_USER.initials}
    </span>
  );
}

function MenuItem({
  icon: ItemIcon,
  label,
  onClick,
  destructive = false,
}: {
  icon: Icon;
  label: string;
  onClick?: () => void;
  destructive?: boolean;
}) {
  return (
    <Menu.Item
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs font-medium outline-none select-none",
        "data-[highlighted]:bg-muted",
        destructive && "text-destructive data-[highlighted]:bg-destructive/10",
      )}
    >
      <ItemIcon className="size-4" />
      {label}
    </Menu.Item>
  );
}

export function UserMenu({ collapsed }: { collapsed: boolean }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const handleLogout = () => {
    // Purge cached server state before dropping the token — banking rigor:
    // no stale account data may survive into the next session on this tab.
    queryClient.clear();
    setAccessToken(null);
    navigate("/login", { replace: true });
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        aria-label="Account menu"
        className={cn(
          "hover:bg-sidebar-accent data-[popup-open]:bg-sidebar-accent flex w-full items-center gap-2 rounded-md p-1.5 text-left transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring/50",
          collapsed && "justify-center",
        )}
      >
        <UserAvatar />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium">{CURRENT_USER.name}</span>
              <span className="text-muted-foreground block truncate text-xs">{CURRENT_USER.email}</span>
            </span>
            <DotsThreeVertical className="text-muted-foreground size-4 shrink-0" />
          </>
        )}
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side="top" align="start" sideOffset={8} className="z-50">
          <Menu.Popup className="bg-popover text-popover-foreground border-border animate-in fade-in-0 zoom-in-95 w-56 border p-1.5 shadow-md outline-none">
            <div className="flex items-center gap-2 px-2 pt-1 pb-2">
              <UserAvatar />
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{CURRENT_USER.name}</span>
                <span className="text-muted-foreground block truncate text-xs">{CURRENT_USER.email}</span>
              </span>
            </div>
            <Separator className="mb-1" />
            <MenuItem icon={UserCircle} label="Account" onClick={() => navigate("/settings")} />
            <MenuItem icon={Bell} label="Notifications" onClick={() => navigate("/search")} />
            <MenuItem icon={GearSix} label="Settings" onClick={() => navigate("/settings")} />
            <Separator className="my-1" />
            <MenuItem icon={SignOut} label="Log out" onClick={handleLogout} destructive />
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
