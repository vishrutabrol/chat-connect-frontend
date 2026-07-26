const STORAGE_KEYS = {
  ACCESS_TOKEN: "cc_access_token",
  REFRESH_TOKEN: "cc_refresh_token",
  USER: "cc_user",
} as const;

export const storage = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage full or unavailable
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch {
      // Ignore
    }
  },

  getAccessToken(): string | null {
    return this.get(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken(token: string): void {
    this.set(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getRefreshToken(): string | null {
    return this.get(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token: string): void {
    this.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  getUser<T>(): T | null {
    const raw = this.get(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  setUser<T>(user: T): void {
    this.set(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser(): void {
    this.remove(STORAGE_KEYS.USER);
  },
} as const;
