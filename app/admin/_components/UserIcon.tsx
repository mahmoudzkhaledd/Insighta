"use client";
import { signOutAdmin } from '@/authXAdmin';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CircleUser } from 'lucide-react';
import React, { useTransition } from 'react'

export default function UserIcon() {
    const [loading, startTrans] = useTransition();
    const logOut = () => {
        startTrans(async () => {
            const res = await signOutAdmin('/admin/login');
        })
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <ThemeToggle className='w-full'/>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Button loading={loading} disabled={loading} className='w-full' size={'sm'} variant={'ghost'} onClick={logOut}>Logout</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
