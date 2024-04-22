"use server"
import axios, { AxiosError } from 'axios';

import { toNumber } from '@/lib/utils';
import * as z from 'zod';
import { paytabsResponse } from './paytabsResponseSchema';
import { Package, User } from '@prisma/client';
import { PaytabsError } from './PaytabsErrorType';
import { randomUUID } from 'crypto';

axios.defaults.baseURL = "https://secure-egypt.paytabs.com/";

axios.interceptors.request.use(request => {
    request.headers.set('authorization', process.env.PAYTABS_SERVER_KEY);

    return request;
}, error => {
    return Promise.reject(error);
});


export const sendPaymentRequestForSubscription = async ({ user, total, }: {
    user: User,
    total: number,
}): Promise<z.infer<typeof paytabsResponse>> => {
    try {
        const payload = {
            profile_id: toNumber(process.env.PAYTABS_PROFILE_ID),
            tran_type: "sale",
            tran_class: "ecom",
            cart_id: randomUUID(),
            cart_currency: "EGP",
            cart_amount: total,
            cart_description: `Charge $${total}`,
            customer_details: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                street1: "address street",
                city: "dubai",
                state: "du",
                country: "AE",
                zip: "12345"
            },
            hide_shipping: true,
            callback: `${process.env.URL}/api/payment`,
            return: `${process.env.URL}/dashboard/wallet`,
            customer_ref: user.id,
            invoice: {
                shipping_charges: 0,
                extra_charges: 0,
                extra_discount: 0,
                total: total,
                line_items: [
                    {
                        sku: "sku",
                        description: `Charge $${total} `,
                        url: "",
                        unit_cost: total,
                        quantity: 1,
                        net_total: total,
                        discount_rate: 0,
                        discount_amount: 0,
                        tax_rate: 0,
                        tax_total: 0,
                        total: total
                    }
                ]
            }
        };
        const fet = await axios.post('payment/request', payload);
        const validate = await paytabsResponse.safeParseAsync(fet.data);

        if (!validate.success) { throw new PaytabsError(0) }
        const res = validate.data;
        return res;
    } catch (ex) {
        if (ex instanceof AxiosError && ex?.response?.data?.code != null) {
            throw new PaytabsError(ex?.response?.data?.code);
        }
        throw ex;
    }
};
