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
                        insighta library
                    </span>
                    (The library is not published yet)
                </h3>

                <div className='flex items-start justify-between gap-4'>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Introduce visitors to your website analytics platform and highlight the benefits of gaining insights into website performance and user behavior.
                    </p>
                    <CodeCopy text='npm i insighta' title='Terminal' className='flex-auto max-w-[280px]' HeaderIcon={Terminal} />
                </div>

            </li>

            <li className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    2
                </span>
                <h3 className="flex items-center  mb-1 text-lg font-semibold ">
                    Add
                    <span className="rounded-md border bg-muted mx-2 px-1.5 py-xs font-mono text-sm font-book text-primary">
                        Insighta Provider
                    </span>
                    to your app
                </h3>

                <div className='flex items-start justify-between gap-4'>
                    <p className="my-4 text-base font-normal text-gray-500 dark:text-gray-400">
                        Add global provider in layout.tsx page to make the things work.
                    </p>
                    <CodeCopy text={`import Insighta from 'Insighta'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}`} title='/src/app/layout.tsx' className='flex-auto max-w-[400px]' HeaderIcon={Terminal} >
                        
                    </CodeCopy>
                </div>

            </li>
            <li className="mb-10 ms-6">
                <span className="absolute bg-green-500 text-white flex items-center justify-center w-6 h-6 bg-muted rounded-full -start-3  ">
                    3
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold ">
                    You are done
                    
                </h3>

                <div className='flex items-center justify-between gap-4'>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    Let your creativity soar while we monitor your website's performance. With our analytics, stay focused on what matters most: your project's success.
                    </p>

                </div>

            </li>

        </ol>

    )
}
