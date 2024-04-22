
import { TokenPayload } from "./types";

export default interface AuthXConfigs {
    authorize: (credentials: object) => object | null;
    callbacks?: Array<(payload: TokenPayload) => Promise<TokenPayload | null>>;
    redirectAfterAuth?: string;
    tokenExpiration?: string;
    tokenName?: string;

}
