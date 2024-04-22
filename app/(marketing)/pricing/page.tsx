
import { authX } from '@/authX';
import { PricingCards } from '../components/General/pricing-cards';
import { PricingFaq } from '../components/General/pricing-faq';
import { prisma } from '@/lib/db';
export const metadata = {
  title: "Pricing",
}

export default async function PricingPage() {
  const packages = await prisma.package.findMany({
    where: {
      active: true,
    },
    include: {
      advantages: true,
    },
    orderBy: {
      price: 'asc',
    }
  });
  let subPackageId = null;
  const user = (await authX())?.user;
  if (user != null) {
    try {
      const sub = await prisma.subscription.findFirst({
        where: {
          userId: user.id,
        }
      });
      subPackageId = sub?.packageId;
    } catch (ex) {

    }
  }
  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards subscribedPackageId={subPackageId} packages={JSON.parse(JSON.stringify(packages))} />
      <hr className='container' />
      <PricingFaq />
    </div>
  )
}