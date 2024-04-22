"use client";
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react'

export default function DialogData({ data, total, }: { data: [string, number][], total: number, }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [items, setItems] = useState(data);
    const handelSearch = () => {
        setItems(() => data.filter(e => e[0].startsWith(searchTerm)));
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(handelSearch, 300)
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
    return (
        <div >

            <div className="relative">
                <Input onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" />
                <SearchIcon className="absolute w-5 h-5 right-3 top-3 text-gray-400" />
            </div>
            <div className="flex flex-col gap-4 mt-4 overflow-auto max-h-[400px]">
                {
                    items.length == 0 && <div className='mt-4 text-center'>
                        No data found!
                    </div>
                }
                {
                    items.map((e, idx) =>
                        <Tooltip key={idx}>
                            <TooltipTrigger>
                                <Progress
                                    progressColor=' bg-muted'
                                    value={(e[1] / total) * 100}
                                    className='w-full hover:cursor-pointer hover:bg-gradient-to-r hover:from-muted hover:to-transparent h-7 bg-transparent flex rounded-md' >
                                    <div className='flex items-center px-4 gap-4 justify-between w-full rounded-sm'>
                                        <span className='truncate'>{e[0]}</span>
                                        <div className="font-semibold ">{e[1]}</div>
                                    </div>
                                </Progress>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{e[0]}</p>
                            </TooltipContent>
                        </Tooltip>
                    )
                }
            </div>

        </div>
    )
}
