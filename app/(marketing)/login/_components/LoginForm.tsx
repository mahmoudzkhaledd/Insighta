"use client"
import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import { loginSchema } from "../../../../types/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { login } from "../_actions/login"

export default function LoginForm() {
    const [loading, startTrans] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "mahmoudnaggar2002@gmail.com",
            password: "12345678",
        },
    });
    const submitForm = async (values: z.infer<typeof loginSchema>) => {
        startTrans(async () => {
            const res = await login(values);
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
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Please fill the data required to login.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 ">
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
                        <Button disabled={loading} loading={loading} className="w-full" size={'sm'}>Login</Button>
                        
                    </CardContent>
                </Card>
            </form>
        </Form>
    )
}
