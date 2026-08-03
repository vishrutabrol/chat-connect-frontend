export const ROUTES = {
  HOME: "/",
  LOGIN: "/",
  DASHBOARD: "/dashboard",
  ROOM: (roomId: string) => `/room/${roomId}`,
} as const;
