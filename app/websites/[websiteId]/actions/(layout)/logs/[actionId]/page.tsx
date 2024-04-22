'use server';
import { getWebsiteActionSchemaById } from '@/Services/Actions/GetActionSchema';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { Fingerprint, Info, Settings } from 'lucide-react';

import { toInt } from '@/lib/utils';
import CreateActionDialog from '../../../_components/CreateActionDialog';
import { Button } from '@/components/ui/button';
import CodeSnippet from '@/components/ui/CodeSnippet';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import SubActionComponent from '../../../_components/SubActionComponent';
import DeleteActionBtn from './_compontnt/DeleteActionBtn';
import CustomPagination from '@/components/General/CustomPagination';
import { websiteConfigs } from '@/constants/websiteConfigs';

export default async function ActionPage({ params, searchParams }: { searchParams: { page?: string; }, params: { actionId: string; websiteId: string; } }) {
    const page = toInt(searchParams.page) ?? 0;

    const res = await getWebsiteActionSchemaById(params.websiteId, params.actionId, { includeSubActions: true, page });
    if (res == null) {
        return <NotFoundComponent
            icon={Info}
            title='Action not found'
            subTitle='Please try again or contact the customer service'
        />
    }
    const { action, subActions } = res;

    return (
        <div>
            <div className='flex item-center justify-between gap-4 mb-5'>
                <h2 className=' text-xl font-bold'>{action.name} ({action.subActionsCount})</h2>
                <div className='flex items-center gap-3'>
                    <CreateActionDialog action={JSON.parse(JSON.stringify(action))} websiteId={action.websiteId}>
                        <Button variant={'outline'} size={'icon'}><Settings className='w-5' /></Button>
                    </CreateActionDialog>
                    <DeleteActionBtn actionId={action._id} websiteId={action.websiteId} />
                </div>
            </div>
            <Alert className='mb-5 space-x-3'>
                <Fingerprint />
                <AlertTitle className='mb-3'>Action id</AlertTitle>
                <AlertDescription>
                    <CodeSnippet text={action._id} />
                </AlertDescription>
            </Alert>
            <div className='rounded-lg p-4 py-3 bg-muted border grid grid-cols-5  w-full gap-4 mb-3'>
                {/* <p className=' text-sm font-semibold'>Action id</p> */}
                <p className=' col-span-4 text-sm font-semibold'>Message</p>
                <p className=' col-span-1 text-sm font-semibold'>Created at</p>
            </div>
            <div className=' space-y-3'>
                {
                    subActions?.map((e, idx) => <SubActionComponent key={idx} arrow={false} action={e} />)
                }
                {
                    subActions?.length == 0 && <div className='rounded-lg text-center cursor-pointer hover:bg-muted transition-all p-4 py-5 border   w-full gap-4'>
                        No data found
                    </div>
                }
            </div>
            <CustomPagination 
            count={Math.ceil(action.subActionsCount / websiteConfigs.maxPageItems)} current={page} />
        </div>

    )
}
