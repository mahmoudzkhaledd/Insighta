import { cn } from '@/lib/utils';
import React from 'react'
import { Icons } from './Icons';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { PackageProps } from '@/types';

export default function PricingCard({ offer, subscribedPackageId, className, testing = false }: {
    subscribedPackageId?: string | null; offer: PackageProps, className?: string;
    testing?: boolean;
}) {

    return (
        <div
            className={cn(
                "relative flex flex-col overflow-hidden rounded-3xl border shadow-sm",
                {
                    "-m-0.5 border-2 border-purple-400": offer.id == subscribedPackageId,
                },
                className,
            )}
            key={offer.id}
        >
            <div className="min-h-[150px] items-start space-y-4 bg-muted/50 p-6">
                <p className="flex font-urban text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    {offer.name}
                </p>

                <div className="flex flex-row">
                    <div className="flex items-end">
                        <div className="flex text-left text-3xl font-semibold leading-6">
                            {
                                offer.afterDiscount != null ? (
                                    <>
                                        <span className="mr-2 text-muted-foreground/80 line-through">
                                            ${offer.price}
                                        </span>
                                        <span>${offer.afterDiscount}</span>
                                    </>
                                ) : (
                                    `$${offer.price}`
                                )
                            }
                        </div>
                        <div className="-mb-1 ml-2 text-left text-sm font-medium text-muted-foreground">
                            <div>/{offer.duration == 'monthly' ? "month" : offer.duration == "forever" ? "forever" : "year"}</div>
                        </div>
                    </div>
                </div>
                <div className="text-left text-sm text-muted-foreground">
                    {offer.description}
                </div>
            </div>

            <div className="flex h-full flex-col justify-between gap-16 p-6">
                <ul className="space-y-2 text-left text-sm font-medium leading-normal">
                    {offer.advantages.map((feature, idx) => (
                        <li className="flex items-start gap-x-3" key={idx}>
                            {
                                feature.active ?
                                    <Icons.check className="size-5 shrink-0 text-purple-500" /> :
                                    <Icons.close className="size-5 shrink-0 text-gray-500" />
                            }
                            <p className={cn({
                                "text-gray-500": !feature.active,
                            })}>{feature.text}</p>
                        </li>
                    ))}
                </ul>
                <Link
                    href={testing ? "" : `/dashboard/pricing/${offer.id}`}
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                        }),

                        " rounded-full w-full",
                    )}
                >
                    See full details
                </Link>
            </div>
        </div>
    );
};
