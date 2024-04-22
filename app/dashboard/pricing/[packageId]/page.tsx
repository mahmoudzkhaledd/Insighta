"use server"
import { prisma } from '@/lib/db';
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { authX } from '@/authX';
import CustomFormMessage from '@/components/General/CustomFormMessage';
import Link from 'next/link';
import PackageHeader from './_components/PackageHeader';
import DescriptionCard from './_components/DescriptionCard';
import { PackageMinus } from 'lucide-react';


function SubscriptionPage() {
    return <Link
        className=' underline text-inherit'
        href={`/dashboard/subscription`}>subscription page</Link>
}
function UserSubscription({ userSubscription, pkg, }: { userSubscription: any, pkg: any }) {
    return <>
        {
            userSubscription?.packageId &&
            <CustomFormMessage type={(pkg.id == userSubscription?.packageId && userSubscription?.state != 'refused') ? "success" : "warning"}>
                {
                    userSubscription?.packageId == pkg.id ?
                        userSubscription?.state == 'accepted' ?
                            <p>You're currently subscribed to this package; you can access subscription details through the <SubscriptionPage />.</p> :
                            userSubscription?.state == 'pending' ?
                                <p>You currently have an outstanding subscription to this package, and you can monitor updates to your subscription via the <SubscriptionPage />.</p> :
                                <p>Your subscription to this package has been rejected. Please check the <SubscriptionPage /> for the reason for rejection.</p>
                        : <p>
                            It seems you're already subscribed to a package. If you'd like to subscribe to this, kindly cancel your current subscription first through <SubscriptionPage />.
                        </p>
                }
            </CustomFormMessage>
        }
    </>
}

export default async function PackagePage({ params }: { params: { packageId: string } }) {
    const session = await authX();
    if (!session?.user?.id) {
        window.location.href = '/';
        return;
    }
    const pkg = await prisma?.package.findUnique({
        where: {
            id: params.packageId || "",
            active: true,
        },
        include: {
            advantages: true,
        }
    });
    if (!pkg) {
        return <NotFoundComponent
            icon={PackageMinus}
            title='The package could not be found'
            subTitle='Please consider reaching out to technical support or attempting again later.'
        />;
    }
    
    const userSubscription = await prisma.subscription.findUnique({
        where: {
            userId: session.user.id,
        },
    })
    return (
        <div className=' mx-auto max-w-[1000px] space-y-8'>

            <div className="absolute bottom-auto -z-10 left-auto right-0 top-0 h-[500px] w-[500px] translate-x-[0%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" />

            <UserSubscription pkg={pkg} userSubscription={userSubscription} />
            <PackageHeader pkg={pkg} userSubscriptionPackageId={userSubscription?.packageId} />
            <DescriptionCard pkg={pkg} />
        </div>
    );
}
