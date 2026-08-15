import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { env } from '@/lib/env';

interface AdminAuthState {
  isAuthenticated: boolean;
  refreshSession: () => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setAuthenticated: (value: boolean) => void;
}

const API_BASE_URL = env.apiUrl.replace(/\/api$/, '') + '/api';

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      refreshSession: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/admin/session`, {
            credentials: 'include',
            headers: {
              Accept: 'application/json',
            },
          });

          const data = await response.json();
          const authenticated = Boolean(data?.authenticated && response.ok);

          set((state) => {
            if (!authenticated && state.isAuthenticated) {
              return state;
            }

            return { isAuthenticated: authenticated };
          });

          return authenticated;
        } catch {
          set((state) => {
            if (state.isAuthenticated) {
              return state;
            }

            return { isAuthenticated: false };
          });
          return false;
        }
      },
      login: async (username, password) => {
        try {
          const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username.trim(),
              password: password.trim(),
            }),
          });

          const data = await response.json();
          const authenticated = Boolean(data?.success && response.ok);
          set({ isAuthenticated: authenticated });
          return authenticated;
        } catch {
          set({ isAuthenticated: false });
          return false;
        }
      },
      logout: async () => {
        try {
          await fetch(`${API_BASE_URL}/admin/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        } finally {
          set({ isAuthenticated: false });
        }
      },
    }),
    {
      name: 'portfolio-admin-auth',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    },
  ),
);
