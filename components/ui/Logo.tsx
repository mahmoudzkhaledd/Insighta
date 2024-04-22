import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Logo({ to, newPage, className, isLink }: { isLink?: boolean; to?: string, newPage?: boolean, className?: string; }) {
    if (isLink == false) {
        return <p className={cn("font-bold text-xl", className)}>ANALYTIX</p>
    }
    return (
        <Link
            href={to || "/"}
            className={cn("font-bold text-xl", className)}
            target={newPage ? "_blank" : "_self"}
        >
            {siteConfig.name}
        </Link>
    )
}
