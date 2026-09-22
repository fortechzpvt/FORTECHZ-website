import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "01",
  slug: "business-website",
  serviceType: "Business Website Design",
  titleLines: ["Business", "Website", "Design"],
  tagline: "A clean, fast, professionally crafted website for your business — built to convert visitors into clients.",
  intro: [
    "Fortechz designs and builds affordable business websites for companies across Sri Lanka that need a fast, credible online presence without the overhead of a large agency retainer.",
    "Every business website we ship is performance-first and mobile-optimized from day one, with a structure built for search engines from the ground up — so your site is easy to find, not just easy to look at.",
    "Whether you're a first-time small business owner or replacing an outdated site, we scope the build to what actually moves the needle: clarity, speed, and a clear path to contact you.",
  ],
  features: ["Responsive design", "SEO-ready structure", "Contact & enquiry forms", "CMS integration"],
  faqs: [
    {
      question: "How much does a business website cost in Sri Lanka?",
      answer: "Pricing depends on scope — page count, CMS needs, and design complexity. Most basic business websites fall in our entry budget tier. Share your requirements on the contact page and we'll give you a fixed quote within one business day.",
    },
    {
      question: "How long does it take to build a business website?",
      answer: "A standard business website typically takes 2–4 weeks from signed brief to launch, depending on content readiness and revision rounds.",
    },
    {
      question: "Do I need a custom website or is a template enough?",
      answer: "If you need something live quickly on a tight budget, a well-built template site is a reasonable starting point. If your brand, layout, or functionality needs are specific, our Custom Website Design & Build service is the better fit.",
    },
  ],
  metaDescription: "Fast, professional business website design in Sri Lanka. Mobile-optimized, SEO-ready, and built to convert. Get a fixed quote from Fortechz within one business day.",
};

export const metadata: Metadata = {
  title: "Business Website Design in Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/business-website" },
  openGraph: {
    title: "Business Website Design in Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/business-website",
    images: ["/og-image.png"],
  },
};

export default function BusinessWebsitePage() {
  return <ServiceDetailTemplate data={data} />;
}
