"use client";

import { UserSchema } from "@/types/UserSchema";
import { createContext, useContext } from "react";

const ctx = createContext<UserSchema>({
    id: 'default_id',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'default_password',
    phone: '123-456-7890',
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
});
export const useUser = () => {
    return useContext(ctx);
};
export default function UserProvider({ children, user }: { children: React.ReactNode; user: UserSchema; }) {
    return (
        <ctx.Provider value={user}>{children}</ctx.Provider>
    )
}
