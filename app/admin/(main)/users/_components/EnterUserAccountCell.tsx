import { enterUserAccount } from '@/Services/admin/Users/EnterUserAccount';
import { Button } from '@/components/ui/button';
import { CellContext } from '@tanstack/react-table';

import { BadgeCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import toast from 'react-hot-toast';

export default function EnterUserAccountCell({ data }: {
    data: CellContext<{
        id: string;
        name: string;
        email: string;
        password: string;
        phone: string;
        image: string | null;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown>
}) {
    const [loading, startTrans] = useTransition();
    const router = useRouter();

    const handelEnterUserAccount = () => {
        startTrans(async () => {
            const res = await enterUserAccount(data.row.original.id);
            if (res.error) {
                toast.error(res.error);
                return;
            }
            window.open("/dashboard", "_blank");
        });
    };
    return (
        <Button disabled={loading} loading={loading} title="Enter user account" variant={'outline'} size={'icon'} onClick={handelEnterUserAccount}>
            <BadgeCheck className="w-5" />
        </Button>
    )
}