"use client"
import { enterUserAccount } from "@/Services/admin/Users/EnterUserAccount";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import {
    ColumnDef,
} from "@tanstack/react-table";
import { BadgeCheck, Check, CircleArrowRight, Edit, View, X } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";
export const usersCols: ColumnDef<User>[] = [
    {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
        enableHiding: false,
    },
    {
        header: "Email",
        accessorKey: "email",
        enableSorting: true,
        enableHiding: false,
    },
    {
        header: "Phone",
        accessorKey: "phone",
        enableSorting: true,
        enableHiding: false,
    },
    {
        header: "Email Verified",
        enableSorting: true,
        enableHiding: false,
        cell: (data) => {
            return <>{
                data.row.original.emailVerified ? <Check className="w-5" /> : <X className="w-5" />
            }</>
        }
    },
    {
        header: "Registration date",
        accessorKey: "createdAt",
        enableSorting: true,
        enableHiding: false,
        cell: (data) => {
            return <>{moment(data.row.original.createdAt).format('LLL')}</>
        }
    },
    {
        header: "View",
        enableSorting: true,
        enableHiding: false,
        cell: (data) => {
            return <Link href={`/admin/users/${data.row.original.id}/info`}>
                <CircleArrowRight className="w-5" />
            </Link>
        }
    },
    {
        header: "Enter Account",
        enableSorting: true,
        enableHiding: false,
        cell: (data) => {
            const [loading, startTrans] = useTransition();
            const router = useRouter();
        
            const handelEnterUserAccount = () => {
                startTrans(async () => {
                    const res = await enterUserAccount(data.row.original.id);
                    if (res.error) {
                        toast.error(res.error);
                        return;
                    }
                    window.open("/dashboard", "_blank");
                });
            };
            return <Button disabled={loading} loading={loading} title="Enter user account" variant={'outline'} size={'icon'} onClick={handelEnterUserAccount}>
                <BadgeCheck className="w-5" />
            </Button>
        }
    },




]