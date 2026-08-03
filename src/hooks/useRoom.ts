"use client";

import { useQuery } from "@tanstack/react-query";
import { roomService } from "@/services/room.service";

export function useRoom(roomId: string | undefined) {
  return useQuery({
    queryKey: ["room", roomId],
    queryFn: () => roomService.getRoom(roomId as string),
    enabled: Boolean(roomId),
    retry: false,
  });
}
