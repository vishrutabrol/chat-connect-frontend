import { create } from "zustand";
import { persist } from "zustand/middleware";
import { storage } from "@/lib/storage";
import type { AuthState, LoginResponse, User } from "@/types/auth.types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setUser: (user: User) => {
        storage.setUser(user);
        set({ user });
      },

      setTokens: ({ accessToken, refreshToken }) => {
        storage.setAccessToken(accessToken);
        storage.setRefreshToken(refreshToken);
        set({ accessToken, refreshToken });
      },

      login: (data: LoginResponse) => {
        storage.setAccessToken(data.accessToken);
        storage.setRefreshToken(data.refreshToken);
        storage.setUser(data.user);
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        storage.clear();
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "cc-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
