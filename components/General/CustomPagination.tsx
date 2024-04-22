import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn, toInt } from '@/lib/utils'
export default function CustomPagination({ current, count }: { current: number, count: number }) {

    count = toInt(count) ?? 1;
    current = toInt(current) ?? 1;
    if (count <= 1) {
        return <></>
    }
    return (
        <Pagination className='mt-7'>
            <PaginationContent>
                <PaginationItem>
                    {
                        current > 0 && <PaginationPrevious href={`?page=${current - 1}`} />
                    }
                </PaginationItem>
                <PaginationItem>
                    {
                        [...Array(count)]
                            .map((e, idx) => <PaginationLink className={cn({
                                'bg-muted': current == idx
                            })} key={idx} href={`?page=${idx}`}>{idx + 1}</PaginationLink>)
                    }
                </PaginationItem>
                <PaginationItem>
                    {
                        current < count - 1 && <PaginationNext href={`?page=${current + 1}`} />
                    }
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
