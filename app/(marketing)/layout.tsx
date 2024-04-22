
import { Suspense } from "react"
import { NavBar } from "./components/shared/navbar"
import { SiteFooter } from "./components/shared/site-footer"
import { marketingConfig } from "@/constants/marketing";

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {

  return (
    <div className="flex min-h-screen flex-col">
      <Suspense fallback="...">
        <NavBar items={marketingConfig.mainNav} scroll={true} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
