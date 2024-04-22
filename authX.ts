
import { CreateAuth } from "./authX/AuthX";
import { authConfig } from "./authX.config";


export const {
    authX,
    signIn,
    signOut,
    useSignOutClient,
    adminSignIn,
} = CreateAuth(authConfig)