"use server";
import { appAxios } from "@/lib/appAxios";
import { WebConfigProps, webConfigSchema } from "@/types/WebConfigSchema";


export const getWebsiteConfigs = async (): Promise<WebConfigProps | null> => {
    
    try {
        const res = await appAxios.get(`configs`);
        const model = webConfigSchema.parse(res.data.configs);
        return model;
    } catch (ex) {
        return null;
    }
};