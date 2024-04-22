"use client";
import { dashboardConfigs } from '@/constants/dashboard'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useState } from 'react';
import NextJSFramework from './NextJSFramework';
export default function Frameworks() {
    const [selected, setSelected] = useState(dashboardConfigs.frameworks[0]);
    return (
        <div>
            <div className='flex gap-4 items-center  flex-wrap'>
                {
                    dashboardConfigs.frameworks.map((e, idx) => <button
                        onClick={() => setSelected(e)}
                        className={cn('flex p-5 px-[50px] flex-col rounded-lg hover:bg-muted items-center transition-all justify-center gap-2',
                            {
                                "bg-muted": selected.name == e.name,
                            }
                        )} key={idx}>
                        <Image src={e.image} className='w-[60px]' width={200} height={200} alt={e.name} />
                        <p>{e.name}</p>
                    </button>)
                }
            </div>
            <div className='mt-[40px]'>
                {
                    selected.name == 'Next.js' && <NextJSFramework />
                }
            </div>
        </div>
    )
}
