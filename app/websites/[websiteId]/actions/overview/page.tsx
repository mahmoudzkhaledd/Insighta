import React from 'react'
import CreateActionDialog from '../_components/CreateActionDialog'
import { Button } from '@/components/ui/button'
import ActionsPageHeader from '../_components/ActionsPageHeader'
import ActionsBodyShow from '../_components/ActionsBodyShow'
import { Plus } from 'lucide-react'

export default function ActionsOverview({ params }: { params: { websiteId: string; } }) {
    return (
        <div className='w-full '>
            <div className='flex mb-5 items-center gap-4 justify-between'>
                <h2 className=' text-xl font-bold'>Actions</h2>
                <CreateActionDialog websiteId={params.websiteId}>
                    <Button className='flex items-center gap-1' size={'sm'}><Plus className='w-4' /> Create action</Button>
                </CreateActionDialog>

            </div>
            <ActionsPageHeader websiteId={params.websiteId} />
            <ActionsBodyShow />
        </div>
    )
}
