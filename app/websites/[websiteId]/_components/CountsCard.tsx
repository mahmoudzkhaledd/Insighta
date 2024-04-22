import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,DialogClose } from '@/components/ui/dialog';

import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { countSchema } from '@/types/WebsiteSchema';
import { Maximize2Icon, SearchIcon } from 'lucide-react'
import React from 'react'
import { z } from 'zod';
import DialogData from './DialogDataComponent';







export default function CountsCard({ title, data, emptyMsg, }: { emptyMsg: string; title: string; data: z.infer<typeof countSchema> }) {
    let total = 0;
    const sortable = Object.entries(data);
    sortable.sort((a, b) => {
        total += a[1];
        return -1 * a[1] + b[1];
    });
    const values = [];

    for (let i = 0; i < Math.min(5, sortable.length); i++) {
        values.push(sortable[i]);
    }



    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center border-b">
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm p-6">
                {
                    sortable.length == 0 &&
                    <div className=' text-center w-full h-[40px]'>
                        <span className=' text-gray-500'>{emptyMsg}</span>
                    </div>
                }
                {
                    values.map((e, idx) =>
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
            </CardContent>
            {
                sortable.length > 5 &&
                <CardFooter className="pb-4 px-6 justify-center bg-gradient-to-b from-background/50 to-background absolute inset-x-0 bottom-0">
                    <Dialog >
                        <DialogTrigger className="flex items-center border-gray-600 border gap-3 px-4 py-2 rounded-full bg-white dark:bg-muted" >
                            <p className=' text-sm'>View All</p>
                            <Maximize2Icon className='w-4 h-4' />
                        </DialogTrigger>
                        <DialogContent className="w-full max-w-[650px] min-w-0">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                            </DialogHeader>
                            <DialogData total={total} data={sortable} />
                            <DialogFooter className=' mt-4'>
                                <DialogClose className='w-full transition-all py-2 border rounded-md hover:bg-muted '>
                                    Close
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>


                </CardFooter>
            }
        </Card>
    )
}
