"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile header + bottom nav */}
      <MobileNav />

      {/* Main content area */}
      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>

      {/* Right panel placeholder */}
      <aside className="hidden w-80 border-l border-border bg-card/30 backdrop-blur-sm xl:block">
        <div className="flex h-full items-center justify-center p-6">
          <p className="text-center text-sm text-muted-foreground/50">
            Right panel — coming soon
          </p>
        </div>
      </aside>
    </div>
  );
}
