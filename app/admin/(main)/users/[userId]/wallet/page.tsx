import React from 'react'
import AddBalanceToUserModal from '../_components/AddBalanceToUserModal'
import { prisma } from '@/lib/db'
import NotFoundComponent from '@/components/General/NotFoundComponent';
import { Wallet } from 'lucide-react';

function CardInfo({ title, subTitle, data, }: { title: string; subTitle: string; data: string; }) {
  return <div className="flex flex-row mb-5 items-center justify-between rounded-lg border p-4">
    <div className="space-y-0.5">
      <p className="text-base font-bold">
        {title}
      </p>
      <p className=" text-sm text-gray-500">
        {subTitle}
      </p>
    </div>
    <div>
      {data}
    </div>
  </div>;
}
export default async function UserWalletPage({ params }: { params: { userId: string; } }) {
  const wallet = await prisma.wallet.findFirst({
    where: {
      userId: params.userId ?? "",
    }
  });
  if (wallet == null) {
    return <NotFoundComponent
      title='Wallet not found'
      subTitle='Try make wallet for user'
      icon={Wallet}
    />
  }
  return (
    <div className=' space-y-4'>
      <div className="flex flex-row mb-5 items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <p className="text-base font-bold">
            Add Balance To User Account
          </p>
          <p className=" text-sm text-gray-500">
            Add Balance To User Account
          </p>
        </div>
        <AddBalanceToUserModal />
      </div>
      <CardInfo
        title='Wallet Id'
        subTitle=''
        data={`${wallet.id}`}
      />
      <CardInfo
        title='Balance'
        subTitle='The current balance in the user account'
        data={`$${wallet.balance.toFixed(2)}`}
      />
      <CardInfo
        title='Spent'
        subTitle='The total amount spent by the user'
        data={`$${wallet.totalSpent.toFixed(2)}`}
      />

    </div>
  )
}
