import type { Metadata } from "next";
import ServiceDetailTemplate, { type ServiceDetailData } from "@/components/ServiceDetailTemplate";

const data: ServiceDetailData = {
  index: "02",
  slug: "pos-systems",
  serviceType: "Point of Sale (POS) System Development",
  titleLines: ["POS", "Systems"],
  tagline: "Custom point-of-sale software tailored to your retail or hospitality operation in Sri Lanka.",
  intro: [
    "Fortechz builds custom POS systems for retail shops, restaurants, supermarkets, and pharmacies across Sri Lanka — designed around how your business actually operates, not a rigid off-the-shelf template.",
    "Every POS system we build includes real-time inventory tracking, multi-location and multi-terminal support, and a reporting dashboard, so you always know what's selling, what's low, and what's owed.",
    "We also handle payment gateway integration so billing, cash, and card transactions flow through one system instead of three.",
  ],
  features: ["Real-time inventory tracking", "Multi-location support", "Payment gateway integration", "Reporting dashboard"],
  faqs: [
    {
      question: "How much does a POS system cost in Sri Lanka?",
      answer: "Cost depends on the number of terminals, locations, and whether you need custom inventory or reporting logic. We provide a fixed quote after a short requirements call — no hidden monthly surprises.",
    },
    {
      question: "Can a POS system support multiple store locations?",
      answer: "Yes. Our POS systems are built with multi-location support from the start, so inventory, sales, and reporting sync across every branch in real time.",
    },
    {
      question: "Does your POS system work offline?",
      answer: "We can build offline-first billing with local sync-on-reconnect for businesses in areas with unreliable internet, depending on your requirements — this is scoped during the initial consultation.",
    },
  ],
  metaDescription: "Custom POS systems for retail, restaurants, and pharmacies in Sri Lanka. Real-time inventory, multi-location support, and payment gateway integration.",
};

export const metadata: Metadata = {
  title: "POS System Development in Sri Lanka",
  description: data.metaDescription,
  alternates: { canonical: "/services/pos-systems" },
  openGraph: {
    title: "POS System Development in Sri Lanka | Fortechz",
    description: data.metaDescription,
    url: "/services/pos-systems",
    images: ["/og-image.png"],
  },
};

export default function PosSystemsPage() {
  return <ServiceDetailTemplate data={data} />;
}
