"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { TokenPayload } from "../types/types";
import Spinner from "@/components/ui/Spinner";

const context = createContext<TokenPayload | null>(null);



export function useAuthX(): TokenPayload | null {
    return useContext<TokenPayload | null>(context);
}
export default function AuthXProvider({ children, session }: { children: React.ReactNode, session: TokenPayload | null }) {
    return (
        <context.Provider value={session}>
            {children}
        </context.Provider>
    )
    const [mounted, setMount] = useState<boolean>(false);
    useEffect(() => {
        setMount(true);
    }, []);

    if (!mounted) return <div className="w-full h-full flex flex-col items-center justify-center">
        <Spinner className=" block" />
    </div>
    return (
        <context.Provider value={session}>
            {children}
        </context.Provider>
    )
}
