"use server";
import { authX } from "@/authX";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { prisma } from "@/lib/db";
import { CreditCard, HandCoins, ShoppingCart, Wallet, } from "lucide-react";
import Link from "next/link";
import TopBanner from "../_components/TopBanner";
import WalletProvider from "../_components/WalletProvider";
import NotFoundComponent from "@/components/General/NotFoundComponent";

export default async function WalletPage({ children }: { children: React.ReactNode }) {
  const session = await authX();
  if (!session?.user?.id) return;
  const wallet = await prisma.wallet.findUnique({
    where: {
      userId: session.user.id,
    },
    include: {
      transactions: true,
    },
  });
  if (wallet == null) return <NotFoundComponent title="Wallet not found" subTitle="Try contact the customer service.">

  </NotFoundComponent>;

  return (
    <WalletProvider value={JSON.parse(JSON.stringify(wallet))}>

      <div className="grid grid-cols-1  lg:grid-cols-5 gap-4">
        <div className=" col-span-4 space-y-4">
          <TopBanner />

          {children}
        </div>
        <div className="  col-span-1 space-y-4">
          <Card >
            <CardHeader className="flex pb-0 p-4 flex-row gap-3 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className=" text-gray-900 font-semibold dark:text-white">Your balance</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total balance available in your account and you can use it.</p>
                </TooltipContent>
              </Tooltip>
              <div className="rounded-full border w-[33px] h-[33px] flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <h2 className="text-2xl font-bold">${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(wallet.balance.toNumber())}</h2>
            </CardContent>
          </Card>



          <Card >
            <CardHeader className="flex pb-0 p-4 flex-row gap-3 items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className=" text-gray-900 font-semibold dark:text-white">Spent amount</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The total amount of money spent.</p>
                </TooltipContent>
              </Tooltip>
              <div className="rounded-full border w-[33px] h-[33px] flex items-center justify-center">
                <HandCoins className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between gap-2 flex-wrap items-center">
                <h2 className="text-2xl font-bold">${Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(wallet.totalSpent.toNumber())}</h2>

              </div>
            </CardContent>
          </Card>
          <Card >
            <CardHeader className="flex pb-0 p-4 flex-row gap-3 items-center">
              <p className=" text-gray-900 font-semibold dark:text-white">Recharge</p>
              <div className="rounded-full border w-[33px] h-[33px] flex items-center justify-center">

                <CreditCard className="w-4 h-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Link href={'recharge'}>
                <Button className="w-full">
                  Recharge balance
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </WalletProvider>
  )
}
