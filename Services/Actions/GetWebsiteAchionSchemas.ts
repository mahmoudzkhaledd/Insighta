"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { redirect } from "next/navigation";

import { z } from "zod";
import { actionSchema } from "@/types/ActionSchema";

export const getWebsiteActionSchemas = async (websiteId: string): Promise<z.infer<typeof actionSchema>[] | null> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await appAxios.get(`actions/schemas?userId=${session.user.id}&websiteId=${websiteId}`);
        const schemas = z.array(actionSchema).parse(res.data.actions);
        return schemas;
    } catch (ex: any) {
        return null;
    }
};