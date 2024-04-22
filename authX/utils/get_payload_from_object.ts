import { AccountType } from "@/types/AccountTypes";
import { TokenPayload } from "../types/types";

export const getPayloadFromObject = (obj: any, expiresAt: string, accountType: AccountType): TokenPayload => {
    const user = {
        id: obj?.id.toString() as string,
        image: (obj?.image || "") as string,
        name: (obj?.name || "") as string,
        email: (obj?.email || "") as string,
        type: accountType,
    };
    return {
        user: user,
        expiresAt: expiresAt,
    };
};