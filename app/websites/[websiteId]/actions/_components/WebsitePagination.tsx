'use client';
import CustomPagination from '@/components/General/CustomPagination';
import { useConfigs } from '@/components/Providers/WebConfigsProvider';
import { useWebsite } from '@/components/Providers/WebsiteProvider'
import React from 'react'

export default function WebsitePagination({ page }: { page: number }) {
    const website = useWebsite();
    const configs = useConfigs();
    return (
        <CustomPagination current={page} count={Math.ceil(website.totalSubActions / configs.maxPageItems)} />
    )
}
