import React from 'react'
import AdminNavbar from '../_components/Navbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen size-full w-full flex-col">
            <AdminNavbar />
            <main className="p-4 size-full md:gap-8 md:p-8">
                {children}
            </main>
        </div>
    )
}
