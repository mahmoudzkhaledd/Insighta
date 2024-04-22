'use client';

import { addBalanceToUserAccount } from "@/Services/admin/Users/AddBalanceToUser";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toInt, toNumber } from "@/lib/utils";
import { amountSchema } from "@/types/ChargeAmountSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useUser } from "./providers/UserProvider";

export default function AddBalanceToUserModal() {
    const user = useUser();
    const [loading, startTrans] = useTransition();

    const form = useForm<z.infer<typeof amountSchema>>({
        resolver: zodResolver(amountSchema),
        defaultValues: {
            amount: 0,
        },
    });
    const handelCreateApiKey = (data: any) => {
        startTrans(async () => {
            const res = await addBalanceToUserAccount(data, user.id);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            toast.success("Balance Added Successfully");
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-1" >
                    Add Balance
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                        Add Balance To User
                    </DialogTitle>
                    <DialogDescription>
                        Be careful when adding balance to the user.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <Form {...form}>
                        <form className="w-full space-y-7" onSubmit={form.handleSubmit(handelCreateApiKey)}>
                            <FormField
                                control={form.control}
                                name='amount'
                                render={({ field }) => (
                                    <FormItem className="">
                                        <FormLabel> Amount </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                value={toNumber(field.value) ?? 0}
                                                onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                type="number"
                                                placeholder='$50' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <Button type="submit" loading={loading} disabled={loading} className="w-full md:ml-auto">Add</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    )
}
