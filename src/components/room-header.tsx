"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CalendarDays, Check, Copy, Globe, Link2, Lock, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { roomService } from "@/services/room.service";
import { useAuth } from "@/hooks/use-auth";
import { getErrorMessage } from "@/lib/error";
import { formatDate, getInitials, shortenId } from "@/lib/format";
import type { Room } from "@/types/room.types";

interface RoomHeaderProps {
  room: Room | null | undefined;
  isLoading?: boolean;
}

export function RoomHeader({ room, isLoading }: RoomHeaderProps) {
  const { user } = useAuth();
  const [roomIdCopied, setRoomIdCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const isOwner =
    room != null &&
    (room.createdBy === user?.id || room.owner?.id === user?.id);

  const joinMutation = useMutation({
    mutationFn: () => roomService.joinRoom(room?.id ?? ""),
    onSuccess: () => {
      toast.success("Joined the room");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Failed to join room"));
    },
  });

  const copyRoomId = async () => {
    if (!room) return;

    await navigator.clipboard.writeText(room.id);
    setRoomIdCopied(true);
    toast.success("Room ID copied");
    window.setTimeout(() => setRoomIdCopied(false), 2000);
  };

  const shareRoom = async () => {
    if (!room) return;

    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    toast.success("Room link copied to clipboard");
    window.setTimeout(() => setLinkCopied(false), 2000);
  };

  if (isLoading || !room) {
    return (
      <header className="border-b border-border bg-card/40 px-4 py-4 backdrop-blur-sm sm:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <Skeleton className="size-11 rounded-xl" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-48 max-w-full" />
            <Skeleton className="h-4 w-72 max-w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </header>
    );
  }

  const isPrivate = room.roomType === "PRIVATE";

  return (
    <header className="border-b border-border bg-card/40 px-4 py-4 backdrop-blur-sm sm:px-6">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar size="lg" className="rounded-xl">
          <AvatarFallback
            className={
              isPrivate
                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-bold text-white"
                : "bg-gradient-to-br from-emerald-500 to-teal-600 text-sm font-bold text-white"
            }
          >
            {getInitials(room.roomName)}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-lg font-semibold text-foreground">
              {room.roomName}
            </h1>
            <Badge
              variant={isPrivate ? "secondary" : "outline"}
              className={isPrivate ? "text-purple-400" : "text-emerald-500"}
            >
              {isPrivate ? (
                <Lock className="size-3" />
              ) : (
                <Globe className="size-3" />
              )}
              {isPrivate ? "Private" : "Public"}
            </Badge>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-3.5" />
              {room.memberCount} member{room.memberCount === 1 ? "" : "s"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              Created {formatDate(room.createdAt)}
            </span>
            <button
              type="button"
              onClick={copyRoomId}
              className="group inline-flex max-w-full items-center gap-1.5 rounded-md px-1.5 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              title="Copy room ID"
            >
              {roomIdCopied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span className="truncate">{shortenId(room.id)}</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={shareRoom}
            disabled={linkCopied}
          >
            {linkCopied ? (
              <Check className="size-4" />
            ) : (
              <Link2 className="size-4" />
            )}
            {linkCopied ? "Copied" : "Share"}
          </Button>

          {isOwner ? (
            <Button variant="secondary" size="sm" disabled>
              Owner
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => joinMutation.mutate()}
              disabled={joinMutation.isPending}
            >
              {joinMutation.isPending ? "Joining…" : "Join"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
