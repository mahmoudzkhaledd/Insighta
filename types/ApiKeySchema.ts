
import { z } from 'zod';

const apiKeySchema = z.object({
    _id: z.string(),
    name: z.string(),
    apiKey: z.string(),
    totalUses: z.number(),
    valid: z.boolean(),
    access: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const userApiSchema = z.object({
    _id: z.string(),
    userId: z.string(),
    keys: z.array(apiKeySchema),
    createdAt: z.string(),
    updatedAt: z.string(),
});
const createApiKeySchema = z.object({
    name: z.string().min(1).max(100),
    access: z.string(),
});
const editApiKeySchema = z.object({
    _id: z.string(),
    name: z.string().min(1).max(100),
    access: z.string(),
});

export {
    userApiSchema,
    apiKeySchema,
    createApiKeySchema,
    editApiKeySchema,
};
export type UserApiSchema = z.infer<typeof userApiSchema>;