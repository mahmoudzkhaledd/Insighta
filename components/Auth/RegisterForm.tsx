'use client';
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { registerSchema } from "@/types/registerSchema";
import { register } from "../../app/(marketing)/register/_actions/register";
import toast from "react-hot-toast";
import CustomFormMessage from "../General/CustomFormMessage";

export default function RegisterForm({ redirectTo, emailSent }: { redirectTo?: string; emailSent?: string; }) {
    const [loading, startTrans] = useTransition();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
        },
    });
    const submitForm = async (values: z.infer<typeof registerSchema>) => {
        startTrans(async () => {
            const res = await register(values, redirectTo);
            if (res?.error) {
                toast.error(res?.error);
                return;
            }
        });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)}>
                <Card className="p-2 min-w-[auto] md:min-w-[500px]">
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 ">
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
                                            placeholder='Mahmoud khaled' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel> Email </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                            placeholder='me@example.com' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='phone'
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel> Phone </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            {...field}
                                            placeholder='01xxxxxxxxxx' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel> Password </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            disabled={loading}
                                            {...field}
                                            placeholder='********' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem className="grid gap-2">
                                    <FormLabel> Confirm Password </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            disabled={loading}
                                            {...field}
                                            placeholder='Confirm Password' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {
                            emailSent == 'true' && <CustomFormMessage className=" max-w-[550px]" message="A verification email has been sent to your inbox; please check both your inbox and spam folder." />
                        }
                        <Button
                            disabled={loading}
                            loading={loading}
                            type="submit"
                            className="w-full"
                            size={'sm'}>Create account</Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
