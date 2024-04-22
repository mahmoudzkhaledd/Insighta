import { prisma } from "@/lib/db";
import { authX } from "@/authX";
import { redirect } from "next/navigation";
import CustomTable from "@/components/ui/CustomTable";
import { purchesesColumns } from "../../_components/PurchesesColumns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, ShoppingCart } from "lucide-react";



export default async function page() {
  const session = await authX();
  if (!session?.user?.id) redirect('/');
  const purch = await prisma.purchases.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <div>
      <div className="flex items-center gap-3  mb-4">
        <h2 className=" font-bold text-xl">Purchases history</h2>
        <Link href={'transactions'}>
          <Button size={'sm'} className="w-full flex items-center gap-2 lg:w-fit" variant={'success'}>
            <ArrowLeftRight  className="w-5 h-5" />
            Transactions
          </Button>
        </Link>
      </div>
      <CustomTable columns={purchesesColumns} data={JSON.parse(JSON.stringify(purch))} />
    </div>
  )
}
