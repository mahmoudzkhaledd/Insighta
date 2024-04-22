"use server";

import { authX } from "@/authX";
import { customSanatize } from "@/lib/customSantize";
import { amountSchema } from "@/types/ChargeAmountSchema";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { sendPaymentRequestForSubscription } from "@/Services/paytabs/paytabs";
import { PaytabsError } from "@/Services/paytabs/PaytabsErrorType";
import { paytabsResponseCodes } from "@/Services/paytabs/PaytabsResponseCodes";
interface SubscripeType {
    error: string;
    seccess?: string;
}
export const chargeBalance = async (values: z.infer<typeof amountSchema>): Promise<SubscripeType | null> => {

    values = customSanatize(values);
    const validate = amountSchema.safeParse(values);
    if (!validate.success) return {
        error: "Please enter valid data",
    };

    const session = await authX();
    if (!session?.user?.id) return redirect('/');
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            subscription: true,
        },
    });
    if (user == null) return redirect('/');

    try {
        const res = await sendPaymentRequestForSubscription({
            user,
            total: validate.data.amount,
        });
        redirect(res.redirect_url);
    } catch (ex) {
        if ((ex as Error).message == "NEXT_REDIRECT") throw ex;
        if (!(ex instanceof PaytabsError)) return {
            "error": "Unknown error occured, please try again later."
        };
        return {
            error: paytabsResponseCodes[ex.code].message,
        };
    }
};