import { FileClock, GanttChart, Globe, LucideIcon, ShieldCheck, Vote } from "lucide-react";

interface ActionPageSidebarProps {
    title: string;
    subTitle?: string;
    icon: LucideIcon;
    link: String;
};

export const actionPageSidebarItems: ActionPageSidebarProps[] = [
    {
        title: "Overview",

        link: "/overview",
        icon: GanttChart,
    },
    {
        title: "All actions",
        subTitle: "All website actions",
        link: "/",
        icon: Vote,
    },
    {
        title: "History logs",
        subTitle: "Watch all actions logs",
        link: "/logs",
        icon: FileClock,
    },
   

];