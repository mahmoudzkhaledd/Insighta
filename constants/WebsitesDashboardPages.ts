import { CircleAlert, Gauge, Globe, Home, LayoutDashboard, Package, RefreshCcw, Server, SquareMousePointer, Users, Waypoints, type LucideIcon, } from 'lucide-react';
export interface WebsiteSidebarProps {
    name: string;
    link: string;
    icon?: LucideIcon;
    absLink?: string;
    soon?: boolean,
};

export interface ActionMarketingProps {
    title: string;
    desc: string;
    icon?: LucideIcon;
};
export const websitesSidebarItems: WebsiteSidebarProps[] = [
    {
        name: "Home",
        link: "/",
        icon: Home,
    },

    {
        name: "Actions",
        link: "/actions",
        icon: SquareMousePointer,
    },
    {
        name: "Errors logging",
        link: "/errors",
        icon: CircleAlert,
        soon: true,
    },
    {
        name: "Counter",
        link: "/counters",
        icon: Gauge,
        soon: true,
    },
    {
        name: "Visitor tracking",
        link: "/tracking",
        icon: Waypoints,
        soon: true,
    },

    {
        name: "Main dashboard",
        link: "/dashboard",
        absLink: "/dashboard",
        icon: LayoutDashboard,
    },

];

export const actionsMarketingPagee: ActionMarketingProps[] = [
    {
        title: "Collective Scheduling",
        desc: "Make it easy to book your team when everyone is available.",
        icon: Users
    },
    {
        title: "Collective Scheduling",
        desc: "Make it easy to book your team when everyone is available.",
        icon: Users
    },
    {
        title: "Collective Scheduling",
        desc: "Make it easy to book your team when everyone is available.",
        icon: Users
    },
    {
        title: "Collective Scheduling",
        desc: "Make it easy to book your team when everyone is available.",
        icon: Users
    },
    {
        title: "Collective Scheduling",
        desc: "Make it easy to book your team when everyone is available.",
        icon: Users
    },
]