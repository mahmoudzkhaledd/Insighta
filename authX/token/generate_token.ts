"use server";
import { SignJWT } from 'jose';
import { TokenPayload } from '../types/types';
import { nanoid } from 'nanoid'
export const generateToken = async (payload: TokenPayload) => {
    const token = await new SignJWT(payload.user) 
        .setProtectedHeader({ alg: 'HS256' }) 
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime(payload.expiresAt)
        .sign(new TextEncoder().encode(process.env.AUTHX_SECRET));

    return token;
}