import { DollarSign, Home, LucideIcon } from "lucide-react";

export interface NavbarProps {
    name: string;
    link: string;
};


export const adminNavbarItems: NavbarProps[] = [
    {
        name: "Home",
        link: "/admin",
    },
    {
        name: "Finance",
        link: "/admin/finance",
    },
    {
        name: "Websites",
        link: "/admin/websites",
    },
    {
        name: "Users",
        link: "/admin/users",
    },
    {
        name: "Packages",
        link: "/admin/packages",
    },
    {
        name: "Subscriptions",
        link: "/admin/subscriptions",
    },
    {
        name: "Api Keys",
        link: "/admin/apikeys",
    },
   
];