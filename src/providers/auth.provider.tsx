"use client";

import {
  createContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { ROUTES } from "@/constants/routes";

interface AuthContextValue {
  isInitialized: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  isInitialized: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const { accessToken, refreshToken, login, logout, setLoading } =
      useAuthStore.getState();

    async function check() {
      if (!accessToken) {
        setLoading(false);
        if (pathname !== ROUTES.HOME) {
          router.replace(ROUTES.HOME);
        }
        setIsInitialized(true);
        return;
      }

      try {
        const user = await authService.getMe();
        login({
          user,
          accessToken,
          refreshToken: refreshToken ?? "",
        });
        if (pathname === ROUTES.HOME) {
          router.replace(ROUTES.DASHBOARD);
        }
      } catch {
        logout();
        if (pathname !== ROUTES.HOME) {
          router.replace(ROUTES.HOME);
        }
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    }

    check();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
}
