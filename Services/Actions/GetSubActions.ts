"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { redirect } from "next/navigation";

import { z } from "zod";
import {  subActionSchema } from "@/types/ActionSchema";

export const getWebsiteSubActions = async (websiteId: string, actionId: string): Promise<z.infer<typeof subActionSchema>[] | null> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await appAxios.get(`actions/schemas/${actionId}?userId=${session.user.id}&websiteId=${websiteId}`);
        const schemas = z.array(subActionSchema).parse(res.data.action);
        return schemas;
    } catch (ex: any) {
        return null;
    }
};