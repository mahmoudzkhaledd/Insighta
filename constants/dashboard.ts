import { Globe, Home, Package, RefreshCcw, Server, SquareMousePointer, User, Wallet, type LucideIcon, } from 'lucide-react';

export interface NavbarProps {
    name: string;
    link: string;
    icon?: LucideIcon,
};


export const dashboardConfigs = {
    publicKeyDescription:
        "Pair your chosen private key with this id in every request you make.",
    websiteIdDesc:
        "Pair your chosen private key with this id in every request you make.",
    pageInvitationUrl:
        "Pair your chosen private key with this id in every request you make.",
    frameworks: [
        {
            name: "Next.js",
            image: "/images/nextjs.svg",
        },
        {
            name: "React",
            image: "/images/react.svg",
        },
        {
            name: "JavaScript",
            image: "/images/javascript.svg",
        },
    ],
}


export const navbarItems: NavbarProps[] = [
    {
        name: "Home",
        link: "/dashboard",
        icon: Home,
    },
    {
        name: "Websites",
        link: "/dashboard/websites",
        icon: Globe,
    },

    {
        name: "API",
        link: "/dashboard/api",
        icon: Server,
    },
    {
        name: "Pricing",
        link: "/pricing",
        icon: Package,
    },
    {
        name: "Subscription",
        link: "/dashboard/subscription",
        icon: RefreshCcw,
    },
    {
        name: "Wallet",
        link: "/dashboard/wallet",
        icon: Wallet,
    },
    {
        name: "Account settings",
        link: "/dashboard/settings",
        icon: User,
    },

];