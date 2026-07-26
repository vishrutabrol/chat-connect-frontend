import { create } from "zustand";

interface UIState {
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  mobileMenuOpen: boolean;
  activeModal: string | null;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setRightPanelOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  rightPanelOpen: false,
  mobileMenuOpen: false,
  activeModal: null,

  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  toggleSidebar: () =>
    set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setRightPanelOpen: (rightPanelOpen) => set({ rightPanelOpen }),

  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),

  openModal: (id) => set({ activeModal: id }),

  closeModal: () => set({ activeModal: null }),
}));
