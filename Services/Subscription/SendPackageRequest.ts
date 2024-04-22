"use server";
import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { prisma } from "@/lib/db";

import { redirect } from "next/navigation";
import { getUserWebsites } from "../websites/GetUserWebsites";
import { getUserAPiKeys } from "../APi/GetUserApi";
interface SubscripeType {
    error: string;
    seccess?: string;
}
export const subscripeInPackage = async (packageId: string): Promise<SubscripeType | null> => {
    packageId = customSanatize(packageId);
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
    if (user.subscription != null) {
        return {
            error: "You're currently subscribed on a package!",
        };
    }
    const pkg = await prisma.package.findUnique({
        where: {
            id: packageId,
        },
    });
    if (!pkg) {
        return {
            error: "Package not found!",
        };
    }
    try {
        const total = pkg.afterDiscount ?? pkg.price;
        const wallet = user.wallet!;
        if (wallet.balance.toNumber() < total) {
            return {
                error: "You don't have enough balance, please recharge your wallet and try again."
            }
        };
        const websitesNumber = (await getUserWebsites())?.length ?? 0;
        const apiKeysNumber = (await getUserAPiKeys())?.keys.length ?? 0;
        const [sub, update, walet, perch] = await prisma.$transaction(async (prsma) => {

            const createSub = await prsma.subscription.create({
                data: {
                    userId: session.user.id,
                    packageId: pkg.id,
                    priceToPay: pkg.afterDiscount ?? pkg.price,
                    currentWebsites: websitesNumber,
                    renewDate: new Date(),
                    state: 'accepted',
                    currentApiKeys: apiKeysNumber,
                    duration_days: pkg.duration == 'monthly' ? 30 : 365,
                },
            });

            const updatePackage = await prsma.package.update({
                where: {
                    id: pkg.id,
                },
                data: {
                    usersCount: {
                        increment: 1,
                    },
                },
            });
            const decWallet = await prsma.wallet.update({
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
            const createPerch = await prsma.purchases.create({
                data: {
                    userId: user.id,
                    walletId: wallet.id,
                    type: "subscribe",
                    packageId: pkg.id,
                    amount: total,
                },
            });
            return [createSub, updatePackage, decWallet, createPerch];
        });
        redirect('/dashboard/subscription');
    } catch (ex) {
        if ((ex as Error).message == 'NEXT_REDIRECT') throw ex;
    }
    return null;
};