"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useUIStore } from "@/store/ui.store";
import { useCreateRoomModalStore } from "@/store/create-room.store";
import { ROUTES } from "@/constants/routes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Hash,
  Lock,
  MessageCircle,
  Plus,
  Settings,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const sidebarNavItems = [
  { icon: Hash, label: "Public Rooms", id: "public" },
  { icon: Lock, label: "Private Rooms", id: "private" },
  { icon: MessageCircle, label: "Direct Messages", id: "dm" },
] as const;

export function Sidebar() {
  const { user, logout } = useAuth();
  const { sidebarOpen, setSidebarOpen } = useUIStore();
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
    <aside
      className={cn(
        "hidden flex-col border-r border-border bg-card/50 backdrop-blur-sm transition-all duration-300 lg:flex",
        sidebarOpen ? "w-64" : "w-0 overflow-hidden",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar size="default">
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-xs font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {user?.username}
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Online
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setSidebarOpen(false)}
          aria-label="Collapse sidebar"
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-2">
        <Button
          variant="outline"
          className="mb-2 w-full justify-start gap-2 text-muted-foreground"
          size="sm"
          onClick={handleCreateRoom}
        >
          <Plus className="size-4" />
          Create Room
        </Button>

        <nav className="space-y-1">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
              size="sm"
            >
              <item.icon className="size-4" />
              {item.label}
              {item.id === "public" && (
                <Badge
                  variant="secondary"
                  className="ml-auto text-[10px]"
                >
                  0
                </Badge>
              )}
            </Button>
          ))}
        </nav>
      </div>

      <Separator />

      <div className="space-y-1 p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          size="sm"
        >
          <Settings className="size-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          size="sm"
          onClick={logout}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
