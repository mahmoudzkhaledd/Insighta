import { z } from "zod";

export const userSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    emailVerified: z.boolean(),
});

export type UserSchema = z.infer<typeof userSchema>;

