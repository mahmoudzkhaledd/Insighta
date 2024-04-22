"use client";
import { deleteApiKey } from '@/Services/APi/DeleteApiKey'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useTransition } from 'react';
import toast from 'react-hot-toast';


export default function DeleteKeyBtn({ id }: { id: string }) {
    const [trans, startTrans] = useTransition();
    const handelDelete = () => {
        if (!window.confirm("Are you sure to delete this api key?")) return;
        startTrans(async () => {
            const res = await deleteApiKey(id);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            window.location.reload();
        });
    };
    return (
        <Button disabled={trans} loading={trans} onClick={handelDelete} size={'icon'} variant={'outline'}>
            <Trash className="w-4" />
        </Button>
    )
}
