import { CardTitle, CardDescription, Card } from "@/components/ui/card"
import { WebsiteSchema } from "@/types/WebsiteSchema";
import moment from "moment"
import Link from "next/link";
export default function WebsiteComponent({ website }: { website: WebsiteSchema }) {
    return (
        <Link href={`/websites/${website._id}`} >
            <Card className="flex flex-row items-start p-4 hover:bg-muted transition-all">
                <img
                    alt="favicon"
                    loading="lazy"
                    className="aspect-square w-[55px]  overflow-hidden rounded"
                    src={`${website.url}/favicon.ico`}
                />
                <div className="flex flex-col truncate flex-1 ml-4">
                    <CardTitle className="mb-1 truncate">
                        <span className="text-xl font-semibold">
                            {(website.name)}
                        </span>
                    </CardTitle>
                    <CardDescription className="text-sm">
                        Created on {moment(website.createdAt).format('ll')}
                    </CardDescription>

                </div>
            </Card>
        </Link>
    )
}
