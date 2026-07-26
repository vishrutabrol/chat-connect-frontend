"use client";

import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { toast } from "sonner";
import { useCallback } from "react";

export function useAuth() {
  const store = useAuthStore();
  const router = useRouter();

  const login = useCallback(
    async (username: string) => {
      try {
        const data = await authService.login({ username });
        store.login(data);
        router.push(ROUTES.DASHBOARD);
        return { success: true };
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : "Login failed. Please try again.";
        return { success: false, error: message };
      }
    },
    [store, router],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // Always clear local auth
      store.logout();

      router.push(ROUTES.HOME);

      toast.success("Logged out successfully");
    }
  }, [store, router]);
  return {
    ...store,
    login,
    logout,
  };
}
