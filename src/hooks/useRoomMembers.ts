"use client";

import { useQuery } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";

export function useRoomMembers(roomId: string | undefined) {
  return useQuery({
    queryKey: ["room", roomId, "members"],
    queryFn: () => roomService.getRoomMembers(roomId as string),
    enabled: Boolean(roomId),
    retry: false,
  });
}
