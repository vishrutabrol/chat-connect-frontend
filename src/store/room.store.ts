import { create } from "zustand";
import type { Room } from "@/types/room.types";

interface RoomState {
  rooms: Room[];
  activeRoom: Room | null;
  isLoading: boolean;
  setRooms: (rooms: Room[]) => void;
  addRoom: (room: Room) => void;
  setActiveRoom: (room: Room | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useRoomStore = create<RoomState>()((set) => ({
  rooms: [],
  activeRoom: null,
  isLoading: false,

  setRooms: (rooms) => set({ rooms }),

  addRoom: (room) =>
    set((state) => ({ rooms: [...state.rooms, room] })),

  setActiveRoom: (activeRoom) => set({ activeRoom }),

  setLoading: (isLoading) => set({ isLoading }),
}));
