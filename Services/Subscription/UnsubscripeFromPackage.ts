"use server";
import { authX } from "@/authX";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
interface SubscripeType {
    error: string;
    seccess?: string;
}
export const unsubscripeFromPackage = async (): Promise<SubscripeType | null> => {
    try {
        const session = await authX();
        if (!session?.user.id) redirect('/');

        const [delSub, decPackage] = await prisma.$transaction(async (prsma) => {
            const deleteSub = await prsma.subscription.delete({
                where: {
                    userId: session.user.id
                },
            });
            if (deleteSub == null) {
                throw new Error("This user is not subscribe in a package!");
            }
            const decPackageUsers = await prsma.package.update({
                where: {
                    id: deleteSub.packageId,
                },
                data: {
                    usersCount: {
                        increment: -1,
                    },
                },
            });
            return [deleteSub, decPackageUsers];
        });
    } catch (ex) {
        return {
            error: (ex as Error).message,
        };
    }
    redirect('/pricing');
};