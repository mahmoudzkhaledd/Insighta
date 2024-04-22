import React, { useTransition } from 'react'

import { CardTitle, CardDescription, CardHeader, CardContent,  Card } from "@/components/ui/card"

import { getWebsite } from '@/Services/websites/getWebsite'
import { notFound } from 'next/navigation'
import EditWebsiteForm from './_components/EditWebsiteForm'
import NotFoundComponent from '@/components/General/NotFoundComponent'

export default async function WebsiteSettingsPage({ params }: { params: { websiteId: string; } }) {


    const website = await getWebsite(params.websiteId);
    if (website == null) return <NotFoundComponent />;

    return (
        <div className='w-full h-full flex items-center justify-center'>
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle>Webiste Settings</CardTitle>
                    <CardDescription>
                        Update your website information.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <EditWebsiteForm website={JSON.parse(JSON.stringify(website))} />
                </CardContent>
               
            </Card>
        </div>
    )
}