import * as z from 'zod';


export const paytabsResponse = z.object({
    tran_ref: z.string(),
    tran_type: z.string(),
    cart_id: z.string(),
    cart_description: z.string(),
    cart_currency: z.string(),
    cart_amount: z.string(),
    tran_total: z.string(),
    return: z.string(),
    redirect_url: z.string(),
    customer_ref: z.string(),
    customer_details: z.object({
        name: z.string().optional().nullable(),
        email: z.string().optional().nullable(),
        phone: z.string().optional().nullable(),
        street1: z.string().optional().nullable(),
        city: z.string().optional().nullable(),
        state: z.string().optional().nullable(),
        country: z.string().optional().nullable(),
        ip: z.string()
    }),
    invoice: z.object({
        id: z.number(),
        shipping_charges: z.string(),
        extra_charges: z.string(),
        extra_discount: z.string(),
        total: z.string(),
        activation_date: z.number(),
        expiry_date: z.number(),
        due_date: z.number(),
        issue_date: z.number(),
        line_items: z.array(z.object({
            sku: z.string(),
            description: z.string(),
            url: z.string().optional().nullable(),
            unit_cost: z.string(),
            quantity: z.string(),
            net_total: z.string(),
            discount_rate: z.string(),
            discount_amount: z.string(),
            tax_rate: z.string(),
            tax_total: z.string(),
            total: z.string(),
        })),
    }),
    serviceId: z.number(),
    profileId: z.number(),
    merchantId: z.number(),
    trace: z.string(),
});

