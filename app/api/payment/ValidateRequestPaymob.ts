import { createHmac } from "crypto"
export const validateRequestPaymob = (data: any): boolean => {

    const hmac = data.hmac;

    const array = [
        'amount_cents',
        'created_at',
        'currency',
        'error_occured',
        'has_parent_transaction',
        'id',
        'integration_id',
        'is_3d_secure',
        'is_auth',
        'is_capture',
        'is_refunded',
        'is_standalone_payment',
        'is_voided',
        'order',
        'owner',
        'pending',
        'source_data.pan',
        'source_data.sub_type',
        'source_data.type',
        'success',
    ];
    const sortedKeys = Object.keys(data).sort();

    let connString = '';
    for (const key of sortedKeys) {
        if (array.includes(key)) {
            connString += data[key];
        }
    }
    const secret =  process.env.PAYMOB_HMAC_SECRET;
    const hashed = createHmac('sha512', secret ?? "").update(connString).digest('hex');
    return hashed == hmac;
}
