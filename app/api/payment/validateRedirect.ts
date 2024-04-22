import { HmacSHA256, enc } from 'crypto-js';
import { createHmac } from 'crypto';
export const validateRequestPaytabs = (requestBody: any): boolean => {
    const serverKey: string = process.env.PAYTABS_SERVER_KEY ?? "";
    const requestSignature = requestBody.signature;
    delete requestBody.signature;

    // Ignore empty values fields
    Object.keys(requestBody).forEach(key => requestBody[key] === undefined && delete requestBody[key]);

    // Sort form fields 
    const sortedFields = Object.keys(requestBody).sort();

    // Generate URL-encoded query string of Post fields except signature field.
    const query = sortedFields.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(requestBody[key])}`).join('&');

    const signature = HmacSHA256(query, serverKey).toString(enc.Hex);

    return (signature === requestSignature);

   
}
