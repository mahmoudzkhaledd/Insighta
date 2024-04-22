import React from 'react'
import ActionPageSidebar from '../_components/ActionPageSidebar'

export default function ActionsLayout({ children, params }: { children: React.ReactNode, params: { websiteId: string; } }) {
    return (
        <div className='flex flex-row items-start gap-6'>
            <ActionPageSidebar websiteId={params.websiteId} className='w-full flex-[1]' />
            <div className='w-full  flex-[3]'>
                {children}
            </div>
        </div>
    )
}
