"use client";
import { Subscription } from "@prisma/client";
import React, { useContext } from "react";
import { createContext } from "react";
interface SubscriptionCtx {
    subscription: Subscription,
    daysToExpire: number;
    expired: boolean;
}
const ctx = createContext<SubscriptionCtx | null>(null);
export const useSubscription = () => {
    const cont = useContext<SubscriptionCtx | null>(ctx);
    return cont;
};
export const SubscriptionProvider = ({ subscription, children }: { children: React.ReactNode, subscription: SubscriptionCtx | null }) => {
    return (
        <ctx.Provider value={subscription ?? null}>
            {children}
        </ctx.Provider>
    )
}

