"use client";
import { cn } from "@/lib/utils";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { signOut } from "@/authX";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { websitesSidebarItems } from "@/constants/WebsitesDashboardPages";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";


export default function WebsitesSidebar({ sheet, className }: { sheet?: boolean, className?: string; }) {
    const params = useParams<{ websiteId: string; }>();

    const [pending, startTrans] = useTransition();

    const signOutServer = () => {
        startTrans(async () => {
            signOut('/');
        });
    };

    return (
        <nav className={cn(`z-10 border-r pb-6 bg-background h-screen overflow-y-auto lg:block w-[75px] lg:w-72`, className)}>
            <div className="space-y-0 ">
                <div className="flex h-[60px] mb-4 items-center border-b px-0 lg:px-6">
                <Logo className="hidden lg:block"/>
                    <ThemeToggle className="ml-auto w-fit px-3 mx-auto"  />
                </div>
                <div className="px-4">
                    {
                        websitesSidebarItems.map((e, idx) =>
                            <Link key={idx} className='block group' href={
                                e.soon == true ? "" : (e.absLink ?? `/websites/${params?.websiteId}/${e.link}`)
                            }>
                                <Button size={'sm'} className={cn(
                                    'w-full flex items-center gap-2  text-start',
                                    {
                                        "justify-between": !!e.soon,
                                        "justify-start": !!!e.soon,
                                    }
                                )} variant={'ghost'}>
                                    <div className="flex items-center gap-2">
                                        {e.icon && <e.icon className='w-4  h-4 group-hover:animate-wave' />}
                                        <p className='hidden lg:block capitalize'>{e.name}</p>
                                    </div>
                                    {
                                        !!e.soon && <Badge className="hidden lg:block">
                                            Soon
                                        </Badge>
                                    }
                                </Button>
                            </Link>)
                    }
                    <Button disabled={pending} loading={pending}
                        className='w-full  flex items-center gap-2 justify-start text-start'
                        variant={'ghost'}
                        size={'sm'}
                        onClick={signOutServer}>
                        <LogOut className='w-4 h-4 group-hover:animate-wave' />
                        <p className="hidden lg:block">
                            Logout
                        </p>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
