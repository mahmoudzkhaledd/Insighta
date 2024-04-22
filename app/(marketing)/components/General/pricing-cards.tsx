"use client";

import { useState } from "react";

import { HeaderSection } from "../sections/header-section";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { Package, PackageAdvantage } from "@prisma/client";
import { Package2 } from "lucide-react";
import { PackageProps } from "@/types";
import PricingCard from "@/components/General/PricingCard";

export function PricingCards({ packages, subscribedPackageId }: { subscribedPackageId?: string | null; packages: PackageProps[] }) {

  const [isYearly, setIsYearly] = useState<boolean>(false);


  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };



  return (
    <section className="container flex flex-col items-center text-center">
      <HeaderSection label="Pricing" title="Start at full speed !" />

      <div className="mb-4 mt-10 flex items-center gap-5">
        <ToggleGroup
          type="single"
          size="sm"
          defaultValue={isYearly ? "yearly" : "monthly"}
          onValueChange={toggleBilling}
          aria-label="toggle-year"
          className="h-9 overflow-hidden rounded-full border bg-background p-1 *:h-7 *:text-muted-foreground"
        >
          <ToggleGroupItem
            value="yearly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle yearly billing"
          >
            Yearly (-20%)
          </ToggleGroupItem>
          <ToggleGroupItem
            value="monthly"
            className="rounded-full px-5 data-[state=on]:!bg-primary data-[state=on]:!text-primary-foreground"
            aria-label="Toggle monthly billing"
          >
            Monthly
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {
        packages.length == 0 && <div className="mt-4  w-full flex flex-col gap-2 items-center justify-center">
          <Package2 size={60} />
          <span className="mx-auto text-center">No packages added yet, please come later.</span>
        </div>
      }
      <div className="mx-auto grid max-w-6xl gap-5 bg-inherit py-5 md:grid-cols-3 lg:grid-cols-3">
        {packages.map((offer) => (
          <PricingCard subscribedPackageId={subscribedPackageId} offer={offer} key={offer.id} />
        ))}

      </div>

      <p className="mt-3 text-balance text-center text-base text-muted-foreground">
        Email{" "}
        <a
          className="font-medium text-primary hover:underline"
          href="mailto:support@saas-starter.com"
        >
          support@saas-starter.com
        </a>{" "}
        for to contact our support team.
        <br />
        <strong>
          You can test the subscriptions and won&apos;t be charged.
        </strong>
      </p>
    </section>
  );
}
