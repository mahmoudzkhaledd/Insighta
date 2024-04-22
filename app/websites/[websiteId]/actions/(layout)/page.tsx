
import React from 'react'
import { Button } from '@/components/ui/button';

import CreateActionDialog from '../_components/CreateActionDialog';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { getWebsiteActionSchemas } from '@/Services/Actions/GetWebsiteAchionSchemas';
import { z } from 'zod';
import { actionSchema } from '@/types/ActionSchema';
import { cn, toInt } from '@/lib/utils';
import moment from 'moment';
import Link from 'next/link';

function ActionComponent({ action, lastIdx, firstIdx }: { firstIdx: boolean, lastIdx: boolean, action: z.infer<typeof actionSchema> }) {
  
  return (
    <Link href={`/websites/${action.websiteId}/actions/logs/${action._id}`}
      className={cn('rounded-lg cursor-pointer hover:bg-muted  transition-all p-4 py-5 border grid grid-cols-4  w-full gap-4', {
        " rounded-b-lg rounded-t-none": lastIdx,
        " rounded-t-none rounded-b-none": !lastIdx,
        " rounded-t-lg": firstIdx,
      })} >
      <p className=' truncate text-sm '>
        {action._id}
      </p>
      
      <h2 className='truncate font-semibold'>
        {action.name}
      </h2>
      <h2 className='truncate'>
        {action.subActionsCount}
      </h2>
      <p>{moment(action.createdAt).fromNow()}</p>
    </Link>
  )
}
export default async function ActionsPage({ params }: {  params: { websiteId: string; } }) {

  const schemas = await getWebsiteActionSchemas(params.websiteId);

  if (schemas == null) return <NotFoundComponent />;


  return <div className='w-full'>
    <div className='mb-4 flex items-center justify-between gap-4'>
      <h2 className=' text-xl font-bold'>Your website actions ({schemas.length})</h2>
      <CreateActionDialog websiteId={params.websiteId}>
        <Button className='New' size={'sm'}>Create action</Button>
      </CreateActionDialog>
    </div>
    <div className='rounded-lg p-4 py-3 bg-muted border grid grid-cols-4  w-full gap-4 mb-3'>
      <p className=' text-sm font-semibold'>Action id</p>
      <p className=' text-sm font-semibold'>Name</p>
      <p className=' text-sm font-semibold'>Logs</p>
      <p className=' text-sm font-semibold'>Created at</p>
    </div>
    {
      schemas?.map((e, idx) => <ActionComponent key={idx} firstIdx={idx == 0} lastIdx={idx == schemas.length - 1} action={e} />)
    }
    {
      schemas?.length == 0 && <div className='rounded-lg text-center cursor-pointer hover:bg-muted transition-all p-4 py-5 border   w-full gap-4'>
        No data found
      </div>
    }
  </div>

}
