"use server";
import WebsiteHeader from "./_components/WebsiteHeader"
import WebsiteGraph from "./_components/WebsiteGraph"
import CountsCard from "./_components/CountsCard"
import { getWebsite } from "@/Services/websites/getWebsite";

export default async function WebsiteAnalyticsPage({ params }: { params: { websiteId: string; } }) {

  const website = await getWebsite(params.websiteId, false);

  if (website == null) return <></>;

  return (
    <main className="flex mx-auto flex-col  gap-4 p-4 md:gap-8 md:p-10 ">
      <WebsiteHeader
        userId={website.userId}
        available={website.available}
        id={website._id}
        updatedAt={website.updatedAt}
        websiteName={website.name} url={website.url} />
      <div className="grid gap-6 max-w-6xl w-full mx-auto">
        <WebsiteGraph
          visitors={JSON.parse(JSON.stringify(website.visitorsHistory))}
          visits={JSON.parse(JSON.stringify(website.visitsHistory))}
          visitorsCount={website.visitors} visitsCount={website.visits} />
        <div className="grid gap-6 lg:grid-cols-3">
          <CountsCard
            emptyMsg="No pages yet!"
            title="Top Pages" data={website.pages} />
          <CountsCard
            title="Top Countries"
            emptyMsg="No data yet!"
            data={website.countries} />
          <CountsCard
            title="Browsers"
            emptyMsg="No data yet!"
            data={website.browsers} />
        </div>
      </div>
    </main>
  )
}
