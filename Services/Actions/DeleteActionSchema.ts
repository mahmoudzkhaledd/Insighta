"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { extractAxiosError, objectToQueryString } from "@/lib/utils";
type ActionFilter = {
    includeSubActions: boolean,
};



export const deleteActionSchema = async (websiteId: string, actionId: string, filter?: ActionFilter): Promise<{ error?: string; }> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await prisma.$transaction(async (prsma) => {
            await prsma.subscription.update({
                where: {
                    userId: session.user.id,
                },
                data: {
                    currentTotalActions: {
                        increment: -1,
                    },
                },
            });
            await appAxios.delete(`actions/schemas/${actionId}?userId=${session.user.id}&websiteId=${websiteId}&${objectToQueryString(filter)}`);
        });

        redirect(`/websites/${websiteId}/actions/`)

    } catch (ex: any) {

        const err = extractAxiosError(ex);
        if (err != null) {
            return {
                error: err,
            };
        }
        return { error: "Unknown error occured, please try again or contact the customer services." };
    }
};