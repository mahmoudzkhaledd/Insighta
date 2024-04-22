"use server";
import { getUserSubscription } from "./GetUserSubscription";
export const checkForUserSub = async (userId: string) => {
    const { subscription, expired } = await getUserSubscription({
        userId,
        includePackage: true,
        state: null,
    });

    if (subscription == null) {
        throw new Error("Please subscribe in a package");
    }
    if (expired) { 
        throw new Error("Your subscription has expired, please renew your subscription.");
    }
    return subscription;
}
