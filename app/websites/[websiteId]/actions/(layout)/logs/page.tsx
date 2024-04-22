import React from 'react'
import SubActionComponent from '../../_components/SubActionComponent';
import { getAllActionLogs } from '@/Services/Actions/GetAllActionLogs';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { toInt } from '@/lib/utils';
import HeaderWebsite from '../../_components/HeaderWebsite';
import WebsitePagination from '../../_components/WebsitePagination';

export default async function ActionsLogsPage({ params, searchParams }: { searchParams: { page?: string; }, params: { websiteId: string; } }) {
  const page = toInt(searchParams.page) ?? 0;

  const logs = await getAllActionLogs(params.websiteId, page);
  if (logs == null) {
    return <NotFoundComponent title='Error occured' subTitle='Internal error occured, please try again later or contact the technical support.' />
  }
  return (
    <div>
      <HeaderWebsite />
      <div className='rounded-lg p-4 py-3 bg-muted border grid grid-cols-7  w-full gap-4 mb-3'>
        <p className=' col-span-4 text-sm font-semibold'>Message</p>
        <p className=' col-span-2 text-sm font-semibold'>Created at</p>
        <p className=' col-span-1 text-sm font-semibold'>Action</p>
      </div>
      <div className=' space-y-3'>
        {
          logs?.map((e, idx) => <SubActionComponent arrow={true} key={idx} action={e} />)
        }
      </div>
      {
        logs?.length == 0 && <div className='rounded-lg text-center cursor-pointer hover:bg-muted transition-all p-4 py-5 border   w-full gap-4'>
          No data found
        </div>
      }
      <WebsitePagination page={page} />
    </div>
  )
}
