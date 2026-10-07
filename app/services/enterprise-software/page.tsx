import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "06",
  slug: "enterprise-software",
  serviceType: "Enterprise Software Development",
  titleLines: ["Enterprise", "Software"],
  tagline: "Complex, mission-critical software for organisations that can't afford downtime.",
  intro: [
    "Fortechz builds enterprise software systems for organisations where downtime, data loss, or slow performance is not an acceptable outcome.",
    "We architect for zero-downtime from the start: cloud infrastructure on AWS or GCP, microservices where they reduce risk, and CI/CD pipelines that let your team ship changes without fear.",
    "Every enterprise engagement includes 24/7 monitoring and an SLA, targeting the same 99.99% uptime standard we hold our own systems to.",
  ],
  features: ["Cloud infrastructure (AWS/GCP)", "Microservices architecture", "CI/CD pipeline setup", "24/7 monitoring & SLA"],
  faqs: [
    {
      question: "What does enterprise software development cost?",
      answer: "Enterprise engagements are scoped individually based on system complexity, integrations, and compliance requirements — we don't quote this without a proper discovery phase, because underscoping mission-critical software is how projects fail.",
    },
    {
      question: "Do you provide ongoing monitoring and support after launch?",
      answer: "Yes — 24/7 monitoring and an SLA are standard parts of our enterprise software engagements, not an add-on.",
    },
    {
      question: "Can you integrate with our existing systems?",
      answer: "Yes. Most enterprise projects involve integrating with existing databases, ERPs, or third-party APIs — we design the integration layer as part of the initial architecture, not as an afterthought.",
    },
  ],
  metaDescription: "Mission-critical enterprise software development in Sri Lanka. Cloud infrastructure, microservices architecture, CI/CD pipelines, and 99.99% uptime SLAs.",
};

export const metadata: Metadata = {
  title: "Enterprise Software Development Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/enterprise-software" },
  openGraph: {
    title: "Enterprise Software Development Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/enterprise-software",
    images: ["/og-image.png"],
  },
};

export default function EnterpriseSoftwarePage() {
  return <ServiceDetailTemplate data={data} />;
}
