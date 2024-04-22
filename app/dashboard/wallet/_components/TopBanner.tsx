import { Button } from "@/components/ui/button";

export default function TopBanner() {
    return (
        <div  className="relative overflow-hidden w-full rounded-md border p-5 bg-gray-50 dark:bg-transparent">
            <div >
                <h2 className="mb-4 font-semibold">Upgrade your account to premiem to unlcok even more features</h2>
                <Button variant={'success'}>
                    Subscribe now
                </Button>
            </div>
            {/* <Image className="z-[0] absolute  h-auto top-0 right-0" src={'/images/texture1.png'} alt="" width={500} height={100} /> */}
        </div>
    )
}
