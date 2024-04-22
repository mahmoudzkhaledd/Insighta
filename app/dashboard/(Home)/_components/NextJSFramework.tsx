import CodeCopy from '@/components/General/CodeCopy'
import { Terminal } from 'lucide-react'
import React from 'react'

export default function NextJSFramework() {
    return (
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
            <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    1
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold ">
                    Install
                    <span className="rounded-md border bg-muted ml-2 px-1.5 py-xs font-mono text-sm font-book text-primary">
                        @clerk/nextjs
                    </span>
                </h3>

                <div className='flex items-center justify-between gap-4'>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Get access to over 20+ pages including a dashboard layout, charts, kanban
                        board, calendar, and pre-order E-commerce &amp; Marketing pages.
                    </p>
                    <CodeCopy text='npm i next' title='Terminal' className='flex-auto max-w-[280px]' HeaderIcon={Terminal} />
                </div>

            </li>
            <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    2
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold ">
                    Set your environment variables
                </h3>

                <div className='flex items-center justify-between gap-4'>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Add these keys to your .env.local or create the file if it doesn't exist. Retrieve these keys anytime from the API keys page.
                    </p>
                    <CodeCopy text={`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGFyZ2UtcGhvZW5peC0xNS5jbGVyay5hY2NvdW50cy5kZXYk\nCLERK_SECRET_KEY=sk_test_bf7a1LKvbgApFzY4ZjgZzuFOHzrBZwfNpuzhUPUeSg`} className='flex-auto max-w-[450px]' title='.env' HeaderIcon={Terminal} >
                        <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bGFyZ2UtcGhvZW5peC0xNS5jbGVyay5hY2NvdW50cy5kZXYk</p>
                        <p>CLERK_SECRET_KEY=sk_test_bf7a1LKvbgApFzY4ZjgZzuFOHzrBZwfNpuzhUPUeSg</p>
                    </CodeCopy>
                </div>

            </li>
            <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    3
                </span>
                <h3 className="flex items-center  mb-1 text-lg font-semibold ">
                    Add
                    <span className="rounded-md border bg-muted mx-2 px-1.5 py-xs font-mono text-sm font-book text-primary">
                        ClerkProvider
                    </span>
                    to your app
                </h3>

                <div className='flex items-start justify-between gap-4'>
                    <p className="my-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        This global provider provides active session and user data to your app within it.
                    </p>
                    <CodeCopy text={`npm i analytix`} title='/src/app/layout.tsx' className='flex-auto max-w-[280px]' HeaderIcon={Terminal} />
                </div>

            </li>
            <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    4
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold ">
                    Update
                    <span className="rounded-md border bg-muted ml-2 px-1.5 py-xs font-mono text-sm font-book text-primary">
                        middleware.ts
                    </span>
                </h3>

                <div className='flex items-center justify-between gap-4'>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Get access to over 20+ pages including a dashboard layout, charts, kanban
                        board, calendar, and pre-order E-commerce &amp; Marketing pages.
                    </p>
                    
                </div>

            </li>

        </ol>

    )
}
