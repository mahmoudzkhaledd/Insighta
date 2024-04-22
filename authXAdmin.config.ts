import AuthXConfigs from "@/authX/types/AuthXConfigs";
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';
import { CredentialsError } from "./authX/types/CredentialsError";
import { DEFAULT_REDIRECT } from "./routes";
import { adminLoginSchema } from "./types/adminLoginSchema";

export const authConfig: AuthXConfigs = {
    redirectAfterAuth: '/admin',
    tokenExpiration: "5d",
    tokenName: "adminAuth",

    authorize: async (credentials: object) => {
        const model = adminLoginSchema.safeParse(credentials);
        if (!model.success) throw new CredentialsError("Please enter the data correctly!")
        try {
            const tempUser = await prisma?.admin.findUnique({
                where: {
                    username: model.data.username,
                },
            });
            if (tempUser?.password == null) throw new CredentialsError("Please check your username or password!")
            const match = await bcrypt.compare(model.data.password, tempUser.password);
            if (!match) throw new CredentialsError("Please check your username or password!");
            return tempUser;
        } catch (ex) {
            throw new CredentialsError((ex as Error)?.message || "");
        }
    },
}