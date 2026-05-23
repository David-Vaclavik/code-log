import * as z from "zod";

// same as in FE, just without confirmPassword and error messages since those are only relevant for FE validation
export const registerSchema = z.object({
  name: z.string().trim().min(2).max(32),
  email: z.string().trim().toLowerCase().max(255).pipe(z.email()),
  password: z.string().min(8).max(64),
});

export type RegisterBody = z.infer<typeof registerSchema>;
