
import { z } from "zod";
export const packageAdvantages = z.object({
    text: z.string().min(1, "Please enter the text"),
    active: z.boolean(),
});
export const addPackageSchema = z.object({
    name: z.string().min(1, "This field is required"),
    description: z.string(),
    fullDescription: z.string().min(1, "This field is required"),
    active: z.boolean(),
    maxWebsites: z.number().min(0),
    maxActions: z.number().min(0),
    maxApiKeys: z.number().min(0),
    price: z.number().min(0), //
    advantages: z.array(packageAdvantages),
    afterDiscount: z.nullable(z.number().min(0)), //
    duration: z.enum(['monthly', 'yearly', 'forever']), //

});