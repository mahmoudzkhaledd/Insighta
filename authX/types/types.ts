import { accountTypes } from '@/types/AccountTypes';
import * as z from 'zod';

export const tokenSchema = z.object({
    user: z.object({
        id: z.string(),
        image: z.string(),
        name: z.string(),
        email: z.string(),
        type: accountTypes,
    }),
    expiresAt: z.string().or(z.number()),
});
export type TokenPayload = z.infer<typeof tokenSchema>;