"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";
import { actionSchema, createActionSchema } from "@/types/ActionSchema";
import { checkForUserSub } from "../Subscription/CheckForUserSub";

export const createAction = async (data: z.infer<typeof createActionSchema>, websiteId: string): Promise<{ error?: string; }> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const parsedData = createActionSchema.parse(data);

        const res = await prisma.$transaction(async (prsma) => {
            const sub = await checkForUserSub(session.user.id);
            if (sub.currentTotalActions >= sub.package.maxActions) {
                throw new Error("You have reached the total actions limit, please upgrade your package.")
            }
            await prsma.subscription.update({
                where: {
                    id: sub.id,
                    userId: session.user.id,
                },
                data: {
                    currentTotalActions: {
                        increment: 1,
                    },
                },
            });


            const res = await appAxios.post(`actions/create-schema?userId=${session.user.id}`, {
                ...parsedData,
                websiteId,
            });
            return res;
        });
        const model = await actionSchema.parseAsync(res.data.action);
        redirect(`/websites/${websiteId}/actions/logs/${model._id}`)
        return {  };
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