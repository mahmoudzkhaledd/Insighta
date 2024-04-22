"use client"
import { renewUserSubscription } from '@/Services/Subscription/RenewSubscription';
import { Button } from '@/components/ui/button'
import { Orbit, RefreshCcw } from 'lucide-react'
import React, { useTransition } from 'react'

import toast from 'react-hot-toast';

export default function RenewSubComponent() {
    const [loading, startTrans] = useTransition();

    async function renewSubscription() {
        if(!window.confirm('Are you sure to renew your subscription?')) return;
        startTrans(async () => {
            const res = await renewUserSubscription();
            if (res?.error) {
                toast.error(res.error);
            } else {
                window.location.reload();
            }
        });
    }
    return (
        <div className="flex w-full flex-col gap-4 border shadow rounded-md py-4 px-4">
            <h2 className="text-lg font-bold flex gap-2"><Orbit /> Renew your subscription</h2>
            <Button disabled={loading} loading={loading} onClick={renewSubscription} variant={'success'} size={'sm'} className="flex items-center gap-2">
                <RefreshCcw className="w-5 h-5" />
                Renew your subscription
            </Button>
        </div>
    )
}
