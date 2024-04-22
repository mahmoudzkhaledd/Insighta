"use server";
import { cookies } from "next/headers";
import { authConstants } from "../constants/constants";
import { TokenPayload } from "../types/types";
import { validateToken } from "../token";

export const authXAuth = async (tokenName?: string): Promise<TokenPayload | null> => {
    const token = cookies().get(tokenName ?? authConstants.tokenName);

    if (!token?.value) {
        return null;
    }
    const decoded = await validateToken(token.value);
   
    return decoded;
}