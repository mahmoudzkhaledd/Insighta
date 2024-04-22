import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CreateActionDialog from './CreateActionDialog';

export default function ActionsPageHeader({ websiteId }: { websiteId: string; }) {
  return (
    <div style={{ backgroundImage: "url(/images/actionBanner.jpg)" }}
      className='mb-9 w-full bg-cover h-auto md:h-[300px] px-10 py-10  bg-muted rounded-lg grid grid-cols-1 md:grid-cols-2'>
      <div className='flex flex-col justify-center gap-4'>
        <h2 className='text-xl md:text-4xl font-bold'>Actions</h2>
        <p className=' text-gray-800'>
          Authenticate and manage users from a variety of providers without server-side code
        </p>
        <div className='flex items-center gap-3'>
          <Link href={`/websites/${websiteId}/actions`}>
            <Button className='w-fit rounded-full'>
              Create new action
            </Button>
          </Link>
          <Button className='w-fit rounded-full' variant={'ghost'}>
            Learn more
          </Button>
        </div>
      </div>

    </div>
  )
}
