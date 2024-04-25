'use server';
import { prisma } from '@/lib/db';
import { z } from "zod";
import { registerSchema } from "@/types/registerSchema";
import { redirect } from 'next/navigation';
import { nanoid } from 'nanoid'
import bcrypt from 'bcryptjs';
import { customSanatize } from '@/lib/customSantize';
import { sendVerificationEmail } from '@/Services/Emails/SendVerificationEmail';
import { SignJWT } from 'jose';
import { siteConfig } from '@/constants/site';
import { getLastFriday } from '@/lib/utils';
import { authXAdmin } from '@/authXAdmin';

export const register = async (values: z.infer<typeof registerSchema>, redirectTo?: string) => {
    const session = await authXAdmin();
    const model = registerSchema.safeParse(values);
    if (!model.success) return {
        error: "Please enter data correctly"
    };
    try {
        values = customSanatize(values);
        const tempUser = await prisma?.user.findFirst({
            where: {
                email: model.data.email,
            },
        });
        if (tempUser != null) return {
            error: "This email is already taken",
        }
        const {
            email,
            password,
            name,
            phone
        } = model.data;
        const hashedPass = await bcrypt.hash(password, 10);

        const res = await prisma.$transaction(async (prsma) => {
            const user = await prsma.user.create({
                data: {
                    email,
                    password: hashedPass,
                    name,
                    emailVerified: true,
                    phone: phone,
                    wallet: {
                        create: {}
                    }
                },
            });
            const analysis = await prisma.usersAnalysis.findFirst();
            if (analysis) {
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1;
                const lastFriday = getLastFriday(new Date()).getDate() + 1;
                await prsma.usersAnalysis.update({
                    where: {
                        id: analysis.id,
                    },
                    data: {
                        totalUsers: {
                            increment: 1,
                        },
                        lastUpdateMonth: currentMonth,
                        lastUpdateWeek: lastFriday,
                        ...(
                            analysis.lastUpdateMonth != currentMonth ?
                                { thisMonthUsers: 0, lastMonthUsers: analysis.thisMonthUsers } : { thisMonthUsers: { increment: 1 } }
                        ),
                        ...(
                            analysis.lastUpdateWeek != lastFriday ?
                                { thisWeekUsers: 0, lastWeekUsers: analysis.thisWeekUsers } : { thisWeekUsers: { increment: 1 } }
                        ),
                    },
                })
            }


            // const token = await new SignJWT({ id: user.id })
            //     .setProtectedHeader({ alg: 'HS256' })
            //     .setJti(nanoid())
            //     .setIssuedAt()
            //     .setExpirationTime(siteConfig.magicLinkExpiration)
            //     .sign(new TextEncoder().encode(process.env.AUTHX_SECRET));
            // if (session?.user.type != 'admin') {
            //     const sentEmail = await sendVerificationEmail(user.email, user.name, process.env.NODE_ENV == 'development' ? `http://localhost:3000/confirm-email?token=${token}` : `${process.env.URL}/confirm-email?token=${token}`);
            //     if (sentEmail.accepted.length == 0 && sentEmail.rejected.length > 0) {
            //         throw new Error(sentEmail.rejected[0].toString());
            //     }
            // }

        });

    } catch (ex: any) {
        return {
            error: ex.message,
        }
    }
    redirect(redirectTo ?? '?emailSent=true');
}

