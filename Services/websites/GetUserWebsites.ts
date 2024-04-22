"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import { WebsiteSchema, websiteSchema } from "@/types/WebsiteSchema";
import { redirect } from "next/navigation";

import { z } from "zod";

export const getUserWebsites = async (): Promise<WebsiteSchema[] | null> => {
    const session = await authX();
    if (!session?.user.id) {
        redirect('/');
        return null;
    }
    try {
        const res = await appAxios.get(`websites?userId=${session.user.id}`);

        const model = await z.array(websiteSchema).parseAsync(res.data.websites);
        return model;
    } catch (ex: any) {
        
        return null;
    }
};