"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { editWebsiteSchema } from "@/types/AddNewWebsiteSchema";
import { WebsiteSchema, websiteSchema } from "@/types/WebsiteSchema";

import { redirect } from "next/navigation";

import { z } from "zod";

export const editWebsite = async (data: z.infer<typeof editWebsiteSchema>, websiteId: string): Promise<{ data?: WebsiteSchema; error?: string; }> => {

    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const parsedData = editWebsiteSchema.parse(data);
        const res = await appAxios.put(`websites/${websiteId}/edit`, {
            ...parsedData,
            userId: session.user.id,
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