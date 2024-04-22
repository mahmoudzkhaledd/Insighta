import * as z from 'zod';
const CustomerDetailsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    street1: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    ip: z.string(),
});

const PaymentResultSchema = z.object({
    response_status: z.string(),
    response_code: z.string(),
    response_message: z.string(),
    cvv_result: z.string(),
    avs_result: z.string(),
    transaction_time: z.string(),
});

const PaymentInfoSchema = z.object({
    payment_method: z.string(),
    card_type: z.string(),
    card_scheme: z.string(),
    payment_description: z.string(),
    expiryMonth: z.number(),
    expiryYear: z.number(),
});

export const paytabsResponse = z.object({
    tran_ref: z.string(),
    merchant_id: z.number(),
    profile_id: z.number(),
    cart_id: z.string(),
    cart_description: z.string(),
    cart_currency: z.string(),
    cart_amount: z.string(),
    tran_currency: z.string(),
    tran_total: z.string(),
    tran_type: z.string(),
    tran_class: z.string(),
    invoice_id: z.number(),
    customer_ref: z.string(),
    customer_details: CustomerDetailsSchema,
    payment_result: PaymentResultSchema,
    payment_info: PaymentInfoSchema,
    ipn_trace: z.string(),
});