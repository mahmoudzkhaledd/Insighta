'use client'
import CustomTable from '@/components/ui/CustomTable';
import { transactionsColumns } from '../../_components/TransColumns'
import { useWallet } from '../../_components/WalletProvider'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

export default function TransactionPage() {
    const wallet = useWallet();
    return (
        <div>
            <div className="flex items-center gap-3  mb-4">
                <h2 className=" font-bold text-xl">Transactions history</h2>
                <Link href={'purchases'}>
                    <Button size={'sm'} className="w-full flex items-center gap-2 lg:w-fit" variant={'success'}>
                        <ShoppingCart className="w-5 h-5" />
                        Purchases
                    </Button>
                </Link>
            </div>
            <CustomTable columns={transactionsColumns} data={JSON.parse(JSON.stringify(wallet.transactions))} />
        </div>
    )
}
