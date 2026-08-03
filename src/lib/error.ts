import { AxiosError } from "axios";
import type { ApiError } from "@/types/api.types";

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as Partial<ApiError> | undefined;

    if (typeof data?.message === "string" && data.message.length > 0) {
      return data.message;
    }

    if (data?.errors) {
      const firstMessage = Object.values(data.errors).flat()[0];
      if (typeof firstMessage === "string") {
        return firstMessage;
      }
    }
  }

  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return fallback;
}
