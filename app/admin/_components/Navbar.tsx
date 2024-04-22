"use client";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { adminNavbarItems } from '@/constants/Admin'
import { CircleUser, Menu, Package2, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UserIcon from './UserIcon'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
    const pathName = usePathname();

    return (
        <header className="sticky z-10 top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden py-4 flex-col gap-1 text-lg font-medium md:flex md:flex-row md:items-center md:gap-2 md:text-sm ">
                <Logo to='/admin' />
                {
                    adminNavbarItems.map((e, idx) => <Link
                        href={e.link}
                        key={idx}
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        <Button className={cn('w-fit', {
                            "bg-muted": (e.link.startsWith(pathName ?? "/asdasdasd") && pathName != '/admin') ||
                                (pathName == '/admin' && e.link == '/admin'),
                        })} variant={'ghost'} size={'sm'}>
                            {e.name}
                        </Button>
                    </Link>)
                }
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Logo to='/admin' />
                        {
                            adminNavbarItems.map((e, idx) => <Link
                                href={e.link}
                                key={idx}
                                className="text-foreground transition-colors hover:text-foreground"
                            >
                                {e.name}
                            </Link>)
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search for item..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                </form>
                <UserIcon />
            </div>
        </header>
    )
}
