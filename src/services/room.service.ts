import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { Room, CreateRoomRequest } from "@/types/room.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

export const roomService = {
  async getPublicRooms(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<Room>> {
    const response = await apiClient.get<PaginatedResponse<Room>>(
      API_ENDPOINTS.ROOMS.PUBLIC,
      { params: { page, limit } },
    );
    return response.data;
  },

  async getPrivateRooms(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<Room>> {
    const response = await apiClient.get<PaginatedResponse<Room>>(
      API_ENDPOINTS.ROOMS.PRIVATE,
      { params: { page, limit } },
    );
    return response.data;
  },

  async createRoom(data: CreateRoomRequest): Promise<Room> {
    const response = await apiClient.post<ApiResponse<Room>>(
      API_ENDPOINTS.ROOMS.CREATE,
      data,
    );
    return response.data.data;
  },

  async joinRoom(roomId: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.ROOMS.JOIN(roomId));
  },

  async leaveRoom(roomId: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.ROOMS.LEAVE(roomId));
  },
};
