"use client"

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { Purchases, } from "@prisma/client";
import Link from "next/link";

export const purchesesColumns: ColumnDef<Purchases>[] = [
    {
        header: "Amount",
        cell(props) {
            return <>${props.row.original.amount} </>
        },
    },
    {
        header: "Type",
        cell(props) {
            return <div className=" capitalize">{props.row.original.type}</div>
        },
    },

    {
        header: "Package",
        cell(props) {
            return <Link href={`/dashboard/pricing/${props.row.original.packageId}`} className=" underline">Click here</Link>
        },
    },
    
    
    {
        header: "Done at",
        accessorKey: "createdAt",
        cell(props) {
            return <>{moment(props.row.original.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</>
        },
    },



]