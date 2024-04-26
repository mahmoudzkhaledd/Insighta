"use client"

import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { cn, toNumber } from "@/lib/utils";
import { Transaction } from "@prisma/client";
import { Check, Coins, ShoppingCart, X } from "lucide-react";

export const transactionsColumns: ColumnDef<Transaction>[] = [
    {
        header: "Transaction",
        cell(props) {
            const type = props.row.original.type;
            return <p className=" capitalize flex items-center gap-2">
                {
                    type == 'deposit' ? <Coins className="w-5 h-5" /> : type == 'purchase' ? <ShoppingCart className="w-5 h-5" /> : <></>
                }
                {type}
            </p>
        },
    },
    {
        header: "Amount",
        cell(props) {
            return <>{props.row.original.tran_total} {props.row.original.tran_currency}</>
        },
    },
    {
        header: "Method",
        cell(props) {

            return <>{props.row.original.payment_method}</>
        },
    },
    {
        header: "Status",
        cell(props) {
            return <>{props.row.original.payment_response_status == 'A' ? <Check className="w-5 h-5"/> : <X className="w-5 h-5"/>}</>
        },
    },
    {
        header: "Message",
        cell(props) {
            return <>{props.row.original.payment_response_message}</>
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