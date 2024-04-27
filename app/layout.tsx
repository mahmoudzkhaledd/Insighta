import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import AuthXProvider from "@/authX/Provider/AuthXProvider";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { authX } from "@/authX";
import { Toaster } from "react-hot-toast";
import OnlineOfflineProvider from "@/components/Providers/OnlineOfflineProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getWebsiteConfigs } from "@/Services/WebsiteConfigs/GetWebsiteConfigs";
import WebConfigsProvider from "@/components/Providers/WebConfigsProvider";
import { setWebsiteConfigs } from "@/constants/websiteConfigs";
import { cn, delay } from "@/lib/utils";
import { getUserSubscription } from "@/Services/Subscription/GetUserSubscription";
import { SubscriptionProvider } from "@/components/Providers/SubscriptionProvider";
import WarningBar from "@/components/General/WarningBar";
import Link from "next/link";
import { siteConfig } from "@/constants/site";
import Insighta from "@/components/Providers/WebAnalytix";
import { Suspense } from "react";
import Spinner from "@/components/ui/Spinner copy";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.URL ?? "http://localhost:3000"),
  openGraph: {
    images: [
      {
        url: "/images/opengraph-image.jpg",
      }
    ],
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  twitter: {
    card: "summary_large_image",
  },
  description: "Unlock the power of website analytics with our comprehensive platform. Gain insights into visitor behavior, track performance metrics, and optimize your website for success. Sign up for a free trial today!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await authX();
  const configs = await getWebsiteConfigs();
  if (configs == null) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <div className="w-screen h-screen flex items-center justify-center">
            <h2>No Connection with the server, please come later.</h2>
          </div>
        </body>
      </html>
    )
  }

  setWebsiteConfigs(configs);

  const { subscription, daysToExpire, expired } = session?.user.id != null ? await getUserSubscription({ userId: session.user.id, state: "accepted" }) : { daysToExpire: null, subscription: null, expired: null };
  const warning = (daysToExpire != null && subscription != null && daysToExpire <= 5);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className)}>
        <WebConfigsProvider value={configs}>
          <AuthXProvider session={session}>
            <TooltipProvider delayDuration={30}>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <SubscriptionProvider subscription={JSON.parse(JSON.stringify({ subscription, daysToExpire, expired }))}>

                  <Toaster />
                  <OnlineOfflineProvider>
                    {
                      warning && <WarningBar>
                        <p className='text-white'>Warning: Your subscription will expire in {daysToExpire} {daysToExpire != 1 ? "days" : "day"}, please check <Link className=' underline' href={'/dashboard/subscription'}> subscription page</Link>.</p>
                      </WarningBar>
                    }
                    <div className={cn("h-full", { "mt-8": warning })}>
                      {children}
                      <Insighta exclude={[
                        "/admin",
                        "/admin/:id",
                        "/websites/662a415e9d7ea63fa7e2d099"
                      ]} />
                    </div>
                  </OnlineOfflineProvider>
                </SubscriptionProvider>
              </ThemeProvider>
            </TooltipProvider>
          </AuthXProvider>
        </WebConfigsProvider>
      </body>
    </html>
  );
}
