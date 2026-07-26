import { apiClient } from "@/lib/axios";
import { API_ENDPOINTS } from "@/constants/api";
import type { UserProfile } from "@/types/user.types";
import type { ApiResponse } from "@/types/api.types";

export const userService = {
  async getProfile(userId: string): Promise<UserProfile> {
    const response = await apiClient.get<ApiResponse<UserProfile>>(
      API_ENDPOINTS.USERS.PROFILE(userId),
    );
    return response.data.data;
  },
};
