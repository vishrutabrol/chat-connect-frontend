"use client";

import { Crown, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/format";
import type { Room, RoomMember, RoomMemberRole } from "@/types/room.types";

interface MembersSidebarProps {
  room?: Room | null;
  members?: RoomMember[];
  isLoading?: boolean;
  isError?: boolean;
}

const ROLE_STYLES: Record<RoomMemberRole, { label: string; className: string }> = {
  OWNER: {
    label: "Owner",
    className: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  ADMIN: {
    label: "Admin",
    className: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  },
  MEMBER: {
    label: "Member",
    className: "text-muted-foreground",
  },
};

function MemberSkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="h-5 w-14 rounded-full" />
    </div>
  );
}

export function MembersSidebar({
  room,
  members,
  isLoading,
  isError,
}: MembersSidebarProps) {
  const showSkeletons =
    isLoading || isError || !members || members.length === 0;

  const ownerId = room?.owner?.id ?? room?.createdBy ?? null;

  const resolveRole = (member: RoomMember): RoomMemberRole => {
    if (member.role === "OWNER" || member.id === ownerId) return "OWNER";
    return member.role;
  };

  const count = members?.length ?? room?.memberCount ?? 0;

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-l border-border bg-card/30 backdrop-blur-sm lg:flex">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Members</h2>
        </div>
        <Badge variant="secondary" className="text-[10px]">
          {isLoading ? "…" : count}
        </Badge>
      </div>

      <div className="flex-1 space-y-0.5 overflow-y-auto p-2">
        {showSkeletons ? (
          <>
            <MemberSkeletonRow />
            <MemberSkeletonRow />
            <MemberSkeletonRow />
            <MemberSkeletonRow />
            <MemberSkeletonRow />
          </>
        ) : (
          members?.map((member) => {
            const role = resolveRole(member);
            const roleStyle = ROLE_STYLES[role];

            return (
              <div
                key={member.id}
                className="group flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-muted/40"
              >
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-bold text-white">
                    {getInitials(member.username)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-medium text-foreground">
                      {member.username}
                    </p>
                    {role === "OWNER" && (
                      <Crown className="size-3.5 shrink-0 text-amber-400" />
                    )}
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        member.isOnline
                          ? "bg-emerald-500"
                          : "bg-muted-foreground/30",
                      )}
                    />
                    {member.isOnline ? "Online" : "Offline"}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={cn("h-5 text-[10px]", roleStyle.className)}
                >
                  {roleStyle.label}
                </Badge>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
