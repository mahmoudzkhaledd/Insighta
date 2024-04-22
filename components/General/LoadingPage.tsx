import React from 'react'
import Spinner from '@/components/ui/Spinner'

export default function LoadingPage() {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <Spinner />
        </div>
    )
}
