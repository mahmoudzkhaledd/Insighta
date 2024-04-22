"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { apiKeySchema, createApiKeySchema, userApiSchema } from "@/types/ApiKeySchema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { checkForUserSub } from "../Subscription/CheckForUserSub";

export const createApiKey = async (data: z.infer<typeof createApiKeySchema>): Promise<{ error?: string; data?: string; }> => {

    const session = await authX();
    if (!session?.user.id) {
        redirect('/');
        return {};
    }
    try {

        const parsed = createApiKeySchema.parse(data);
        const x = await prisma.$transaction(async (prsma) => {
            const sub = await checkForUserSub(session.user.id);
            if (sub.currentApiKeys >= sub.package.maxApiKeys) {
                throw new Error("You have reached the api keys limit, please upgrade your package.")
            }
            await prsma.subscription.update({
                where: {
                    id: sub.id,
                },
                data: {
                    currentApiKeys: {
                        increment: 1,
                    }
                }
            });
            const res = await appAxios.post(`generate-key?userId=${session.user.id}`, parsed);

        });
        return {};
    } catch (ex) {

        const err = extractAxiosError(ex);
        if (err != null) {
            return { error: err };
        }
        return {
            error: "Unknown error occured, please contact the customer service."
        };
    }
};