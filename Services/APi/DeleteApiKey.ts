"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

export const deleteApiKey = async (keyId: string): Promise<{ error?: string; data?: string; }> => {

    const session = await authX();
    if (!session?.user.id) {
        redirect('/');
        return {};
    }
    try {
        const res = await prisma.$transaction(async (prsma) => {
            const sub = await prsma.subscription.findFirst({
                where: {
                    userId: session.user.id,
                }
            });
            if (sub != null && sub.currentApiKeys > 0) {
                await prsma.subscription.update({
                    where: {
                        id: sub.id,
                    },
                    data: {
                        currentApiKeys: {
                            increment: -1,
                        },
                    },
                })
            }
            return await appAxios.delete(`/api-keys/${keyId}?userId=${session.user.id}`);
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