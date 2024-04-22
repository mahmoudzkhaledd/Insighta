"use client"
import { Button } from "@/components/ui/button";
import { DialogContent, Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Edit, Plus } from 'lucide-react';
import { Input } from '../ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApiKeySchema, editApiKeySchema } from "@/types/ApiKeySchema";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { createApiKey } from "@/Services/APi/CreateApiKey";
import toast from "react-hot-toast";
import { editApiKey } from "@/Services/APi/EditApiKey";
import { useConfigs } from "../Providers/WebConfigsProvider";

export default function CreateApiKeyDialog({ apiKey }: { apiKey?: z.infer<typeof editApiKeySchema> }) {
  const [loading, startTrans] = useTransition();
  const configs = useConfigs();
  const form = useForm<z.infer<typeof createApiKeySchema>>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: {
      name: apiKey?.name ?? "",
      access: apiKey?.access ?? configs.apiKeyAccess[0],
    },
  });
  const handelCreateApiKey = (data: any) => {
    startTrans(async () => {
      data._id = apiKey?._id;
      const res = apiKey == null ? await createApiKey(data) : await editApiKey(data);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      window.location.reload();
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1" size={apiKey == null ? 'sm' : "icon"}>
          {
            apiKey == null ? <>
              <Plus className="w-4" />
              Create Api Key
            </> : <Edit className="w-4" />
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {
              apiKey == null ? "Create Api key" : "Edit Api Key"
            }
          </DialogTitle>
          <DialogDescription>
            {
              apiKey == null ? " Remember to keep it secure and only share it with trusted parties. Ensure proper configuration and permissions to maintain the security of your applications and services."
                :
                "Any changes made could impact the functionality of connected services or applications. Ensure accuracy and validate changes before finalizing."
            }
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Form {...form}>
            <form className="w-full space-y-7" onSubmit={form.handleSubmit(handelCreateApiKey)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className="">
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
                name='access'
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel> Access </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full capitalize">
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            configs.apiKeyAccess.map((e, idx) =>
                              <SelectItem className=" capitalize" key={idx} value={e}>{e}</SelectItem>
                            )
                          }
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                <Button type="submit" loading={loading} disabled={loading} className="w-full md:ml-auto">Create key</Button>
              </div>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
