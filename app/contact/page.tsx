import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Quote",
  description: "Get in touch with Fortechz for a free consultation on your business website, POS system, ecommerce platform, mobile app, or enterprise software project. We reply within one business day.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Fortechz",
    description: "Tell us what you're building — we'll let you know if we're the right fit, and reply within one business day.",
    url: "/contact",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd name="Contact" path="/contact" />
      <ContactForm />
    </>
  );
}
