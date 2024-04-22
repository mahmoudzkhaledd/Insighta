"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { WebsiteSchema, websiteSchema } from "@/types/WebsiteSchema";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";


export const deleteWebsite = async (websiteId: string): Promise<{ data?: WebsiteSchema; error?: string; }> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await prisma.$transaction(async (prsma) => {
            const sub = await prsma.subscription.findFirst({
                where: {
                    userId: session.user.id,
                }
            });
            if (sub != null && sub.currentWebsites > 0) {
                await prsma.subscription.update({
                    where: {
                        id: sub.id,
                    },
                    data: {
                        currentWebsites: {
                            increment: -1,
                        },
                    },
                })
            }
            return await appAxios.delete(`websites/${websiteId}/delete?userId=${session.user.id}`);
        });
        redirect(`/dashboard/websites`)
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