import { create } from "zustand/react";

const COLLAPSED_KEY = "ebi-sidebar-collapsed";

// Non-sensitive UI preference — localStorage is fine here (unlike auth tokens).
function readCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

interface SidebarState {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapsed: () => void;
  setMobileOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: readCollapsed(),
  isMobileOpen: false,
  toggleCollapsed: () =>
    set((state) => {
      const isCollapsed = !state.isCollapsed;
      try {
        localStorage.setItem(COLLAPSED_KEY, String(isCollapsed));
      } catch {
        // storage unavailable — collapse state lasts for the session only
      }
      return { isCollapsed };
    }),
  setMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
}));
