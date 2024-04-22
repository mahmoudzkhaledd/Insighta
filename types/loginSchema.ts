import * as z from 'zod';
export const loginSchema = z.object({
    email: z.string().email()
        .min(3, "Email must be at lease 3 characters")
        .max(200, "Email must not exceed 200 characters"),
    password: z.string()
        .min(8, "Password must be at lease 8 characters")
        .max(100, "Password must not exceed 100 characters"),
   
})