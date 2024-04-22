"use server"
import { extractAxiosError } from "@/lib/utils";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import { z } from "zod";
import { addPackageSchema } from "@/types/PackageSchema";
import { authXAdmin } from "@/authXAdmin";

export const createPackage = async (data: z.infer<typeof addPackageSchema>): Promise<{ error?: string; }> => {
    const session = await authXAdmin();
    if (!session?.user.id) redirect('/');
    try {
        const parsedData = addPackageSchema.parse(data);
        const pkg = await prisma.package.create({
            data: {
                ...parsedData,
                adminId: session.user.id,
                advantages: {
                    create: parsedData.advantages,
                }
            }
        })
        return {};
    } catch (ex: any) {
        if (ex.message == "NEXT_REDIRECT") throw ex;

        const errMsg = extractAxiosError(ex);
        if (errMsg) {
            return { error: errMsg };
        }
        return {
            error: "Unknown error occured, please contact the customer support",
        }
    }
};