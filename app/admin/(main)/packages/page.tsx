"use server";
import CustomTable from "@/components/ui/CustomTable";
import { prisma } from "@/lib/db";
import { packagesCols } from "./_components/packagesCols";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const orderByItems = [
  {
    name: "All",
    link: "",
  },
  {
    name: "Name",
    link: "name",
  },
  {
    name: "Price",
    link: "price",
  },
  {
    name: "After Discount",
    link: "afterDiscount",
  },
  {
    name: "Active",
    link: "active",
  },
  {
    name: "Users Count",
    link: "usersCount",
  },
  {
    name: "Max Websites",
    link: "maxWebsites",
  },
  {
    name: "Max Actions",
    link: "maxActions",
  },
  {
    name: "Max Api Keys",
    link: "maxApiKeys",
  },
  {
    name: "Duration",
    link: "duration",
  },
];

interface SearchProps {
  orderBy?: string;
  type?: string;
}
export default async function AdminPackages({ searchParams }: { searchParams: SearchProps }) {

  const filterBy = searchParams.orderBy;
  const packages = await prisma.package.findMany({
    orderBy: (filterBy != null && filterBy != '') ? {
      [filterBy]: searchParams.type == 'desc' ? 'desc' : 'asc',
    } : undefined,
  }).catch(ex => []);

  return (
    <div>
      <div className="flex mb-5 items-center justify-between">
        <h2 className="font-bold text-lg">All Packages</h2>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-full gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel >Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                orderByItems.map((e, idx) => <Link
                  key={idx}
                  href={`?orderBy=${e.link}&type=${searchParams.type == 'desc' ? "asc" : "desc"}`}
                  className="hover:cursor cursor-pointer hover:bg-gray-100"
                >
                  <DropdownMenuItem className='hover:cursor flex gap-2 items-center cursor-pointer hover:bg-gray-100' >
                    {
                      searchParams.orderBy == e.link && (searchParams.type == 'desc' ? <ArrowUp className="w-5" /> : <ArrowDown className="w-5" />)
                    }
                    {e.name}
                  </DropdownMenuItem>
                </Link>)
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href={'/admin/packages/create'}>
            <Button className="h-full gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Package
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <CustomTable pagination columns={packagesCols} data={JSON.parse(JSON.stringify(packages))} />
    </div >
  )
}
