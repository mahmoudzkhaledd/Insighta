"use server"

import { redirect } from "next/navigation";

import { authXAdmin } from "@/authXAdmin";
import { prisma } from "@/lib/db";
import { UserSchema, userSchema } from "@/types/UserSchema";
import { extractAxiosError } from "@/lib/utils";
export const editUserAccount = async (values: UserSchema): Promise<{ error?: string; }> => {
    const session = await authXAdmin();
    if (!session?.user.id) redirect('/');
    try {
        const data = userSchema.parse(values);
        const user = await prisma.user.update({ where: { id: data.id }, data: data, });
        if (user == null) {
            return { error: "User not found!" };
        }

    } catch (error: any) {
        const err = extractAxiosError(error);
        return {
            error: err ?? "Unknown error occured, please check the logs.",
        }
    }


    return {};
};