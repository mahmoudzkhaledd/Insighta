"use client";

import { WebConfigProps } from "@/types/WebConfigSchema";
import { createContext, useContext } from "react";

const ctx = createContext<WebConfigProps>({
    cookieName: "webanalytix",
    maxGraphPoint: 30,
    maxUserApiKeys: 10,
    apiFullAccessKey: "",
    maxPageItems: 0,
    actionsColorTypes: [],
    apiKeyAccess: [
        "analysis",
        "errors",
        "actions",
    ],
});

export const useConfigs = () => {
    const confCtx = useContext(ctx);
    return confCtx;
};

export default function WebConfigsProvider({ value, children }: { children?: React.ReactNode, value: WebConfigProps }) {

    return (
        <ctx.Provider value={value}>
            {children}
        </ctx.Provider>
    )
}
