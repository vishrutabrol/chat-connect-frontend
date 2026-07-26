import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { Message, SendMessageRequest } from "@/types/chat.types";
import type { PaginatedResponse } from "@/types/api.types";

export const chatService = {
  async getMessages(
    roomId: string,
    page = 1,
    limit = 50,
  ): Promise<PaginatedResponse<Message>> {
    const response = await apiClient.get<PaginatedResponse<Message>>(
      API_ENDPOINTS.CHAT.MESSAGES(roomId),
      { params: { page, limit } },
    );
    return response.data;
  },

  async sendMessage(
    roomId: string,
    data: SendMessageRequest,
  ): Promise<Message> {
    const response = await apiClient.post<Message>(
      API_ENDPOINTS.CHAT.SEND(roomId),
      data,
    );
    return response.data;
  },
};
