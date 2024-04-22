"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";
import { createActionSchema } from "@/types/ActionSchema";

export const updateActionSchema = async (data: z.infer<typeof createActionSchema>, websiteId: string, actionId: string): Promise<{ error?: string; }> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const parsedData = createActionSchema.parse(data);

        await appAxios.put(`actions/schemas/${actionId}?userId=${session.user.id}&websiteId=${websiteId}`, {
            ...parsedData,
        });

        return {};
    } catch (ex: any) {
        if (ex.message == "NEXT_REDIRECT") throw ex;

        const errMsg = extractAxiosError(ex);
        if (errMsg) {
            return { error: errMsg };
        }
        return {
            error: "Unknown error occured, please contact the customer support",
        }
    }
};