"use client";

import { useEffect, useState } from "react";

export default function useUrl() {
    const [url, setUrl] = useState<string | null>(null);
    useEffect(() => {
        setUrl(window.location.origin);
    }, []);
    return url;
}
