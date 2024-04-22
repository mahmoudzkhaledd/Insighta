import { Icons } from "@/components/General/Icons";

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  magicLinkExpiration: string;
  replyToEmail: string;
  links: {
    twitter: string;
    github: string;
  };
};
type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
    | {
      href: string;
      items?: never;
    }
    | {
      href?: string;
      items: any[];
    }
  );
const site_url = process.env.NEXT_PUBLIC_APP_URL ?? "";

export const siteConfig: SiteConfig = {
  name: "Insighta",
  description: "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "insighta.app@gmail.com",
  replyToEmail: "mahmoudnaggar2002@gmail.com",
  magicLinkExpiration: '1h',
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Partners", href: "#" },
      { title: "Jobs", href: "#" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
