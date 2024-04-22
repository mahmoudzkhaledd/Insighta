"use client";


import { WebsiteSchema } from "@/types/WebsiteSchema";
import { createContext, useContext } from "react";
import { z } from "zod";

const ctx = createContext<WebsiteSchema>({
    "_id": "",
    "url": "https://myclinix.vercel.app",
    "name": "My Clinix",
    "currentActions": 0,
    "available": true,
    "visitors": 0,
    "visits": 0,
    "countries": {},
    "browsers": {},
    "operatinySystem": {},
    "pages": {},
    "userId": "cluzleni2000012mjn6hikp5h",
    "visitsHistory": [],
    "visitorsHistory": [],
    "createdAt": "",
    "updatedAt": "",
    "totalSubActions": 0
});

export const useWebsite= () => {
    const confCtx = useContext(ctx);
    return confCtx;
};

export default function WebsiteProvider({ value, children }: { children?: React.ReactNode, value: WebsiteSchema }) {

    return (
        <ctx.Provider value={value}>
            {children}
        </ctx.Provider>
    )
}
