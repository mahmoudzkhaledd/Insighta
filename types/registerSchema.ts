import { toNumber } from '@/lib/utils';
import * as z from 'zod';
export const registerSchema = z.object({
    name: z.string()
        .min(3, "Name must be at lease 3 characters")
        .max(200, "Name must not exceed 200 characters"),
    email: z.string().email()
        .min(3, "Email must be at lease 3 characters")
        .max(200, "Email must not exceed 200 characters"),
    phone: z.string()
        .min(1, "Phone number is required!")
        .max(15, "Phone must not exceed 15 characters!").refine((data) => {
            for (const x of data) {
                if (toNumber(x) == null) {
                    return false
                }
            }
            return true;
        }, {
            message: "Please enter valid phone number",
        }),
    password: z.string()
        .min(8, "Password must be at lease 8 characters")
        .max(100, "Password must not exceed 100 characters"),
    confirmPassword: z.string()
        .min(8, "Password must be at lease 8 characters")
        .max(100, "Password must not exceed 100 characters"),

}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});;