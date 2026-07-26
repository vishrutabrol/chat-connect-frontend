"use client";

import { QueryProvider } from "@/providers/query.provider";
import { AuthProvider } from "@/providers/auth.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              className: "bg-card border-border text-foreground",
            }}
            theme="dark"
          />
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
