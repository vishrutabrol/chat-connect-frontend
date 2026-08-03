import { create } from "zustand";

interface CreateRoomModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateRoomModalStore = create<CreateRoomModalState>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
