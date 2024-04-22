import WebsiteComponent from "./_components/WebsiteComponent"
import { getUserWebsites } from "@/Services/websites/GetUserWebsites"
import AddWebsiteDialog from "@/components/Dialogs/AddWebsiteDialog"
import NotFoundComponent from "@/components/General/NotFoundComponent";

export default async function DashboardWebsitesPage() {

    const websites = await getUserWebsites();
    if (websites == null) {
        return <NotFoundComponent />;
    }
    return <>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
            <div className="grid items-start gap-8">
                <div className="flex items-center justify-between px-2">
                    <div className="grid gap-1">
                        <h1 className="font-bold text-3xl">Your websites</h1>
                        <p className="text-md text-muted-foreground">
                            Create and manage content.
                        </p>
                    </div>
                    <AddWebsiteDialog />
                </div>
                {
                    websites.length == 0 && <div className="flex  flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-file-text size-10"
                                >
                                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                    <path d="M10 9H8" />
                                    <path d="M16 13H8" />
                                    <path d="M16 17H8" />
                                </svg>
                            </div>
                            <h2 className="mt-6 text-xl font-semibold">No content created</h2>
                            <p className="mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground">
                                You don't have any websites yet. Start creating one.
                            </p>
                            <AddWebsiteDialog />
                        </div>
                    </div>
                }
                {
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {
                            websites.map((e, idx) => <WebsiteComponent website={e} key={idx} />)
                        }

                    </div>
                }

            </div>
        </main>

    </>

}
