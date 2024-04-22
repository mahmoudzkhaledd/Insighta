import { z } from "zod";

export const addWebsiteSchema = z.object({
    name: z.string().min(1, "Please enter website name").max(50, "Maximum characters is 50 character"),
    url: z.string().min(1, "Please enter website url").max(300, "Maximum characters is 300 character"),
    avalable: z.boolean().optional().nullable(),
});


export const editWebsiteSchema = z.object({
    ...addWebsiteSchema.shape,
    available: z.boolean(),
});