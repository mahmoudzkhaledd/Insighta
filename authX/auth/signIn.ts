"use server";
import { authConstants } from '../constants/constants';
import { cookies } from "next/headers";
import { generateToken } from "../token";
import { CredentialsError } from "../types/CredentialsError";

import { getPayloadFromObject } from "../utils/get_payload_from_object";
import { redirect } from 'next/navigation';
import { AccountType } from '@/types/AccountTypes';

export const signInAuth = async ({ userPayload, credentials, redirectTo, authorize, tokenName, accountType, tokenExpiration }:
    {
        userPayload?: any,
        credentials: object, redirectTo: string | null,
        authorize: (credentials: object) => object | null,
        tokenName?: string,
        accountType: AccountType,
        tokenExpiration?: string;
    }) => {
    let res = userPayload ?? null;
    if (res == null) {
        try {
            res = await authorize(credentials);
        } catch (ex) {
            if (ex instanceof Error) {
                throw new CredentialsError(ex.message);
            } else {
                throw new CredentialsError("")
            }
        }
        if (!res) throw new CredentialsError("");
    }


    const payload = getPayloadFromObject(res, tokenExpiration ?? '365d', accountType);

    const token = await generateToken(payload);
    const cookieStore = cookies();

    cookieStore.set({
        name: tokenName ?? authConstants.tokenName,
        path: "/",
        value: token,
        httpOnly: true,
    });

    if (redirectTo) {
        redirect(redirectTo);
    }
}