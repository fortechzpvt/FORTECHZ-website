import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "04",
  slug: "web-mobile-development",
  serviceType: "Web and Mobile App Development",
  titleLines: ["Web &", "Mobile", "Development"],
  tagline: "Cross-platform applications that work seamlessly on every device — web, iOS, and Android.",
  intro: [
    "Fortechz builds web and mobile applications for businesses in Sri Lanka and internationally that need one product working reliably across web, iOS, and Android without maintaining three separate codebases.",
    "We build web apps in React / Next.js and mobile apps in React Native, sharing logic where it makes sense and going native where performance demands it.",
    "Every engagement includes API design and integration, so your app connects cleanly to the systems you already run, plus full App Store and Play Store deployment.",
  ],
  features: ["React / Next.js web apps", "React Native mobile apps", "API design & integration", "App Store deployment"],
  faqs: [
    {
      question: "How much does it cost to develop a mobile app?",
      answer: "Cost depends on platform coverage, feature complexity, and backend requirements. We break this down in a scoping call and give you a fixed quote before any work starts.",
    },
    {
      question: "Should I build a native app or a cross-platform app?",
      answer: "Cross-platform (React Native) covers most business apps well and ships faster for less cost. We recommend native only when you need deep hardware access or platform-specific performance that cross-platform can't match — we'll tell you honestly which applies to your case.",
    },
    {
      question: "Do you build apps for both iOS and Android?",
      answer: "Yes, from a single React Native codebase in most cases, which keeps ongoing maintenance and feature updates in sync across both platforms.",
    },
  ],
  metaDescription: "Cross-platform web and mobile app development for Sri Lankan and global businesses. React/Next.js, React Native, API integration, and App Store deployment.",
};

export const metadata: Metadata = {
  title: "Web & Mobile App Development Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/web-mobile-development" },
  openGraph: {
    title: "Web & Mobile App Development Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/web-mobile-development",
    images: ["/og-image.png"],
  },
};

export default function WebMobileDevelopmentPage() {
  return <ServiceDetailTemplate data={data} />;
}
