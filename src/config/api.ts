export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api/v1",
  timeout: 15_000,
} as const;
