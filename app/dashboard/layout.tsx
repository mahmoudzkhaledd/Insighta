import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar/DashboardSidebar'


export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <DashboardSidebar className="fixed" />
            <div className="flex w-full h-full pb-8 ">
                <main className="w-full h-full ml-[75px] lg:ml-72">

                    <div className="p-6 w-full h-full">
                        {children}
                    </div>
                </main>
            </div>
        </ >
    )
}
