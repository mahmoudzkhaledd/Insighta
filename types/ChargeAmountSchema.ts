import { z } from "zod";

export const amountSchema = z.object({
    amount: z.number().min(1, "The minimum number to charge is $50")
        .max(100000, "The max number to charge is 50000")
})
