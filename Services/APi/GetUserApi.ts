"use server";
import { authX } from "@/authX";
import { appAxios } from "@/lib/appAxios";
import { UserApiSchema, userApiSchema } from "@/types/ApiKeySchema";
import { redirect } from "next/navigation";


export const getUserAPiKeys = async (): Promise<UserApiSchema | null> => {
    const session = await authX();
    if (!session?.user.id) {
        redirect('/');
        return null;
    }
    try {
        const res = await appAxios.get(`api-keys?userId=${session.user.id}`);
      
        const model = userApiSchema.parse(res.data.apiKeys);
        return model;
    } catch (ex) {
        return null;
    }
};