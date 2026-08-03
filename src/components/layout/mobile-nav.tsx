"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useUIStore } from "@/store/ui.store";
import { useCreateRoomModalStore } from "@/store/create-room.store";
import { ROUTES } from "@/constants/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Hash,
  Lock,
  MessageCircle,
  Plus,
  Menu,
} from "lucide-react";

const mobileNavItems = [
  { icon: Hash, label: "Public", id: "public" },
  { icon: Lock, label: "Private", id: "private" },
  { icon: MessageCircle, label: "DMs", id: "dm" },
  { icon: Plus, label: "Create", id: "create" },
] as const;

export function MobileNav() {
  const { user } = useAuth();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const openCreateRoom = useCreateRoomModalStore((state) => state.open);
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateRoom = () => {
    if (pathname !== ROUTES.DASHBOARD) {
      router.push(ROUTES.DASHBOARD);
    }
    openCreateRoom();
  };

  return (
    <>
      {/* Top bar for mobile */}
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm lg:hidden">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-foreground">
              Chat Connect
            </span>
          </div>
        </div>
      </div>

      {/* Bottom navigation for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-around px-2 py-1">
          {mobileNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="flex flex-col gap-0.5 px-3 py-2 text-muted-foreground"
              size="sm"
              onClick={item.id === "create" ? handleCreateRoom : undefined}
            >
              <item.icon className="size-5" />
              <span className="text-[10px]">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>

      {/* Mobile slide-out menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 border-r border-border bg-card p-4 lg:hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-sm font-bold text-white">
                    {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user?.username}
                  </p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
