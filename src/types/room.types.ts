export const ROOM_TYPES = ["PUBLIC", "PRIVATE"] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export type RoomMemberRole = "OWNER" | "ADMIN" | "MEMBER";

export interface RoomMember {
  id: string;
  username: string;
  role: RoomMemberRole;
  avatar?: string | null;
  isOnline?: boolean;
  joinedAt?: string;
}

export interface Room {
  id: string;
  roomName: string;
  description: string;
  roomType: RoomType;
  memberLimit?: number | null;
  memberCount: number;
  owner?: RoomMember | null;
  createdBy?: string | null;
  members?: RoomMember[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoomRequest {
  roomName: string;
  description: string;
  roomType: RoomType;
  password?: string;
  memberLimit?: number;
}
