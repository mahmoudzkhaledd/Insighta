
import { CreateAuth } from "./authX/AuthX";
import { authConfig } from "./authXAdmin.config";


export const {
    authX: authXAdmin,
    signIn: signInAdmin,
    signOut: signOutAdmin,
    useSignOutClient: useSignOutClientAdmin,
} = CreateAuth(authConfig)