
import { webConfigSchema } from "@/types/WebConfigSchema";
import { z } from "zod";

export const frontendConfigs = {
    colorSchema: {
        noColor: {
            backgroundColor: "",
            textColor: "",
            borderColor: "",
            displayName: "No Color",
        },
        success: {
            backgroundColor: "#3cc75c",
            textColor: "white",
            borderColor: "",
            displayName: "Success",
        },
        error: {
            backgroundColor: "#d31f2c",
            textColor: "white",
            borderColor: "",
            displayName: "Error",
        },
        info: {
            backgroundColor: "#557ef6",
            textColor: "white",
            borderColor: "",
            displayName: "Info",
        },
    }
}


export let websiteConfigs: z.infer<typeof webConfigSchema> = {
    cookieName: "",
    apiFullAccessKey: "",
    maxPageItems: 0,
    maxGraphPoint: 0,
    maxUserApiKeys: 0,
    apiKeyAccess: [],
    actionsColorTypes: [],
};

export function setWebsiteConfigs(data: z.infer<typeof webConfigSchema>) {
    websiteConfigs = data;
}