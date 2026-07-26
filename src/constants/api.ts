export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  ROOMS: {
    LIST: "/rooms",
    CREATE: "/rooms",
    JOIN: (id: string) => `/rooms/${id}/join`,
    LEAVE: (id: string) => `/rooms/${id}/leave`,
    PUBLIC: "/rooms/public",
    PRIVATE: "/rooms/private",
  },
  CHAT: {
    MESSAGES: (roomId: string) => `/rooms/${roomId}/messages`,
    SEND: (roomId: string) => `/rooms/${roomId}/messages`,
  },
  USERS: {
    ME: "/users/me",
    PROFILE: (id: string) => `/users/${id}`,
  },
} as const;
