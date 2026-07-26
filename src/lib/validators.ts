import { z } from "zod";
import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from "@/constants/ui";

export const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(USERNAME_MIN_LENGTH, `At least ${USERNAME_MIN_LENGTH} characters`)
    .max(USERNAME_MAX_LENGTH, `At most ${USERNAME_MAX_LENGTH} characters`)
    .regex(
      /^[a-z0-9_]+$/,
      "Only lowercase letters, numbers, and underscores",
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
