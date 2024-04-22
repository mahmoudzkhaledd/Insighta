import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import React from 'react'

export default function Spinner({ className }: { className?: string }) {
    return (
        <Loader size={'23px'} className={cn("animate-spin", className)} />
    )
}
