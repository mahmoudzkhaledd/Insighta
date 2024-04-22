"use server"

import { redirect } from "next/navigation";

import { authXAdmin } from "@/authXAdmin";
import { prisma } from "@/lib/db";
import { adminSignIn } from "@/authX";
export const enterUserAccount = async (userId: string): Promise<{ error?: string; }> => {
    const session = await authXAdmin();
    if (!session?.user.id) redirect('/');
    const user = await prisma.user.findFirst({ where: { id: userId } });
    if (user == null) {
        return { error: "User not found!" };
    }
    const res = await adminSignIn(user, {}, null, "admin");
    
    return {};
};