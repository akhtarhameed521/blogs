// src/lib/schemas/userSchemas.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string({required_error: "name is required"}).min(3,  { message: "Name must be at least 2 characters",  } ),
  email: z.string({required_error: "email is required"}).email({ message: "Invalid email address" }),
  password: z.string({required_error: "password is required"}).min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string({required_error: "confirm password is required"}).min(6, { message: "Confirm Password must match Password" }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });;

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});
