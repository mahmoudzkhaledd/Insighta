import * as z from 'zod';
export const adminLoginSchema = z.object({
    username: z.string()
        .min(3, "User Name must be at lease 3 characters")
        .max(200, "User Name must not exceed 200 characters"),
    password: z.string()
        .min(8, "Password must be at lease 8 characters")
        .max(100, "Password must not exceed 100 characters"),
   
})