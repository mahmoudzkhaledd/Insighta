"use client"
import { Button } from "@/components/ui/button";
import { Package } from "@prisma/client";
import {
    ColumnDef,
} from "@tanstack/react-table";
import { Check, Edit, X } from "lucide-react";
import Link from "next/link";
export const packagesCols: ColumnDef<Package>[] = [
    {
        id: "select",
        header: "Name",
        accessorKey: "name",
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: "Price",
        accessorKey: "price",
        cell: (data) => {
            return <>
                ${data.row.original.price}
            </>
        },
    },
    {
        header: "After Discount",
        accessorKey: "afterDiscount",
        cell: (data) => {
            return <>
                {
                    data.row.original.afterDiscount != null ? `$${data.row.original.afterDiscount}` : "None"
                }
            </>
        },
    },
    {
        header: "Active",
        accessorKey: "active",
        cell: (data) => {
            return <>
                {
                    data.row.original.active ? <Check className="w-5" /> : <X className="w-5" />
                }
            </>
        },
    },
    {
        header: "Users Count",
        accessorKey: "usersCount",
        cell: (data) => {
            return <>
                {data.row.original.usersCount} User
            </>
        },
    },
    {
        header: "Max Websites",
        accessorKey: 'maxWebsites',
        cell: (data) => {
            return <>
                {data.row.original.maxWebsites} Website
            </>
        },
    },
    {
        header: "Max Actions",
        accessorKey: 'maxActions',
        cell: (data) => {
            return <>
                {data.row.original.maxActions} Action
            </>
        },
    },
    {
        header: "Max Api Keys",
        accessorKey: 'maxApiKeys',
        cell: (data) => {
            return <>
                {data.row.original.maxApiKeys} Key
            </>
        },
    },
    {
        header: "Duration",
        accessorKey: "duration",
    },

    {
        header: "View",
        cell: (row) => {
            return (
                <Link href={`/admin/packages/update/${row.row.original.id}`}>
                    <Button size={'icon'} variant={'ghost'}>
                        <Edit className="w-5" />
                    </Button>
                </Link>
            )
        }
    },



]