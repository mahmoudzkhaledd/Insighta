"use server"

import { redirect } from "next/navigation";

import { authXAdmin } from "@/authXAdmin";
import { prisma } from "@/lib/db";
import { extractAxiosError } from "@/lib/utils";
import { amountSchema } from "@/types/ChargeAmountSchema";
import { z } from "zod";
import { randomUUID } from "crypto";
export const addBalanceToUserAccount = async (values: z.infer<typeof amountSchema>, userId: string): Promise<{ error?: string; }> => {
    const session = await authXAdmin();
    if (!session?.user.id) redirect('/');
    try {
        const data = amountSchema.parse(values);
        const res = await prisma.$transaction(async (prsma) => {
            const updated = await prsma.wallet.update({
                where: {
                    userId: userId,
                },
                data: {
                    balance: {
                        increment: data.amount,
                    },
                },
            });
            const created = await prsma.transaction.create({
                data: {
                    tran_ref: randomUUID(),
                    merchant_id: 0,
                    profile_id: 0,
                    cart_id: '',
                    
                    cart_description: '',
                    cart_currency: '',
                    cart_amount: '',
                    tran_currency: 'USD',
                    tran_total: `${data.amount.toFixed(2)}`,
                    tran_type: '',
                    tran_class: '',
                    invoice_id: 0,
                    type: 'deposit',
                    customer_ip: '',
                    payment_response_status: 'A',
                    payment_response_code: '',
                    payment_response_message: 'Succeeded',
                    payment_cvv_result: '',
                    payment_avs_result: '',
                    payment_transaction_time: new Date(),
                    payment_method: 'By Admin',
                    payment_card_type: '',
                    payment_card_scheme: '',
                    payment_description: '',
                    payment_expiryMonth: 0,
                    payment_expiryYear: 0,
                    ipn_trace: '',
                    wallet: {
                        connect: { id: updated.id },
                    },
                    user: {
                        connect: { id: userId },
                    },
                },

            })
        });

    } catch (error: any) {
        const err = extractAxiosError(error);
        return {
            error: err ?? "Unknown error occured, please check the logs.",
        }
    }


    return {};
};