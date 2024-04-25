"use client";
import React, { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, } from 'react';

export default function Insighta() {
    const pathname = usePathname();

    const initialized = useRef<string>('')
    const fetchWeb = async () => {
        try {
            const res = await fetch('https://insighta-server.onrender.com/visit',
                {
                    credentials: 'include',
                    method: "POST",
                    body: JSON.stringify({
                        url: window.location.href,
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (ex) { }
    };
    useEffect(() => {
        if (initialized.current != pathname) {
            initialized.current = pathname ?? "";
            fetchWeb();
        }
    }, [pathname]);

    return (<></>);
}