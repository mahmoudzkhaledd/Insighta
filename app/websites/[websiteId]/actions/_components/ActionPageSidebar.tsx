import { Button } from "@/components/ui/button";
import { actionPageSidebarItems } from "@/constants/actionPage";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ActionPageSidebar({ className, websiteId }: { websiteId: string; className?: string }) {

    return (
        <div>
            {
                actionPageSidebarItems.map((e, idx) =>
                    <Link key={idx} href={`/websites/${websiteId}/actions${e.link}`}>
                        <Button className={cn("py-5 lg:py-8 justify-between flex items-center gap-3", className)} variant={'ghost'} size={'sm'} >
                            <div className="flex items-center gap-3">
                                <e.icon />
                                <div className="hidden lg:flex lg:mr-10 gap-1 flex-col lg:items-start">
                                    <p className=" font-semibold">{e.title}</p>
                                    {e.subTitle && <p className=" text-sm text-gray-400">{e.subTitle}</p>}
                                </div>
                            </div>
                            <div className="hidden lg:flex lg:flex-col ">
                                <ArrowRight className="w-4" />
                            </div>

                        </Button>
                    </Link>)
            }
        </div>
    )
}
