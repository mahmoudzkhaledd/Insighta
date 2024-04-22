"use client";
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useTransition } from "react";
import { createWebsite } from "@/Services/websites/AddNewWebsite";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { addWebsiteSchema } from "@/types/AddNewWebsiteSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";

export default function AddWebsiteDialog() {
    const [loading, startTrans] = useTransition();
    const form = useForm<z.infer<typeof addWebsiteSchema>>({
        resolver: zodResolver(addWebsiteSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    });
    const addWebsite = (data: z.infer<typeof addWebsiteSchema>) => {
        startTrans(async () => {
            const res = await createWebsite(data);
            if (res?.error) {
                toast.error(res.error);
            }
        });
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex rounded-full items-center gap-2 w-fit " size={'sm'} >
                    <Plus className="w-5 h-5" />
                    <span >Add website</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Website</DialogTitle>
                    <DialogDescription>Fill in the details of the new website</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(addWebsite)}>
                        <div className="grid gap-4 md:gap-6">
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel> Name </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                {...field}
                                                placeholder='Enter website name' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='url'
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel> Url </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                {...field}
                                                placeholder='example.com' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <Button type="submit" loading={loading} disabled={loading} className="w-full md:ml-auto">Add website</Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}