'use server'
import { extractAxiosError } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { z } from "zod";
interface EmailProps {
    email: string;
}

export const userSubscribe = async ({ email }: EmailProps): Promise<{ error?: string; }> => {
    if (!z.string().email().safeParse(email).success) {
        return { error: "Please enter a valid email!" };
    }

    try {
        const em = await prisma.notifyEmail.create({
            data: {
                email,
            }
        });
        
    } catch (ex: any) {
        if (ex.code == 'P2002') {
            return { error: "You have already subscribed!" };
        }
        const err = extractAxiosError(ex);
        if (err) {
            return { error: err };
        }
        return { error: "Something went wrong, please try again" };
    }

    return {};
}