"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navbarItems } from "@/constants/dashboard";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <Button variant={'ghost'} size={'icon'}>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>
        </Button>
        <SheetContent side="left" className="!px-0">
          <div className="mt-7">
            {
              navbarItems.map((e, idx) => <Link key={idx} href={e.link}>
                <Button className="w-full" variant={'ghost'}>{e.name}</Button>
              </Link>)
            }
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
