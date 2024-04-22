"use server";
import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
interface SubscripeType {
    error: string;
    seccess?: string;
}
export const renewUserSubscription = async (): Promise<SubscripeType | null> => {

    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            subscription: true,
            wallet: true,
        },
    });
    if (user == null) return redirect('/');
    if (user.subscription?.packageId == null) return {
        error: "Please subscripe in a package first!",
    }

    
    try {
        const total = user.subscription.priceToPay;
        const wallet = user.wallet!;
        if (wallet.balance.toNumber() < total) {
            return {
                error: "You don't have enough balance, please recharge your wallet and try again."
            }
        };
        const updateSub = prisma.subscription.update({
            where: {
                id: user.subscription.id,
            },
            data: {
                renewDate: new Date(),
            },
        });
        const decWallet = prisma.wallet.update({
            where: {
                id: wallet.id,
            },
            data: {
                balance: {
                    increment: - 1 * total,
                },
                totalSpent: {
                    increment: total,
                }
            },
        });
        const createPerch = prisma.purchases.create({
            data: {
                userId: user.id,
                walletId: wallet.id,
                type: "renew",
                packageId: user.subscription?.packageId,
                amount: total,
            },
        });
        const [sub, walet, perch] = await prisma.$transaction([updateSub, decWallet, createPerch]);
        
    } catch (ex) {
        if ((ex as Error).message == 'NEXT_REDIRECT') throw ex;
    }
    return null;
};