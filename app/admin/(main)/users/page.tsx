
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import UsersPageHeader from "./_components/UsersPageHeader"
import { ArrowDown, ArrowUp, File, ListFilter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/db"
import CustomTable from "@/components/ui/CustomTable"
import { usersCols } from "./_components/UsersCols"
import { toInt } from "@/lib/utils"
import Link from "next/link"
import CustomPagination from "@/components/General/CustomPagination"

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
    name: "Email",
    link: "email",
  },
  {
    name: "Phone",
    link: "phone",
  },
  {
    name: "Email Verified",
    link: "emailVerified",
  },
  {
    name: "Registration date",
    link: "createdAt",
  },
];

export default async function AdminUsersPage({ searchParams }: { searchParams: { search?: string; page: string; orderBy?: string; type: string; } }) {
  const orderBy = searchParams.orderBy;
  const filter: any = (searchParams.search != null && searchParams.search != '') ? {
    OR: [
      {
        id: searchParams.search,
      },
      {
        name: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      },
      {
        email: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      },
      {
        phone: {
          contains: searchParams.search,
          mode: 'insensitive',
        },
      },
    ]
  } : undefined;
  const users = await prisma.user.findMany({
    where: filter,
    orderBy: (orderBy != null && orderBy != '') ? {
      [orderBy]: searchParams.type == 'desc' ? 'desc' : 'asc',
    } : undefined,
    skip: (toInt(searchParams.page) ?? 0) * 20,
    take: 20,
  });
  const count = await prisma.user.count({ where: filter, });
  const analysis = await prisma.usersAnalysis.findFirst({
    where: {
      id: 1,
    },
  });

  return (
    <main className=" flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {
          analysis != null && <UsersPageHeader
            thisWeek={analysis.thisWeekUsers}
            lastWeek={analysis.lastWeekUsers}
            thisMonth={analysis.thisMonthUsers}
            lastMonth={analysis.lastMonthUsers}
            totlUsers={analysis.totalUsers}
          />
        }
        <div className="flex items-center">

          <div className="justify-between w-full flex items-center gap-2">
            <form className="flex items-center gap-2">
              <Input defaultValue={searchParams.search} name='search' placeholder="Search ..." />
              <Button type='submit' size={'icon'} variant={'outline'}><Search className="w-5" /></Button>
            </form>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
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
                    className="hover:cursor cursor-pointer  hover:bg-gray-100"
                  >
                    <DropdownMenuItem className='hover:cursor cursor-pointer hover:bg-gray-100' >
                      {
                        searchParams.orderBy == e.link && (searchParams.type == 'desc' ? <ArrowUp className="w-5" /> : <ArrowDown className="w-5" />)
                      }
                      {e.name}
                    </DropdownMenuItem>
                  </Link>)
                }
              </DropdownMenuContent>
            </DropdownMenu>

          </div>
        </div>
        <CustomTable columns={usersCols} data={JSON.parse(JSON.stringify(users))} />
        <CustomPagination
          current={toInt(searchParams.page) ?? 0}
          count={Math.ceil(count / 20)}
        />
      </div>


    </main>
  )
}
