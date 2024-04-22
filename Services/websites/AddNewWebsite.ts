"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { addWebsiteSchema } from "@/types/AddNewWebsiteSchema";
import { WebsiteSchema, websiteSchema } from "@/types/WebsiteSchema";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { checkForUserSub } from "../Subscription/CheckForUserSub";




export const createWebsite = async (data: z.infer<typeof addWebsiteSchema>): Promise<{ data?: WebsiteSchema; error?: string; }> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const parsedData = addWebsiteSchema.parse(data);

        const res = await prisma.$transaction(async (prsma) => {

            const sub = await checkForUserSub(session.user.id);
            if (sub.currentWebsites >= sub.package.maxWebsites) { 
                throw new Error("You have reached the maximum limit for your package to create website, please upgrade your package.");
            }

            await prsma.subscription.update({
                where: {
                    userId: session.user.id,
                },
                data: {
                    currentWebsites: {
                        increment: 1,
                    },
                },
            });

            const res = await appAxios.post(`create-website`, {
                ...parsedData,
                userId: session.user.id,
            });
            return res;
        });
        const model = await websiteSchema.parseAsync(res.data.website);
        redirect(`/websites/${model._id}`)
        return { data: model };
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