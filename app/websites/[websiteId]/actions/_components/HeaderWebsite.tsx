'use client'
import { useWebsite } from '@/components/Providers/WebsiteProvider'
import React from 'react'

export default function HeaderWebsite() {
    const website = useWebsite();
    return (
        <div className='flex item-center justify-between gap-4 mb-5'>
            <h2 className=' text-xl font-bold'>All website logs ({website.totalSubActions})</h2>
        </div>
    )
}
