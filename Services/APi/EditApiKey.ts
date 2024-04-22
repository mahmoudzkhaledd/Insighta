"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { extractAxiosError } from "@/lib/utils";
import {  createApiKeySchema, editApiKeySchema } from "@/types/ApiKeySchema";
import { redirect } from "next/navigation";
import { z } from "zod";


export const editApiKey = async (data: z.infer<typeof editApiKeySchema>): Promise<{ error?: string; data?: string; }> => {

    const session = await authX();
    if (!session?.user.id) {
        redirect('/');
        return {};
    }
    try {

        const parsed = editApiKeySchema.parse(data);
        const res = await appAxios.put(`api-keys/${parsed._id}?userId=${session.user.id}`, parsed);
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