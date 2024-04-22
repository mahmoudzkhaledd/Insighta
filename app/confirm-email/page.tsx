'use server';

import NotFoundComponent from "@/components/General/NotFoundComponent";
import { jwtVerify } from "jose";
import { MailCheck, MailWarning, MailX } from "lucide-react";
import { prisma } from "@/lib/db";
export default async function ConfirmEmailPage({ searchParams }: { searchParams: { token?: string; } }) {
    const token = searchParams.token;
    if (token == null) {
        return (
            <NotFoundComponent
                title="Your email is not verified"
                subTitle="Please check your email"
                icon={MailX}
            />
        )
    }
    try {
        const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.AUTHX_SECRET as string));
        await prisma.user.update({
            where: {
                id: decoded.payload.id as string,
                emailVerified: false,
            },
            data: {
                emailVerified: true,
            },
        });
        return <NotFoundComponent
            title="Your email has been verified"
            subTitle="Back to login page and try to login again."
            icon={MailCheck}
        />
    } catch (ex) {
        return <NotFoundComponent
            title="The link has been expired."
            subTitle="The link has been expired or the user is verified, Please confirm your email again."
            icon={MailWarning}
        />
    }
    return (
        <div>page</div>
    )
}
