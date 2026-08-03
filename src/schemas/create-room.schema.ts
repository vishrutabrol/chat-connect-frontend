import { z } from "zod";
import {
  ROOM_DESCRIPTION_MAX_LENGTH,
  ROOM_DESCRIPTION_MIN_LENGTH,
  ROOM_MEMBER_LIMIT_MAX,
  ROOM_MEMBER_LIMIT_MIN,
  ROOM_NAME_MAX_LENGTH,
  ROOM_NAME_MIN_LENGTH,
  ROOM_PASSWORD_MAX_LENGTH,
  ROOM_PASSWORD_MIN_LENGTH,
} from "@/constants/ui";
import type { CreateRoomRequest } from "@/types/room.types";
import { ROOM_TYPES } from "@/types/room.types";

export const createRoomSchema = z
  .object({
    roomName: z
      .string()
      .trim()
      .min(1, "Room name is required")
      .min(
        ROOM_NAME_MIN_LENGTH,
        `Room name must be at least ${ROOM_NAME_MIN_LENGTH} characters`,
      )
      .max(
        ROOM_NAME_MAX_LENGTH,
        `Room name must be at most ${ROOM_NAME_MAX_LENGTH} characters`,
      ),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .min(
        ROOM_DESCRIPTION_MIN_LENGTH,
        `Description must be at least ${ROOM_DESCRIPTION_MIN_LENGTH} characters`,
      )
      .max(
        ROOM_DESCRIPTION_MAX_LENGTH,
        `Description must be at most ${ROOM_DESCRIPTION_MAX_LENGTH} characters`,
      ),
    roomType: z.enum(ROOM_TYPES, {
      error: "Room type is required",
    }),
    password: z.string().trim().optional(),
    memberLimit: z
      .union([z.number(), z.nan()])
      .optional()
      .refine(
        (value) =>
          value === undefined ||
          Number.isNaN(value) ||
          (value >= ROOM_MEMBER_LIMIT_MIN && value <= ROOM_MEMBER_LIMIT_MAX),
        `Member limit must be between ${ROOM_MEMBER_LIMIT_MIN} and ${ROOM_MEMBER_LIMIT_MAX}`,
      ),
  })
  .superRefine((data, ctx) => {
    if (data.roomType !== "PRIVATE") return;

    const password = data.password ?? "";

    if (password.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Password is required for private rooms",
      });
    } else if (password.length < ROOM_PASSWORD_MIN_LENGTH) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: `Password must be at least ${ROOM_PASSWORD_MIN_LENGTH} characters`,
      });
    } else if (password.length > ROOM_PASSWORD_MAX_LENGTH) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: `Password must be at most ${ROOM_PASSWORD_MAX_LENGTH} characters`,
      });
    }
  });

export type CreateRoomFormData = z.infer<typeof createRoomSchema>;

export function toCreateRoomRequest(
  data: CreateRoomFormData,
): CreateRoomRequest {
  const request: CreateRoomRequest = {
    roomName: data.roomName,
    description: data.description,
    roomType: data.roomType,
  };

  if (data.roomType === "PRIVATE" && data.password) {
    request.password = data.password;
  }

  if (data.memberLimit !== undefined && !Number.isNaN(data.memberLimit)) {
    request.memberLimit = data.memberLimit;
  }

  return request;
}
