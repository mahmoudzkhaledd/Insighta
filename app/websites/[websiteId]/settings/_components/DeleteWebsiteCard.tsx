import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function DeleteWebsiteCard() {
    return (
        <Card className="w-full max-w-3xl mt-6">
            <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>Once you delete your account, there is no going back. Please be certain.</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="outline">Delete Account</Button>
            </CardFooter>
        </Card>
    )
}
