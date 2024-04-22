import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function NoSubscription({ message }: { message?: string; }) {
    return (
        <div className="h-full w-full flex flex-col">
            <div className="m-auto w-fit h-fit text-center flex flex-col justify-center items-center">
                <Package size={90} className="mb-4"/>
                <p className="mb-6 text-gray-500 text-center">
                    {
                        message ?? "You are currently not subscribed to any package. Please visit the packages page to view all the details."
                    }
                </p>
                <Link href={'/pricing'}>
                    <Button>
                        Packages page
                    </Button>
                </Link>
            </div>
        </div>
    )
}
