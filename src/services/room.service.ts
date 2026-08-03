import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type {
  CreateRoomRequest,
  Room,
  RoomMember,
} from "@/types/room.types";
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

  async getRoom(roomId: string): Promise<Room> {
    const response = await apiClient.get<ApiResponse<Room>>(
      API_ENDPOINTS.ROOMS.GET(roomId),
    );
    return response.data.data;
  },

  async getRoomMembers(roomId: string): Promise<RoomMember[]> {
    const response = await apiClient.get<ApiResponse<RoomMember[]>>(
      API_ENDPOINTS.ROOMS.MEMBERS(roomId),
    );
    return response.data.data;
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
