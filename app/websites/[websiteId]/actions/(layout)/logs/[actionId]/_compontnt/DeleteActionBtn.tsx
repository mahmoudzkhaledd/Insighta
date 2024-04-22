"use client";

import { deleteActionSchema } from "@/Services/Actions/DeleteActionSchema";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export default function DeleteActionBtn({ websiteId, actionId }: { actionId: string; websiteId: string; }) {
    const [loading, startTrans] = useTransition();
    const handelDel = () => {
        if (!window.confirm("Are you sure to delete this action?")) return;
        startTrans(async () => {
            const res = await deleteActionSchema(websiteId, actionId);
        });
    };
    return (
        <Button onClick={handelDel} loading={loading} disabled={loading} variant={'outline'} size={'icon'}>
            <Trash className='w-5' />
        </Button>
    )
}
