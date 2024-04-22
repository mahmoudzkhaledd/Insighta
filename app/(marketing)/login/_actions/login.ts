'use server';

import { z } from "zod";
import { loginSchema } from '@/types/loginSchema';
import { signIn } from "@/authX";
import { CredentialsError } from "@/authX/types/CredentialsError";
import { customSanatize } from "@/lib/customSantize";

export const login = async (values: z.infer<typeof loginSchema>) => {
    try {
        values = customSanatize(values);
        await signIn(values, "/", 'user');
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