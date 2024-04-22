import { z } from 'zod';

const pointSchema = z.object({

    count: z.number(),
    date: z.string(),
});
const countSchema = z.record(z.string(), z.number());


const websiteSchema = z.object({
    _id: z.string(),
    url: z.string().url(),
    available: z.boolean(),
    name: z.string(),
    userId: z.string(),
    visitors: z.number(),
    visits: z.number(),
    totalSubActions: z.number(),
    currentActions: z.number(),
    visitsHistory: z.array(pointSchema),
    visitorsHistory: z.array(pointSchema),
    countries: countSchema,
    browsers: countSchema,
    operatinySystem: countSchema,
    pages: countSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});


export {
    websiteSchema,
    pointSchema,
    countSchema,
};
export type WebsiteSchema = z.infer<typeof websiteSchema>;