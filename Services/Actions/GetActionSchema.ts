"use server"
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { redirect } from "next/navigation";

import { z } from "zod";
import { actionSchema, subActionSchema } from "@/types/ActionSchema";
import { objectToQueryString } from "@/lib/utils";
type ActionFilter = {
    includeSubActions: boolean,
    page: number,
};



export const getWebsiteActionSchemaById = async (websiteId: string, actionId: string, filter?: ActionFilter): Promise<{ action: z.infer<typeof actionSchema>, subActions?: z.infer<typeof subActionSchema>[] | null } | null> => {
    const session = await authX();
    if (!session?.user.id) redirect('/');
    try {
        const res = await appAxios.get(`actions/schemas/${actionId}?userId=${session.user.id}&websiteId=${websiteId}&${objectToQueryString(filter)}`);

        const schemas = actionSchema.parse(res.data.action);
        let subActions = null;
        if (res.data.subActions != null) {
            subActions = z.array(subActionSchema).parse(res.data.subActions);
        }
        return {
            action: schemas,
            subActions: subActions,
        };
    } catch (ex: any) {
        return null;
    }
};