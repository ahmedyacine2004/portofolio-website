import { create } from 'zustand';

type UiState = {
  mobileMenuOpen: boolean;
  activeSection: string | null;

  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setActiveSection: (section: string | null) => void;
};

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  activeSection: null,

  setMobileMenuOpen: (open) => {
    set({ mobileMenuOpen: open });
  },

  toggleMobileMenu: () => {
    set((state) => ({
      mobileMenuOpen: !state.mobileMenuOpen,
    }));
  },

  setActiveSection: (section) => {
    set({
      activeSection: section,
    });
  },
}));
