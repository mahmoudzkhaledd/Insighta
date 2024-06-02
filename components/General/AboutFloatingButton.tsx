'use client';
import { Info, Link2Icon, LinkIcon, MailIcon, PhoneIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import parse from 'html-react-parser';
import Image from 'next/image';
import { Avatar, AvatarFallback } from '../ui/avatar';
import Link from 'next/link';

export default function AboutFloatingButton() {
    const handelOpenDialog = () => { }
    return (
        <div className="group fixed bottom-4 right-4 p-2  flex items-end justify-end  ">
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
                    <div className="grid gap-6 p-6 sm:p-10">
                        <div className='flex gap-4 flex-col lg:flex-row'>
                            <div className="flex flex-col items-center gap-4">
                                <Image
                                    className=' rounded-full w-[150] aspect-square object-cover'
                                    width={100}
                                    height={100}
                                    src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?size=626&ext=jpg&ga=GA1.1.1518270500.1717286400&semt=ais_user"
                                    alt="@username" />
                                <div className="grid gap-1 text-center">
                                    <h3 className="text-2xl font-bold">Mahmoud Khaled</h3>
                                    <p className="text-gray-500 dark:text-gray-400">Software Engineer</p>
                                </div>
                            </div>
                            <div className=" mx-auto lg:mx-0 space-y-4">
                                <h2 className=' font-bold'>Contact Me</h2>
                                <div className="flex items-center gap-2">
                                    <MailIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a href='mailto:mahmoudnaggar2002@gmail.com' className="text-gray-500 dark:text-gray-400">mahmoudnaggar2002@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <p className="text-gray-500 dark:text-gray-400">+201145243378</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Link2Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                    <a
                                        href="https://portfolio-builder-frontend.vercel.app/portfolio/656e0b5bb0739f8d5367afb6"
                                        className=" underline text-gray-500 dark:text-gray-400"
                                        target='__blank'
                                    >

                                        View Portfolio
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="grid gap-4 text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Hi! I'm Mahmoud Khaled, a software developer specializing in mobile apps and full stack websites. I create innovative, user-friendly applications for iOS and Android, and handle all aspects of web development.
                                Let's connect and bring your ideas to life!
                            </p>

                        </div>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}
