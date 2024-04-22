import { frontendConfigs } from '@/constants/websiteConfigs';
import { z } from 'zod';



const webConfigSchema = z.object({
    cookieName: z.string(),
    apiFullAccessKey: z.string(),
    maxGraphPoint: z.number(),
    maxUserApiKeys: z.number(),
    maxPageItems: z.number(),

    apiKeyAccess: z.array(z.string()),
    actionsColorTypes: z.array(z.string().refine(c => Object.keys(frontendConfigs.colorSchema).includes(c))),
});


export {
    webConfigSchema
};

export type WebConfigProps = z.infer<typeof webConfigSchema>;