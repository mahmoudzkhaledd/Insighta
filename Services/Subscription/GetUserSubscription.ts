"use server";
import { SubscriptionState } from "@prisma/client";
import { prisma } from "@/lib/db";
export const getUserSubscription = async ({ userId, includePackage, state, }: { userId: string; includePackage?: boolean, state: SubscriptionState | null }) => {
    const subscription = await prisma.subscription.findUnique({
        where: state ? {
            userId: userId,
            state,
        } : { userId: userId, },
        include: {
            package: includePackage == true,
        },
    });
    let diffDays: number | null = null;
    if (subscription?.renewDate) {
        const timeDiff = (Date.now() - subscription.renewDate.getTime());
        diffDays = subscription.duration_days - Math.floor(timeDiff / (1000 * 3600 * 24));
        diffDays = diffDays < 0 ? 0 : diffDays;
    }
    
    return {
        subscription: subscription,
        daysToExpire: diffDays,
        expired: (diffDays == 0 || subscription?.renewDate == null || subscription.state != 'accepted') ? "Your subscription has expired. Please renew it to continue accessing this service." : null,
    };
}
