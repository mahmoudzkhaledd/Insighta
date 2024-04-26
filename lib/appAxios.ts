import axios from 'axios';
import crypto from 'crypto';
axios.defaults.baseURL = process.env.NODE_URL;

axios.interceptors.request.use(req => {
    req.headers.set("Cache-Control", "max-age=60");
    const key: string = process.env.API_SECRET ?? "";
    const nodePublicKey: string = process.env.NODE_PUBLIC_KEY ?? "";
    const hashed = crypto.publicEncrypt(nodePublicKey, Buffer.from(key)).toString('base64');

    req.headers.set("api-secret", hashed);
    return req;
})

export const appAxios = axios;