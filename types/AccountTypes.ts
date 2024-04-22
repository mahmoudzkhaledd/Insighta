import { z } from "zod";

export const accountTypes = z.enum(['user', 'admin']);
export type AccountType = z.infer<typeof accountTypes>;