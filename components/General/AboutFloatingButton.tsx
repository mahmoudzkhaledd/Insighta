'use client';
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';


export default function AboutFloatingButton() {
    const handelOpenDialog = () => { }
    return (
        <div className="group fixed bottom-4 right-4 p-2  flex items-end justify-end w-24 h-24 ">
            <Dialog>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <button onClick={handelOpenDialog} className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 absolute  ">
                                <Info />
                            </button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>About Me</span>
                    </TooltipContent>
                </Tooltip>
                <DialogContent className="max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            About me
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nemo, sequi quod rerum corrupti ad voluptatum optio, enim nihil nostrum cumque dolorem doloremque libero, neque laborum impedit? Reiciendis, nulla amet?
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
