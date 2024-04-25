import { authX } from '@/authX';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator'
import { Lock, Settings } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link'
import React from 'react'
import RangePicker from './RangePicker';

export default async function WebsiteHeader({ fromLimit, toLimit, userId, websiteName, url, updatedAt, id, available }:
  { fromLimit: Date, toLimit: Date, userId: string; available: boolean, id: string; updatedAt: string; websiteName: string; url: string; }) {
  const session = await authX();
  return (
    <div className="max-w-6xl w-full mx-auto grid gap-2">
      <h1 className="font-semibold text-3xl">{websiteName}</h1>
      <div className='flex items-center justify-between'>
        <div className="flex items-center text-sm gap-2">
          <Link className="font-medium hover:underline" href={url} target="_blank">
            {url}
          </Link>
          <Separator className="h-5" orientation="vertical" />
          <div className="text-gray-500 flex items-center gap-2 dark:text-gray-400">
            <span className="inline-block w-2 h-2 bg-[#09CE6B] rounded-full animate-ping " />
            Last update: {moment(updatedAt).fromNow()}
          </div>
          <Separator className="h-5" orientation="vertical" />
          <div className="text-gray-500 flex items-center gap-2 dark:text-gray-400">
            <Lock className='w-4' />
            {
              available ? "Online" : "Offline"
            }
          </div>
        </div>
        <div className='flex items-center gap-2'>
          {/* <RangePicker fromDate={fromLimit} toDate={toLimit} /> */}
          {
            session?.user.id === userId && <a href={`/websites/${id}/settings`}>
              <Button size={'icon'} variant={'outline'}>
                <Settings />
              </Button>
            </a>
          }
        </div>

      </div>
    </div>
  )
}
