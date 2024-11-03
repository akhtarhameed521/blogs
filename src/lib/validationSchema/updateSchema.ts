// src/lib/schemas/userSchemas.ts
import { z } from "zod";

export const updateUserSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  description: z.string().email().optional(),
  password: z.string().min(6).optional(),
  image: z.any()
});
