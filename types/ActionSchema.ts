
import { frontendConfigs } from "@/constants/websiteConfigs";
import { z } from "zod";

const color = z.string()
    .refine(c => {
        return Object.keys(frontendConfigs.colorSchema).includes(c);
    });

export const createActionSchema = z.object({
    name: z.string().min(1, "Please enter action name.").max(50, "Action name must be less than 50 characters."),
    color: color,
    messageShape: z.string().min(1, "Please enter action message.").max(500, "Action message must be less than 500 characters."),
});

export const actionSchema = z.object({
    _id: z.string(),
    name: z.string(),
    subActionsCount: z.number(),
    websiteId: z.string(),
    color: color,
    messageShape: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});
export const subActionSchema = z.object({
    _id: z.string(),
    actionId: z.string(),
    websiteId: z.string(),
    color: color,
    message: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type AccountType = z.infer<typeof createActionSchema>;