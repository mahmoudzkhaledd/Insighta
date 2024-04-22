"use client";
import { useForm } from 'react-hook-form'
import { addWebsiteSchema, editWebsiteSchema } from '@/types/AddNewWebsiteSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTransition } from 'react';
import { Input } from "@/components/ui/input";
import { WebsiteSchema } from '@/types/WebsiteSchema';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Info, Trash } from 'lucide-react';
import { editWebsite } from '@/Services/websites/EditWebsite';
import toast from 'react-hot-toast';
import { deleteWebsite } from '@/Services/websites/DeleteWebsite';
import CodeSnippet from '@/components/ui/CodeSnippet';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { dashboardConfigs } from '@/constants/dashboard';
import useUrl from '@/hooks/useUrl';


export default function EditWebsiteForm({ website }: { website: WebsiteSchema }) {
    const [loading, startTrans] = useTransition();
    const url = useUrl();
    const form = useForm<z.infer<typeof editWebsiteSchema>>({
        resolver: zodResolver(editWebsiteSchema),
        defaultValues: {
            name: website.name,
            url: website.url,
            available: website.available,
        },
    });
    const handelEditWebsite = (data: z.infer<typeof editWebsiteSchema>) => {
        if (!window.confirm("Are you sure you want to save the changes?")) return;
        startTrans(async () => {
            const res = await editWebsite(data, website._id);
            if (res?.error) {
                toast.error(res.error);
            }
        });
    }
    const handelDeleteWebsite = () => {
        if (!window.confirm("Are you sure you want to delete the website?")) return;
        startTrans(async () => {
            const res = await deleteWebsite(website._id);
            if (res?.error) {
                toast.error(res.error);
            }
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handelEditWebsite)} >
                <div className="grid grid-cols-1 mb-6 gap-4 w-full md:gap-6">

                    <div className=' space-y-3'>
                        <HoverCard >
                            <HoverCardTrigger type='button' className='flex w-fit mb-0 items-center gap-3 cursor-pointer'>
                                Website id
                                <Info className='w-4' />
                            </HoverCardTrigger>
                            <HoverCardContent className=" font-light">
                                {dashboardConfigs.websiteIdDesc}
                            </HoverCardContent>

                        </HoverCard>
                        <CodeSnippet className='w-full' text={website._id} />
                    </div>
                    <div className=' space-y-3'>
                        <HoverCard >
                            <HoverCardTrigger type='button' className='flex w-fit mb-0 items-center gap-3 cursor-pointer'>
                                Website page url
                                <Info className='w-4' />
                            </HoverCardTrigger>
                            <HoverCardContent className=" font-light">
                                {dashboardConfigs.pageInvitationUrl}
                            </HoverCardContent>

                        </HoverCard>
                        <CodeSnippet className='w-full' text={url ?  `${url}/websites/${website._id}` : "Loading ..."} />
                    </div>

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


                    <FormField
                        control={form.control}
                        name='available'
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <FormLabel className="text-base">
                                        Available online
                                    </FormLabel>
                                    <FormDescription>
                                        Other users can see your website statstics page .
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={loading}
                                        aria-readonly
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <FormLabel className="text-base">
                                Delete Website
                            </FormLabel>
                            <FormDescription>
                                Delete the website permanently without the ability to retreve the data.
                            </FormDescription>
                        </div>
                        <Button disabled={loading} onClick={handelDeleteWebsite} type='button' className='' size={'icon'} variant={'outline'}>
                            <Trash className='w-4' />
                        </Button>
                    </div>
                </div>
                <Button type='submit' className="ml-auto">Save</Button>
            </form>
        </Form>
    )
}
