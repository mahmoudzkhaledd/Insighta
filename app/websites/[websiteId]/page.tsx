"use server";
import WebsiteHeader from "./_components/WebsiteHeader";
import WebsiteGraph from "./_components/WebsiteGraph";
import CountsCard from "./_components/CountsCard";
import { getWebsite } from "@/Services/websites/getWebsite";
import NotFoundComponent from "@/components/General/NotFoundComponent";
import { isValidDate } from "@/lib/utils";
import { z } from "zod";
import { pointSchema } from "@/types/WebsiteSchema";
import { addDays } from "date-fns";

function filterByDateInterval(
  array: z.infer<typeof pointSchema>[],
  startDate: Date,
  endDate: Date
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return array.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= start && itemDate <= end;
  });
}

export default async function WebsiteAnalyticsPage({
  params,
  searchParams,
}: {
  searchParams: { from?: string; to?: string };
  params: { websiteId: string };
}) {
  const website = await getWebsite(params.websiteId, false, true);

  if (website == null)
    return (
      <NotFoundComponent
        title="Website not found"
        subTitle="Please try again later."
      />
    );
  // const from = isValidDate(searchParams.from);
  // const to = isValidDate(searchParams.from);
  // if (from != null && to != null) {
  //   website.visitorsHistory = filterByDateInterval(website.visitorsHistory, from, to);
  //   website.visitsHistory = filterByDateInterval(website.visitsHistory, from, to);
  // }
  return (
    <main className="flex mx-auto flex-col  gap-4 p-4 md:gap-8 md:p-10 ">
      <WebsiteHeader
        userId={website.userId}
        available={website.available}
        id={website._id}
        updatedAt={website.updatedAt}
        websiteName={website.name}
        fromLimit={
          website.visitsHistory.length == 0
            ? new Date()
            : new Date(website.visitsHistory[0].date)
        }
        toLimit={
          website.visitsHistory.length == 0
            ? addDays(new Date(), 1)
            : new Date(
                website.visitsHistory[website.visitsHistory.length - 1].date
              )
        }
        url={website.url}
      />
      <div className="grid gap-6 max-w-6xl w-full mx-auto">
        <WebsiteGraph
          visitors={JSON.parse(JSON.stringify(website.visitorsHistory))}
          visits={JSON.parse(JSON.stringify(website.visitsHistory))}
          visitorsCount={website.visitors}
          visitsCount={website.visits}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <CountsCard
            emptyMsg="No pages yet!"
            title="Top Pages"
            data={website.pages}
          />

          <CountsCard
            className="col-span-2"
            title="Browsers"
            emptyMsg="No data yet!"
            data={website.browsers}
          />
        </div>
      </div>
    </main>
  );
}
