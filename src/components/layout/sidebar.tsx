import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PlusCircle, X } from "@phosphor-icons/react";
import { Button } from "@/src/components/ui/button";
import { UserMenu } from "@/src/components/layout/user-menu";
import { FOOTER_ITEMS, NAV_SECTIONS, QUICK_ACTION, type NavItem } from "@/src/lib/navigation";
import { useSidebarStore } from "@/src/store/sidebarStore";
import { cn } from "@/src/lib/utils";

function SidebarLink({
  item,
  collapsed,
  onNavigated,
}: {
  item: NavItem;
  collapsed: boolean;
  onNavigated?: () => void;
}) {
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigated}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring/50",
          collapsed && "justify-center px-0",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
        )
      }
    >
      <item.icon className="size-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

function SidebarContent({ collapsed, onNavigated }: { collapsed: boolean; onNavigated?: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col gap-4 p-3">
      <div className={cn("flex items-center gap-2 px-1 pt-1", collapsed && "justify-center px-0")}>
        <img src="/favicon.svg" alt="" className="size-6 shrink-0" />
        {!collapsed && (
          <span className="truncate text-sm font-semibold tracking-tight">Enterprise Bank Inc</span>
        )}
      </div>

      <Button
        className={cn("w-full", collapsed && "px-0")}
        title={collapsed ? QUICK_ACTION.label : undefined}
        onClick={() => {
          navigate(QUICK_ACTION.to);
          onNavigated?.();
        }}
      >
        <PlusCircle weight="fill" />
        {!collapsed && QUICK_ACTION.label}
      </Button>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {NAV_SECTIONS.map((section, index) => (
          <div key={section.title ?? index} className="flex flex-col gap-1">
            {section.title && !collapsed && (
              <p className="text-sidebar-foreground/60 px-2.5 pb-1 text-xs">{section.title}</p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.items.map((item) => (
                <li key={item.to}>
                  <SidebarLink item={item} collapsed={collapsed} onNavigated={onNavigated} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-sidebar-border flex flex-col gap-0.5 border-t pt-2">
        {FOOTER_ITEMS.map((item) => (
          <SidebarLink key={item.to} item={item} collapsed={collapsed} onNavigated={onNavigated} />
        ))}
        <div className="pt-1">
          <UserMenu collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const isMobileOpen = useSidebarStore((state) => state.isMobileOpen);
  const setMobileOpen = useSidebarStore((state) => state.setMobileOpen);

  // Mobile drawer: escape to close + scroll lock while open.
  useEffect(() => {
    if (!isMobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen, setMobileOpen]);

  return (
    <>
      {/* Desktop: static column, collapsible to an icon rail */}
      <aside
        className={cn(
          "bg-sidebar border-sidebar-border sticky top-0 hidden h-svh shrink-0 border-r transition-[width] duration-200 lg:block",
          isCollapsed ? "w-16" : "w-64",
        )}
      >
        <SidebarContent collapsed={isCollapsed} />
      </aside>

      {/* Mobile: modal drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="animate-in fade-in-0 absolute inset-0 bg-black/40"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="bg-sidebar animate-in slide-in-from-left absolute inset-y-0 left-0 w-72 shadow-xl duration-200"
          >
            <div className="flex justify-end p-2 pb-0 lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setMobileOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            <SidebarContent collapsed={false} onNavigated={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
