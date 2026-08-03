"use client";

import { useParams, useRouter } from "next/navigation";
import { CircleAlert, LayoutDashboard, RefreshCcw } from "lucide-react";
import { RoomHeader } from "@/components/room-header";
import { RoomInfoCard } from "@/components/room-info-card";
import { ChatPlaceholder } from "@/components/chat-placeholder";
import { MembersSidebar } from "@/components/members-sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoom } from "@/hooks/useRoom";
import { useRoomMembers } from "@/hooks/useRoomMembers";
import { ROUTES } from "@/constants/routes";

interface RoomErrorStateProps {
  onRetry: () => void;
}

function RoomErrorState({ onRetry }: RoomErrorStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-sm border-border/60 bg-card/50 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <div className="rounded-full bg-destructive/10 p-4">
            <CircleAlert className="size-8 text-destructive" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-foreground">
              Room not found
            </h2>
            <p className="text-sm text-muted-foreground">
              This room may have been deleted, or you may not have access to it.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={onRetry}>
              <RefreshCcw className="size-3.5" />
              Retry
            </Button>
            <Button size="sm" onClick={() => router.push(ROUTES.DASHBOARD)}>
              <LayoutDashboard className="size-3.5" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const roomQuery = useRoom(roomId);
  const membersQuery = useRoomMembers(roomId);

  const room = roomQuery.data;
  const isLoading = roomQuery.isPending;

  if (roomQuery.isError) {
    return (
      <div className="flex h-full flex-col">
        <RoomErrorState onRetry={() => void roomQuery.refetch()} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <RoomHeader room={room} isLoading={isLoading} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <RoomInfoCard room={room} isLoading={isLoading} />
          <ChatPlaceholder />
        </div>

        <MembersSidebar
          room={room}
          members={membersQuery.data}
          isLoading={isLoading || membersQuery.isPending}
          isError={membersQuery.isError}
        />
      </div>
    </div>
  );
}
