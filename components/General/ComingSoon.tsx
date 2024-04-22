"use client";
import { useEffect, useState, useTransition } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input'
import { subscribeSchema } from '@/types/SubscribeSchema';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form';
import { userSubscribe } from '@/Services/Emails/UserSubscribe';
import toast from 'react-hot-toast';
import { Check } from 'lucide-react';

export default function ComingSoon({ title, subTitle, subscribe, downTitle }: { title: string; subTitle: string; subscribe: boolean; downTitle?: string; }) {
    const [success, setSuccess] = useState<boolean | null>(null);
    useEffect(() => {
        setSuccess(window.localStorage.getItem('notified') == 'true');
    }, []);
    const [loading, startTrans] = useTransition();
    const form = useForm<z.infer<typeof subscribeSchema>>({
        resolver: zodResolver(subscribeSchema),
        defaultValues: {
            email: "",
        },
    });
    const handelSubmit = (values: z.infer<typeof subscribeSchema>) => {
        startTrans(async () => {
            const res = await userSubscribe(values);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            toast.success("You're now subscribed and we will notify you soon.");
            window.localStorage.setItem("notified", "true");
            setSuccess(true);

        });
    };
    return (
        <div className=" h-screen flex flex-col items-center justify-center text-center">
            <div className="">
                <h1 className="text-4xl font-bold">{title}</h1>
                <p className="mt-4 text-lg">{subTitle}</p>
            </div>
            <div className="mt-8">
                {
                    subscribe &&
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handelSubmit)} className='flex items-center justify-center'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <div className='flex items-center justify-center'>
                                                <Input
                                                    type="email"
                                                    {...field}
                                                    disabled={loading || success == null || success}
                                                    placeholder="Enter your email ..."
                                                    className="py-2 px-4 outline-none focus:ring-0 rounded-r-none focus:outline-none"
                                                    required={true}
                                                />
                                                <Button
                                                    type={(success || success == null) ? "button" : "submit"}
                                                    variant={success ? 'success' : "default"}
                                                    className="rounded-l-none py-2 px-4 rounded-r-md  focus:outline-none"
                                                    loading={loading || success == null }
                                                    disabled={loading || success == null || success}
                                                >
                                                    {
                                                        success ? <Check className='w-5' /> : "Notify me"
                                                    }
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </form>
                    </Form>
                }
                <p className="mt-2 text-gray-400 text-sm">
                    {downTitle}
                    Be the first to know when we launch!
                </p>
            </div>
        </div>

    )
}
