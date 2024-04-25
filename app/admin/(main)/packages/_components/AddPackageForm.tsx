"use client";


import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { addPackageSchema } from "@/types/PackageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import PricingCard from "@/components/General/PricingCard";
import { toNumber } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";
import { createPackage } from "@/Services/admin/Packages/AddPackage";
import toast from "react-hot-toast";
import { PackageProps } from "@/types";
import { editPackage } from "@/Services/admin/Packages/EditPackage";


export default function AddPackageForm({ pkgUpdate }: { pkgUpdate?: PackageProps }) {
    const [loading, startTrans] = useTransition();

    const form = useForm<z.infer<typeof addPackageSchema>>({
        resolver: zodResolver(addPackageSchema),
        defaultValues: {
            name: pkgUpdate?.name ?? "",
            price: pkgUpdate?.price ?? 0,
            afterDiscount: pkgUpdate?.afterDiscount ?? null,
            description: pkgUpdate?.description ?? "",
            fullDescription: pkgUpdate?.fullDescription ?? "",
            duration: pkgUpdate?.duration ?? "monthly",
            maxActions: pkgUpdate?.maxActions ?? 0,
            maxApiKeys: pkgUpdate?.maxApiKeys ?? 0,
            maxWebsites: pkgUpdate?.maxWebsites ?? 0,
            advantages: pkgUpdate?.advantages ?? [],
            active: pkgUpdate?.active ?? true,
            maxGraphPoints: pkgUpdate?.maxGraphPoints,
        }
    });
    const fieldArr = useFieldArray({
        name: 'advantages',
        control: form.control,
    });
    const pkg = form.watch();

    const submitForm = (values: z.infer<typeof addPackageSchema>) => {

        startTrans(async () => {
            const res = pkgUpdate == null ? await createPackage(values) : await editPackage(values, pkgUpdate.id);
            if (res?.error) {
                toast.error(res.error);
                return;
            }
            toast.success(pkgUpdate == null ? "Package created successfully" : "Changes saved successfully")
        });
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitForm)} >
                <div className="flex mb-4 items-center justify-between">
                    <h2 className="text-xl font-bold">
                        {
                            pkgUpdate == null ? "Add new package" : "Edit Package"
                        }
                    </h2>
                    <Button loading={loading} disabled={loading} type="submit" size={'sm'} >
                        {
                            pkgUpdate == null ? "Add" : "Save Changes"
                        }
                    </Button>
                </div>
                <div className="grid flex-1 gap-4 overflow-auto  md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative w-full h-fit hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
                        <fieldset className="w-full grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Main informations
                            </legend>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Package name </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={loading}
                                                    {...field}
                                                    placeholder='Basic' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='duration'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel> Package duration </FormLabel>
                                        <FormControl>
                                            <Select defaultValue={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger

                                                    className="items-start [&_[data-description]]:hidden"
                                                >
                                                    <SelectValue placeholder="Subscription duration" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='monthly'>
                                                        <span>Monthly</span>
                                                    </SelectItem>
                                                    <SelectItem value="yearly">
                                                        <span>Yearly</span>
                                                    </SelectItem>
                                                    <SelectItem value="forever">
                                                        <span>For ever</span>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='price'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel> Price </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                        defaultValue={toNumber(field.value) ?? 0}
                                                        type="number"
                                                        min={0}
                                                        placeholder='10' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='afterDiscount'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel> Price after discount *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}

                                                        onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                        // @ts-ignore
                                                        defaultValue={toNumber(field.value)}
                                                        type="number"
                                                        min={0}
                                                        placeholder='0' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Description </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    {...field}
                                                    placeholder='Description ...' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name='fullDescription'
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Full Description </FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    disabled={loading}
                                                    {...field}
                                                    placeholder='Full Description ...' />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </fieldset>
                        <fieldset className="w-full grid gap-6 rounded-lg border p-4">
                            <legend className="-ml-1 px-1 text-sm font-medium">
                                Features
                            </legend>
                            <FormField
                                control={form.control}
                                name='maxGraphPoints'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel> Max Graph Points </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                defaultValue={toNumber(field.value) ?? undefined}
                                                type="number"
                                                min={0}
                                                placeholder='0' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='maxWebsites'
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel> Max Websites </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}

                                                onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                defaultValue={toNumber(field.value) ?? 0}
                                                type="number"
                                                min={0}
                                                placeholder='0' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='maxActions'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel> Max Actions </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                        defaultValue={toNumber(field.value) ?? 0}
                                                        type="number"
                                                        min={0}
                                                        placeholder='10' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="grid gap-3">
                                    <FormField
                                        control={form.control}
                                        name='maxApiKeys'
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel> Max Api Keys </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        disabled={loading}
                                                        onChange={(e) => field.onChange(toNumber(e.target.value))}
                                                        defaultValue={toNumber(field.value) ?? 0}
                                                        type="number"
                                                        min={0}
                                                        placeholder='0' />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name='active'
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Active</FormLabel>
                                            <FormDescription>
                                                People can see the package and use it.
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
                        </fieldset>

                    </div>
                    <fieldset className="grid h-fit w-full gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                            Package Advantages
                        </legend>
                        <div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Advantage</TableHead>
                                        <TableHead>Active</TableHead>
                                        <TableHead>Delete</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {
                                        fieldArr.fields.map((field, idx) => <TableRow key={idx}>
                                            <TableCell>
                                                <Input
                                                    value={field.text}
                                                    onChange={(e) => fieldArr.update(idx, { ...field, text: e.target.value })}
                                                    placeholder="Write something ..." />
                                            </TableCell>
                                            <TableCell>
                                                <Checkbox checked={field.active} onCheckedChange={(e) => {

                                                    return fieldArr.update(idx, { ...field, active: e.valueOf() === true });
                                                }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant={'ghost'} size={'icon'} onClick={() => fieldArr.remove(idx)}>
                                                    <Trash className="w-5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>)
                                    }

                                </TableBody>
                            </Table>

                            <div className="w-full flex mt-8">
                                <Button className="h-full w-full" type="button" variant={'outline'} onClick={() => fieldArr.append({ text: "", active: false, })}>Add</Button>
                            </div>
                        </div>

                    </fieldset>
                    <div className="relative w-full md:col-span-2 lg:col-span-1 flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 ">
                        <PricingCard
                            // @ts-ignore
                            offer={{
                                ...pkg,
                                id: "",
                            }}
                            className="w-fit mx-auto"
                            testing={true}
                        />

                    </div>
                </div>
            </form>
        </Form>
    )
}
