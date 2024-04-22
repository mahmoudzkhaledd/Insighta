import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import React from 'react'

export default function UsersPageHeader({ ...props }: {
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
    totlUsers: number;
}) {
    props.lastWeek = props.lastWeek == 0 ? 1 : props.lastWeek;
    props.lastMonth = props.lastMonth == 0 ? 1 : props.lastMonth;
    const weekPercentage = (((props.thisWeek - props.lastWeek) / props.lastWeek) * 100);
    const monthPercentage = (((props.thisMonth - props.lastMonth) / props.lastMonth) * 100);
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 ">
            <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
            >
                <CardHeader className="pb-3">
                    <CardTitle>Add User</CardTitle>
                    <CardDescription className="  leading-relaxed">
                        Manually adding users via the admin dashboard ensures precise data entry and immediate access provisioning, facilitating seamless integration and controlled user management.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Link href={'/admin/users/add'}>
                        <Button>Add New User</Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardDescription>Total Users</CardDescription>
                    <CardTitle className="text-4xl">{props.totlUsers} User</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Total users from the date the website published
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={100} />
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                    <CardDescription>This Week</CardDescription>
                    <CardTitle className="text-4xl">{props.thisWeek} User</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {weekPercentage.toFixed(2)}% from last week
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={weekPercentage} aria-label="25% increase" />
                </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                    <CardDescription>This Month</CardDescription>
                    <CardTitle className="text-4xl">{props.thisMonth} User</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        {monthPercentage.toFixed(2)}% from last month
                    </div>
                </CardContent>
                <CardFooter>
                    <Progress value={monthPercentage} aria-label="12% increase" />
                </CardFooter>
            </Card>
        </div>
    )
}
