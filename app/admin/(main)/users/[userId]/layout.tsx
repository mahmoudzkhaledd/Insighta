"use server";
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { UserRoundX } from 'lucide-react';
import UserProvider from './_components/providers/UserProvider';
import { Button } from '@/components/ui/button';

const navItems = [
    {
        title: "Info",
        link: "/info",
    },
    {
        title: "Subscription",
        link: "/subscription",
    },
    {
        title: "Wallet",
        link: "/wallet",
    },
    {
        title: "Edit",
        link: "/edit",
    },
];
export default async function UserPageLayout({ children, params, }: { params: { userId: string; }, children: React.ReactNode }) {
    const user = await prisma.user.findFirst({
        where: {
            id: params.userId ?? "",
        },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            image: true,
            emailVerified: true,
        },
    });
    if (user == null) {
        return <div className=' size-full flex items-center justify-center'>
            <NotFoundComponent
                title='User not found'
                subTitle='Please try again later or check the user id'
                icon={UserRoundX}
            />
        </div>
    }

    return (
        <UserProvider user={JSON.parse(JSON.stringify(user))}>
           
            <section className="block">
                <div className="overflow-hidden rounded-lg  bg-background ">

                    <div className=" space-y-6 md:block">
                        <div className="space-y-0.5">
                            <h2 className="text-2xl font-bold tracking-tight">User Info</h2>
                            <p className="text-muted-foreground">
                                Displays user information
                            </p>
                        </div>
                        <Separator />
                        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                            <aside className="-mx-4 lg:w-1/5">
                                <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                                    {
                                        navItems.map((e, idx) =>
                                            <Link key={idx} href={`/admin/users/${params.userId}${e.link}`} className="inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:text-accent-foreground h-10 py-2 px-4 hover:bg-transparent hover:underline justify-start" >
                                                <Button
                                                    className='w-full justify-start'
                                                    variant={'ghost'} size={'sm'}>
                                                    {e.title}
                                                </Button>
                                            </Link>)
                                    }
                                </nav>
                            </aside>
                            <div className="flex-1 ">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserProvider>
    )
}
