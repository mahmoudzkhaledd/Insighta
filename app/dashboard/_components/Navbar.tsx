"use client"
import { signOut } from '@/authX'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useTransition } from 'react'
import { MobileSidebar } from './mobile-sidebar'
import Logo from '@/components/ui/Logo'
import { navbarItems } from '@/constants/dashboard'

export default function Navbar() {
    const [pending, startTrans] = useTransition();
    const signOutServer = () => {
        startTrans(async () => {
            signOut('/');
        });
    };
    return (
        <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
            <Logo className='hidden md:block' />
            <MobileSidebar />
            <nav className="hidden font-medium sm:flex flex-row items-center gap-2 text-sm ">
                {
                    navbarItems.map((e, idx) =>
                        <Link key={idx} className="text-gray-500 dark:text-gray-400" href={e.link}>
                            <Button variant={'ghost'} size={'sm'}>
                                {e.name}
                            </Button>
                        </Link>)
                }

            </nav>
            <div className="flex items-center gap-3">
                <Button disabled={pending} loading={pending} 
                className="h-full" variant={'outline'} onClick={signOutServer}>Logout</Button>
                <ThemeToggle />

            </div>
        </header>
    )
}
