"use client";

import { UserSchema, userSchema } from "@/types/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "../_components/providers/UserProvider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { editUserAccount } from "@/Services/admin/Users/EditUserAccount";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import AddBalanceToUserModal from "../_components/AddBalanceToUserModal";

export default function page() {
    const excluded: string[] = [
        'id',
        'image',
        'emailVerified',
        'createdAt',
        'updatedAt',
    ];
    const [loading, startTrans] = useTransition();
    const user = useUser();
    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: user,
    });
    const handelSubmit = (values: UserSchema) => {
        startTrans(async () => {
            const res = await editUserAccount(values);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            toast.success("Changes saved successfully");
        });
    };
    return (
        <>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handelSubmit)} className="mx-auto overflow-hidden max-w-[800px] border  rounded-md">
                    <div className="space-y-6 mb-5 p-4 pt-0">
                        {
                            Object.keys(userSchema.shape).map((e, idx) => {
                                if (excluded.includes(e)) return <div key={idx}></div>;
                                return <FormField
                                    key={idx}
                                    control={form.control}
                                    // @ts-ignore
                                    name={e}
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel className=" capitalize"> {e} </FormLabel>
                                            <FormControl>
                                                {
                                                    // @ts-ignore 
                                                    <Input
                                                        disabled={loading}
                                                        {...field}
                                                        placeholder={e} />
                                                }

                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            })

                        }
                        <FormField
                            control={form.control}
                            name={'emailVerified'}
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Email Verified
                                        </FormLabel>
                                        <FormDescription>
                                            The user can not login without his email is verified
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                       
                    </div>


                    <div className="w-full border-t-2 flex justify-between items-center bg-muted p-4">
                        <p>Save changes</p>
                        <Button loading={loading} disabled={loading} type="submit">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
