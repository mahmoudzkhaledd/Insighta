'use server';

import { z } from "zod";
import { CredentialsError } from "@/authX/types/CredentialsError";
import { customSanatize } from "@/lib/customSantize";
import { adminLoginSchema } from "@/types/adminLoginSchema";
import { signInAdmin } from "@/authXAdmin";

export const loginAdmin = async (values: z.infer<typeof adminLoginSchema>) => {
    try {
        values = customSanatize(values);
        await signInAdmin(values, "/admin", 'admin');
    } catch (ex) {
        if (ex instanceof CredentialsError) {
            return {
                error: ex.message,
            };
        }
        if ((ex as Error).message == 'NEXT_REDIRECT') {
            throw ex;
        }
    }
    return {
        error: "Please check your email or password!",
    };
}