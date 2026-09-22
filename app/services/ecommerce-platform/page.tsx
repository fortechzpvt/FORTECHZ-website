import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "03",
  slug: "ecommerce-platform",
  serviceType: "Ecommerce Website Development",
  titleLines: ["Ecommerce", "Platform"],
  tagline: "A fully-featured online store engineered for scale, from product catalogue to checkout.",
  intro: [
    "Fortechz builds custom ecommerce websites for Sri Lankan and global businesses that want a storefront designed around their catalogue and customers, not a locked-down theme.",
    "We handle the full stack: custom storefront design, secure payment processing (including local Sri Lankan gateways where required), order and fulfilment management, and customer account portals.",
    "Every ecommerce platform we build is engineered to handle high traffic without slowing down or falling over during a promotion or seasonal spike.",
  ],
  features: ["Custom storefront design", "Secure payment processing", "Order & fulfilment management", "Customer account portals"],
  faqs: [
    {
      question: "How much does ecommerce website development cost?",
      answer: "It depends on catalogue size, custom checkout logic, and integrations (payment gateways, inventory, delivery). We scope this in a short call and return a fixed quote.",
    },
    {
      question: "Can you integrate local Sri Lankan payment gateways?",
      answer: "Yes — we integrate local and international payment gateways depending on your customer base and settlement requirements.",
    },
    {
      question: "Custom ecommerce vs. a platform like Shopify — which is right for my business?",
      answer: "If your needs fit standard ecommerce patterns and you want to launch fast, a hosted platform can be the pragmatic choice. If you need custom checkout logic, unusual product structures, or deep integrations with your own systems, a custom-built platform gives you full control without ongoing platform fees.",
    },
  ],
  metaDescription: "Custom ecommerce website development in Sri Lanka. Secure payment integration, order management, and storefronts built to scale for high traffic.",
};

export const metadata: Metadata = {
  title: "Ecommerce Website Development in Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/ecommerce-platform" },
  openGraph: {
    title: "Ecommerce Website Development in Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/ecommerce-platform",
    images: ["/og-image.png"],
  },
};

export default function EcommercePlatformPage() {
  return <ServiceDetailTemplate data={data} />;
}
