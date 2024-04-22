
import { ActionMarketingProps, actionsMarketingPagee } from '@/constants/WebsitesDashboardPages'

import React from 'react'
function Card({ ...props }: ActionMarketingProps) {
    return <div className="bg-muted mb-4 min-h-[180px] w-full rounded-md  p-8 md:mb-0">
        {props.icon && <props.icon />}
        <h2 className="font-bold mt-4 text-lg">{props.title}</h2>
        <p className="text-default">
            {props.desc}
        </p>
    </div>
}


export default function ActionsBodyShow() {

    return (
        <div className=' grid grid-cols-1 lg:grid-cols-3 gap-5'>
            {
                actionsMarketingPagee.map((e, idx) => <Card {...e} key={idx} />)
            }

        </div>

    )
}
