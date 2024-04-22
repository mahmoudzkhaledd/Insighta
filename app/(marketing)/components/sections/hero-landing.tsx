import Link from "next/link";

import { cn, } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { siteConfig } from "@/constants/site";
import { Icons } from "@/components/General/Icons";
import { Rocket } from "lucide-react";

export async function HeroLanding() {


  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">


        <h1 className=" text-balance font-urban  text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          You Build. We Analyze.<span className="text-blue-600"> <br /> You  <Rocket size={55} className="ml-2 inline" />. </span>
        </h1>

        <p
          className="max-w-[900px] text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Let your creativity soar while we monitor your website's performance. With our analytics, stay focused on what matters most: your project's success.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            className={cn(
              buttonVariants({ size: "lg", }),
              "gap-2",
              " rounded-full"
            )}
          >
            <span>Get Started</span>
            <Icons.arrowRight className="size-4" />
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",

              }),
              "px-5 rounded-full",
            )}
          >

            <p>
              Documentation
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
