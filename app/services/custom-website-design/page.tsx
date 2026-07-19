import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "05",
  slug: "custom-website-design",
  serviceType: "Custom Website Design and Development",
  titleLines: ["Custom", "Website", "Design"],
  tagline: "Bespoke digital experiences designed from a blank canvas — every pixel intentional.",
  intro: [
    "Fortechz is a custom web development company for Sri Lankan and international brands that want a website built entirely around their identity, not assembled from a template library.",
    "Our custom website design process starts from a blank canvas: bespoke UI/UX design, 3D and interactive elements where they earn their place, and full brand system integration.",
    "We finish every custom build with a performance audit, because a beautiful site that loads slowly loses visitors before they ever see the design.",
  ],
  features: ["Bespoke UI/UX design", "3D & interactive elements", "Brand system integration", "Performance audits"],
  faqs: [
    {
      question: "What's the difference between a custom website and a template website?",
      answer: "A template website starts from a pre-built layout you customize within its limits. A custom website is designed and coded from scratch around your brand and requirements, with no structural constraints — it costs more and takes longer, but gives you full control over design and performance.",
    },
    {
      question: "How much does a custom website cost?",
      answer: "Custom builds vary widely based on design complexity, interactivity, and page count. We scope this properly in a discovery call rather than quoting blind, so the number you get is one we can actually hold to.",
    },
    {
      question: "How long does a custom website build take?",
      answer: "Most custom website design and build projects run 4–10 weeks depending on scope, from design sign-off through development, review, and launch.",
    },
  ],
  metaDescription: "Bespoke website design and development in Sri Lanka. Custom UI/UX, 3D and interactive elements, and performance-first builds — no templates.",
};

export const metadata: Metadata = {
  title: "Custom Website Design & Development in Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/custom-website-design" },
  openGraph: {
    title: "Custom Website Design & Development in Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/custom-website-design",
    images: ["/og-image.png"],
  },
};

export default function CustomWebsiteDesignPage() {
  return <ServiceDetailTemplate data={data} />;
}
