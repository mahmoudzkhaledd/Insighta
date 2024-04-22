import { Button } from "@/components/ui/button"
import { frontendConfigs } from "@/constants/websiteConfigs"
import { cn } from "@/lib/utils"
import { subActionSchema } from "@/types/ActionSchema"
import { ArrowRight } from "lucide-react"
import moment from "moment"
import Link from "next/link"
import { z } from "zod"

export default function SubActionComponent({ action, arrow }: { arrow: boolean, action: z.infer<typeof subActionSchema> }) {
    const color = (frontendConfigs.colorSchema as any)[action.color]
    return (
        <div className={cn('rounded-lg  transition-all p-4 py-5 border grid   w-full gap-4', {
            'grid-cols-7': arrow,
            "grid-cols-5": !arrow,
        })} style={{
            backgroundColor: color.backgroundColor,
            color: color.textColor,
            borderColor: color.borderColor,
        }}>

            <h2 className='col-span-4'>
                {action.message}
            </h2>

            <p className={cn({
                "col-span-1": !arrow,
                "col-span-2": arrow,
            })}>{moment(action.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
            {
                arrow && <Link href={`/websites/${action.websiteId}/actions/logs/${action.actionId}`}>
                    <ArrowRight className="w-5 hover:translate-x-2 transition-all"/>
                </Link>
            }

        </div>
    )
}