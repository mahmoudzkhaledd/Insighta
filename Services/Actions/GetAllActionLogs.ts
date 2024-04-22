"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { redirect } from "next/navigation";

import { z } from "zod";
import { subActionSchema } from "@/types/ActionSchema";

export const getAllActionLogs = async (websiteId: string, page: number): Promise<z.infer<typeof subActionSchema>[] | null> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await appAxios.get(`actions/all?userId=${session.user.id}&websiteId=${websiteId}&page=${page}`);
        const schemas = z.array(subActionSchema).parse(res.data.actions);
        return schemas;
    } catch (ex: any) {
        return null;
    }
};