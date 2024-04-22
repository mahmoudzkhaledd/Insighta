"use client"
import { Prisma, Transaction, Wallet } from '@prisma/client'

import React, { createContext, useContext } from 'react';
type walletType = Wallet & { transactions: Transaction[] };
const walletContext = createContext<walletType>({
    id: "string;",
    balance: new Prisma.Decimal(0),
    totalSpent: new Prisma.Decimal(0),
    userId: "string;",
    createdAt: new Date(),
    updatedAt: new Date(),
    transactions: [],
});
export const useWallet = () => {
    const wallet = useContext(walletContext);
    return wallet;
}
export default function WalletProvider({ value, children }: { value: walletType, children: React.ReactNode }) {
    return (
        <walletContext.Provider value={value}>{children}</walletContext.Provider>
    )
}
