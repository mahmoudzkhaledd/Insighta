"use client";

import { MainNavItem } from "@/types";


import useScroll from "@/hooks/use-scroll";
import { Button, buttonVariants } from "@/components/ui/button";


import { Icons } from "@/components/General/Icons";
import { MainNav } from "./main-nav";
import { useAuthX } from "@/authX/Provider/AuthXProvider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface NavBarProps {

  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function NavBar({

  items,
  children,
  rightElements,
  scroll = false,
}: NavBarProps) {
  const scrolled = useScroll(50);
  const session = useAuthX();

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
        }`}
    >
      <div className="container flex h-[60px] items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          {rightElements}

          {session?.user ? (
            <Link href={'/dashboard'}>
              <Button size={'sm'} className="flex rounded-full items-center gap-1 group ">
                Dashboard
                <ArrowRight className="w-4 group-hover:translate-x-1 transition-all " />
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={'/login'}>
                <Button
                  className="rounded-full px-4"
                  variant="default"
                  size={'sm'}
                >
                  <span>Sign In</span>
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button
                  className="rounded-full px-4"
                  variant='outline'
                  size={'sm'}
                >
                  <span>Sign up</span>
                  
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
