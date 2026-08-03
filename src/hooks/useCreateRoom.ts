"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { roomService } from "@/services/room.service";
import { useCreateRoomModalStore } from "@/store/create-room.store";
import {
  toCreateRoomRequest,
  type CreateRoomFormData,
} from "@/schemas/create-room.schema";
import { ROUTES } from "@/constants/routes";
import { getErrorMessage } from "@/lib/error";

export function useCreateRoom() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const closeModal = useCreateRoomModalStore((state) => state.close);

  return useMutation({
    mutationFn: (data: CreateRoomFormData) =>
      roomService.createRoom(toCreateRoomRequest(data)),
    onSuccess: (room) => {
      toast.success("Room created successfully");
      closeModal();
      void queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push(ROUTES.ROOM(room.id));
    },
    onError: (error) => {
      toast.error(
        getErrorMessage(error, "Failed to create room. Please try again."),
      );
    },
  });
}
