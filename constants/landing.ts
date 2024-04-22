import { Icons } from "@/components/General/Icons";

type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};
type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
}

export const infos: InfoLdg[] = [
  {
    title: "Powerful Insights Engine",
    description:
      "Gain unparalleled understanding of your website's performance and user behavior with our cutting-edge analytics engine. Focus on growth while we deliver actionable insights at your fingertips.",
    image: "/work-from-home.jpg",
    list: [
      {
        title: "Comprehensive Visitor Analytics",
        description: "Track visitor count, visits duration, popular routes, geographical distribution, and device/browser usage.",
        icon: "laptop",
      },
      {
        title: "Customizable Logging",
        description: "Define and track custom actions with dynamic message schemas, ensuring detailed event logging tailored to your needs.",
        icon: "settings",
      },
      {
        title: "Dynamic Counters",
        description:
          "Create and manage counters with adjustable reset durations, threshold alerts, and historical data storage for impactful performance monitoring.",
        icon: "search",
      },
    ],
  },
  {
    title: "Seamless Integration",
    description:
      "Effortlessly integrate our analytics package into your website, whether it's built on Node.js, React, or Next.js. Enjoy hassle-free setup and start collecting data instantly.",
    image: "/work-from-home.jpg",
    list: [
      {
        title: "Versatile Compatibility",
        description:
          "Customize your integrations to fit your unique requirements.",
        icon: "laptop",
      },
      {
        title: "Efficient",
        description: "Enabling instant data collection with one line of code.",
        icon: "search",
      },
      {
        title: "Reliable",
        description:
          "Rely on our robust infrastructure and comprehensive documentation.",
        icon: "settings",
      },
    ],
  },
  {
    title: "Tailored Subscription Plans",
    description:
      "Choose from a range of subscription plans tailored to suit your website analytics needs and budget. Enjoy flexible options and unlock premium features for optimal performance tracking.",
    image: "/work-from-home.jpg",
    list: [
      {
        title: "Flexible Pricing",
        description:
          " Select a subscription plan that fits your budget and requirements, with options for monthly or yearly billing cycles.",
        icon: "laptop",
      },
      {
        title: "Tiered Features",
        description: "Access different levels of features and capabilities based on your chosen subscription plan, ensuring scalability as your website grows.",
        icon: "search",
      },
      {
        title: "Easy Management",
        description:
          "Effortlessly manage your subscription status, upgrade or downgrade plans, and view billing details from the intuitive dashboard, providing full control over your analytics experience.",
        icon: "settings",
      },
    ],
  },
];

export const features = [
  {
    title: "Comprehensive Analytics",
    description: "Track visitor count, routes, countries, and browsers effortlessly. Gain insights that drive your website's success.",
    link: "/",
  },
  {
    title: "Effortless Integration",
    description:
      "Seamlessly integrate with Node.js, React, or Next.js. Start collecting data with ease and without coding hassle.",
    link: "/",
  },
  {
    title: "Flexible Subscription Plans",
    description:
      "Choose from monthly or yearly plans tailored to your needs. Enjoy scalable features and pricing that fits your budget.",
    link: "/",
  },
  {
    title: "Custom Event Logging",
    description:
      "Define and track custom actions with dynamic message schemas. Capture user interactions and events with precision.",
    link: "/",
  },
  
  {
    title: "Dynamic Counters",
    description:
      "Create counters with adjustable reset durations and threshold alerts. Monitor key metrics and receive alerts for impactful performance insights.",
    link: "/",
  },
];

export const testimonials = [
  {
    name: "John Doe",
    job: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    review:
      "The next-saas-stripe-starter repo has truly revolutionized my development workflow. With its comprehensive features and seamless integration with Stripe, I've been able to build and deploy projects faster than ever before. The documentation is clear and concise, making it easy to navigate through the setup process. I highly recommend next-saas-stripe-starter to any developer.",
  },
  {
    name: "Alice Smith",
    job: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I've been able to create modern and attractive user interfaces in record time. The starter kit provides a solid foundation for building sleek and intuitive designs, allowing me to focus more on the creative aspects of my work.",
  },
  {
    name: "David Johnson",
    job: "DevOps Engineer",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    review:
      "Thanks to next-saas-stripe-starter, I was able to streamline the entire process and get payments up and running in no time. ",
  },
  {
    name: "Michael Wilson",
    job: "Project Manager",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    review:
      "I'm impressed by the quality of code and clear documentation of next-saas-stripe-starter. Kudos to the team!",
  },
  {
    name: "Sophia Garcia",
    job: "Data Analyst",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    review:
      "next-saas-stripe-starter provided me with the tools I needed to efficiently manage user data. Thank you so much!",
  },
  {
    name: "Emily Brown",
    job: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    review:
      "next-saas-stripe-starter has been an invaluable asset in my role as a marketing manager. With its seamless integration with Stripe, I've been able to launch targeted marketing campaigns with built-in payment functionality, allowing us to monetize our products and services more effectively.",
  },
];
