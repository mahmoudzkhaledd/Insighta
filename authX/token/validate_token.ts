"use server";
import { jwtVerify } from 'jose';
import { TokenPayload, tokenSchema, } from '../types/types';



export const validateToken = async (token: string): Promise<TokenPayload | null> => {
    
    try {
        const decoded = await jwtVerify(token, new TextEncoder().encode(process.env.AUTHX_SECRET as string));
        const data: any = decoded.payload;

        const model = tokenSchema.safeParse({
            user: {
                id: data?.id.toString() as string,
                image: (data?.image || "") as string,
                name: (data?.name || "") as string,
                email: (data?.email || "") as string,
                type: data.type,
            },
            expiresAt: data.exp,
        });
        if (!model.success) return null;


        return model.data;
    } catch (ex) {
        return null;
    }
}