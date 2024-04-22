"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function signOutAuth(tokenName: string, redirectTo?: string, ) {

    cookies().delete(tokenName );
    if (redirectTo) {
        redirect(redirectTo)
    }
}
