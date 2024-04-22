"use client";

import { WifiOffIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function OnlineOfflineProvider({ children }: { children: React.ReactNode }) {
    const [isOnline, setOnline] = useState<boolean>(true);
    useEffect(() => {
        window.addEventListener('online', () => { setOnline(true); });
        window.addEventListener('offline', () => { setOnline(false); });
    }, []);
    if (isOnline)
        return (<>{children}</>)
    else return (
        <div>
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <div className="flex flex-col items-center space-y-2">
                    <WifiOffIcon className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tighter">You are offline</h1>
                </div>
                <p className="text-center max-w-[500px] text-gray-500  dark:text-gray-400">
                    It seems you are not connected to the internet. Please check your connection and try again.
                </p>
            </div>
        </div>
    )
}
