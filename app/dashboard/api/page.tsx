"use server";
import { getUserAPiKeys } from "@/Services/APi/GetUserApi";
import CreateApiKeyDialog from "@/components/Dialogs/CreateApiKeyDialog";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


import moment from "moment";
import DeleteKeyBtn from "./_components/DeleteKeyBtn";
import { Info, Key, Terminal } from "lucide-react";
import CodeSnippet from "@/components/ui/CodeSnippet";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { dashboardConfigs } from "@/constants/dashboard";

export default async function ApiPage() {
  const userApis = await getUserAPiKeys();
  const apiKeys = userApis?.keys ?? [];
  return (
    <div className="w-full h-full">
      <div className=" max-w-[1300px] pt-9 mx-auto">

        <Alert className="mb-[30px]">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="mb-3 gap-2 flex items-center">
            Account id
            <HoverCard>
              <HoverCardTrigger asChild>
                <button>
                  <Info className="w-4" />
                </button>
              </HoverCardTrigger>
              <HoverCardContent className=" font-light">
                {dashboardConfigs.publicKeyDescription}
              </HoverCardContent>
            </HoverCard>

          </AlertTitle>
          <AlertDescription>
            <CodeSnippet text={userApis?._id ?? "Create your first api key."} />
          </AlertDescription>
        </Alert>
        <div className="mb-7 flex items-center justify-between">
          <h2 className=" text-2xl font-bold">
            Api Keys ({apiKeys.length})
          </h2>
          <CreateApiKeyDialog />
        </div>
        <Table className="z-0">
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Total uses</TableHead>
              <TableHead>Permission</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody >
            {
              apiKeys.map((e, idx) => <TableRow key={idx}>
                <TableCell className="font-medium">{e.name}</TableCell>
                <TableCell className="font-medium">{e.apiKey}</TableCell>
                <TableCell className="font-medium">{e.totalUses}</TableCell>
                <TableCell className="font-medium capitalize">{e.access}</TableCell>
                <TableCell className="font-medium">{moment(e.createdAt).format('ll')}</TableCell>
                <TableCell className="font-medium">
                  <CreateApiKeyDialog apiKey={JSON.parse(JSON.stringify({
                    name: e.name,
                    _id: e._id,
                    access: e.access,
                  }))} />
                </TableCell>
                <TableCell className="font-medium">
                  <DeleteKeyBtn id={e._id} />
                </TableCell>
              </TableRow>)
            }
            {apiKeys.length === 0 && (<TableRow>
              <TableCell className="text-center py-8" colSpan={7}>No keys found</TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
