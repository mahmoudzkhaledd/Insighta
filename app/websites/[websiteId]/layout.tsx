import React from 'react'
import WebsitesSidebar from '../_components/WebsitesSidebar/WebsitesSidebar'
import { getWebsite } from '@/Services/websites/getWebsite';

import NotFoundComponent from '@/components/General/NotFoundComponent';
import { Globe } from 'lucide-react';
import WebsiteProvider from '@/components/Providers/WebsiteProvider';
import { authX } from '@/authX';
import { cn } from '@/lib/utils';

export default async function WebsitesLayout({ children, params }: { params: { websiteId: string; }, children: React.ReactNode }) {
    const session = await authX();
    const website = await getWebsite(params.websiteId, false);
    if (website == null) return <NotFoundComponent
        icon={Globe}
        title="Website not found"
        subTitle="Can't find your website, please come later or contact the customer service." />;

    return (
        <WebsiteProvider value={website}>
            {
                session?.user.id === website.userId && <WebsitesSidebar className="fixed" />
            }
            <div className="flex w-full pb-8 ">
                <main className={cn("w-full", {
                    " ml-[65px] lg:ml-72": session?.user.id === website.userId,
                })}>
                    <div className="p-6 w-full h-full">
                        {children}
                    </div>
                </main>
            </div>
        </WebsiteProvider>
    )
}
