"use client";

import type { ComponentType } from "react";
import {
  CalendarDays,
  Crown,
  Hash,
  Info,
  Lock,
  Shield,
  Users,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, getInitials } from "@/lib/format";
import type { Room } from "@/types/room.types";

interface RoomInfoCardProps {
  room: Room | null | undefined;
  isLoading?: boolean;
}

interface InfoRowProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}

function InfoRow({ icon: Icon, label, children }: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground">
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 truncate text-sm font-medium text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-start gap-3">
          <Skeleton className="size-9 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RoomInfoCard({ room, isLoading }: RoomInfoCardProps) {
  const showSkeleton = isLoading || !room;

  const ownerName =
    room?.owner?.username ?? room?.createdBy ?? "—";
  const memberLimit =
    room?.memberLimit != null ? String(room.memberLimit) : "Unlimited";

  return (
    <Card className="border-border/60 bg-card/40 shadow-sm backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="inline-flex items-center gap-2">
          <Info className="size-4 text-muted-foreground" />
          Room Information
        </CardTitle>
        <CardDescription>
          Everything you need to know about this room
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-lg bg-muted/40 p-4">
          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Description
          </p>
          {showSkeleton ? (
            <Skeleton className="mt-2 h-4 w-3/4" />
          ) : (
            <p className="mt-1.5 text-sm leading-relaxed text-foreground">
              {room?.description}
            </p>
          )}
        </div>

        {showSkeleton ? (
          <SkeletonRows />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={Hash} label="Room Name">
              {room?.roomName}
            </InfoRow>

            <InfoRow icon={room?.roomType === "PRIVATE" ? Lock : Globe} label="Room Type">
              <Badge
                variant={room?.roomType === "PRIVATE" ? "secondary" : "outline"}
                className={
                  room?.roomType === "PRIVATE"
                    ? "text-purple-400"
                    : "text-emerald-500"
                }
              >
                {room?.roomType === "PRIVATE" ? (
                  <Lock className="size-3" />
                ) : (
                  <Globe className="size-3" />
                )}
                {room?.roomType}
              </Badge>
            </InfoRow>

            <InfoRow icon={Crown} label="Owner">
              <span className="inline-flex items-center gap-1.5">
                <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[9px] font-bold text-white">
                  {getInitials(ownerName)}
                </span>
                {ownerName}
              </span>
            </InfoRow>

            <InfoRow icon={Users} label="Member Limit">
              {memberLimit}
            </InfoRow>

            <InfoRow icon={Shield} label="Members Count">
              {room?.memberCount}
            </InfoRow>

            <InfoRow icon={CalendarDays} label="Created At">
              {formatDate(room?.createdAt)}
            </InfoRow>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
