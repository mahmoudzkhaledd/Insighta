"use client";
import Cookies from 'js-cookie';
import { authConstants } from '../constants/constants';


export const useSignOutClientAuth = (tokenName?: string) => {

    return (redirectTo: string | null) => {
        Cookies.remove(tokenName ?? authConstants.tokenName);
        if (redirectTo) {
            window.location.href = redirectTo
        }
    };


}