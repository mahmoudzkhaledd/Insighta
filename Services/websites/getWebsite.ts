"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { WebsiteSchema, websiteSchema } from "@/types/WebsiteSchema";
import { redirect } from "next/navigation";

export const getWebsite = async (websiteId: string, requireSession = true, withGraph = false): Promise<WebsiteSchema | null> => {
    const session = await authX();
    if (session?.user.id == null && requireSession) {
        redirect('/');
        return null;
    }
    try {
        const res = await appAxios.get(`websites/${websiteId}${session?.user.id ? `?userId=${session.user.id}&withGraph=${withGraph}` : `?withGraph=${withGraph}`}`);
        const model = await websiteSchema.parseAsync(res.data.website);
        return model;
    } catch (ex: any) {
        return null;
    }
};