import { paytabsResponse } from "@/types/PaytabsResponse";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toNumber } from "@/lib/utils";

export async function GET(req: NextRequest, res: NextResponse) {
    const { nextUrl: { search } } = req;
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return NextResponse.json({ params }, { status: 200 });
}
export async function POST(req: NextRequest, res: NextResponse) {
    // TODO: NEEDS VALIDATION
    const body = await req.json();
    const validate = paytabsResponse.safeParse(body);
    if (!validate.success) {
        
        return NextResponse.json({}, { status: 400 });
    }

    const data = validate.data;

    const [trans, upd] = await prisma?.$transaction(async (prsma) => {
        const wallet = await prsma?.wallet.findUnique({
            where: {
                userId: data.customer_ref,
            }
        });
        if(wallet == null){
            throw new Error('Wallet is not created');
        }
        const trans = await prsma?.transaction.create({
            data: {
                type: "deposit",
                tran_ref: data.tran_ref,
                merchant_id: data.merchant_id,
                profile_id: data.profile_id,
                cart_id: data.cart_id,
                cart_description: data.cart_description,
                cart_currency: data.cart_currency,
                cart_amount: data.cart_amount,
                tran_currency: data.tran_currency,
                tran_total: data.tran_total,
                tran_type: data.tran_type,
                tran_class: data.tran_class,
                invoice_id: data.invoice_id,
                customer_ref: data.customer_ref,
                customer_ip: data.customer_details.ip,
                payment_response_status: data.payment_result.response_status,
                payment_response_code: data.payment_result.response_code,
                payment_response_message: data.payment_result.response_message,
                payment_cvv_result: data.payment_result.cvv_result,
                payment_avs_result: data.payment_result.avs_result,
                payment_transaction_time: data.payment_result.transaction_time,
                payment_method: data.payment_info.payment_method,
                payment_card_type: data.payment_info.card_type,
                payment_card_scheme: data.payment_info.card_scheme,
                payment_description: data.payment_info.payment_description,
                payment_expiryMonth: data.payment_info.expiryMonth,
                payment_expiryYear: data.payment_info.expiryYear,
                ipn_trace: data.ipn_trace,
                walletId: wallet.id ,
            },
        });
        let upd;
        if (data.payment_result.response_message == 'Authorised' && data.payment_result.response_status == 'A') {
            upd = await prsma?.wallet.update({
                where: {
                    id: wallet?.id,
                },
                data: {
                    balance: {
                        increment: toNumber(data.cart_amount) ?? 0,
                    },
                }
            })
        }
        return [trans, upd];
    });

    return NextResponse.json({}, { status: 200 });
}
