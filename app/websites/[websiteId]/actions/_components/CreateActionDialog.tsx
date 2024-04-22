
"use client";
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { actionSchema, createActionSchema } from "@/types/ActionSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { createAction } from "@/Services/Actions/CreateAction";
import { updateActionSchema } from "@/Services/Actions/UpdateActionSchema";
import { useConfigs } from "@/components/Providers/WebConfigsProvider";

import { Check } from "lucide-react";
import { frontendConfigs } from "@/constants/websiteConfigs";
import { cn, extractKeys } from "@/lib/utils";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import CodeSnippet from "@/components/ui/CodeSnippet";
import { Badge } from "@/components/ui/badge";

export default function CreateActionDialog({ children, websiteId, action }: { action?: z.infer<typeof actionSchema>, websiteId: string; children?: React.ReactNode }) {
    const [loading, startTrans] = useTransition();
    const configs = useConfigs();

    const form = useForm<z.infer<typeof createActionSchema>>({
        resolver: zodResolver(createActionSchema),
        defaultValues: {
            name: action?.name ?? "",
            color: action?.color,
            messageShape: action?.messageShape ?? "",
        },
    });
    const handelCreateAction = (data: z.infer<typeof createActionSchema>) => {
        startTrans(async () => {
            const res = action == null ? await createAction(data, websiteId) : await updateActionSchema(data, action.websiteId, action._id);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            if (action != null) window.location.reload();
        });
    }
    if (websiteId == null) {
        throw new Error("Website id is null");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {
                            action == null ? "Create new action" : "Update action"
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {
                            action == null ? "Please fill the data required to create a new action on your website." :
                                "Please fill the data required to update your action."
                        }
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handelCreateAction)}>
                        <div className="grid gap-4 md:gap-6">
                            {
                                action != null && <FormItem className="grid gap-2">
                                    <FormLabel> Action id </FormLabel>
                                    <FormControl>
                                        <CodeSnippet text={action._id} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            }
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel> Action Name </FormLabel>
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
                                name='color'
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel> Color </FormLabel>
                                        <FormControl >
                                            <div className=" grid grid-cols-4 gap-4">
                                                {
                                                    configs.actionsColorTypes.map((e, idx) => {
                                                        const color = (frontendConfigs.colorSchema as any)[e]
                                                        return (
                                                            <HoverCard key={idx}>
                                                                <HoverCardTrigger className=" w-fit">
                                                                    <div className="w-fit">
                                                                        <div onClick={() => {
                                                                            if (field.value == e) {
                                                                                field.onChange(null);
                                                                            } else {
                                                                                field.onChange(e);
                                                                            }
                                                                        }}
                                                                            className={cn('mb-2 border-2 cursor-pointer rounded-full aspect-square w-8')}
                                                                            style={{
                                                                                backgroundColor: color.backgroundColor,
                                                                                color: color.textColor,
                                                                                borderColor: color.borderColor,
                                                                            }} />
                                                                        {e == field.value && <Check className="w-5 mx-auto" />}
                                                                    </div>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className=" capitalize w-fit">
                                                                    {color.displayName}
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='messageShape'
                                render={({ field }) => (
                                    <FormItem className="grid gap-2">
                                        <FormLabel> Message shape </FormLabel>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {
                                                extractKeys(field.value).map((e, idx) => <Badge className="py-1" key={idx}>
                                                    {e}
                                                </Badge>)
                                            }
                                        </div>
                                        <FormControl>
                                            <Textarea
                                                disabled={loading}
                                                {...field}
                                                placeholder='A new action called {{actionName}} added.' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                                <Button type="submit" loading={loading} disabled={loading} className="w-full md:ml-auto">
                                    {
                                        action == null ? "Create action" : "Save changes"
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}