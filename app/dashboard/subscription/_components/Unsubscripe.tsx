'use client';

import { unsubscripeFromPackage } from "@/Services/Subscription/UnsubscripeFromPackage";
import { Button } from "@/components/ui/button";
import { SubscriptionState } from "@prisma/client";
import { Trash2, X } from "lucide-react";
import { useTransition } from "react";

import toast from "react-hot-toast";

export default function UnsubscripeButton({ state }: {
    state: SubscriptionState
}) {
    const [pending, startTrans] = useTransition();

    const unscbscripe = async () => {
        if (!window.confirm("Are you sure you want to unsubscribe from this package?")) return;
        startTrans(async () => {
            const res = await unsubscripeFromPackage();
            if (res?.error) {
                toast.error(res.error);
            }
        });
    }
    return (
        <Button onClick={unscbscripe} title="Unsubscribe" 
        variant="destructive" disabled={pending} loading={pending} size={'icon'}>
            <X className="w-6 text-white" size={22} />
        </Button>
    )
}
