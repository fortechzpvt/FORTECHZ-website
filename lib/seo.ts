export const SITE_URL = "https://fortechz.com";
export const SITE_NAME = "Fortechz";
export const SITE_TITLE_DEFAULT = "Fortechz: Architecting Elite Digital Infrastructure";
export const SITE_DESCRIPTION_DEFAULT =
  "Fortechz is a premium technology agency in Sri Lanka building custom software, POS systems, ecommerce platforms, web & mobile apps, and enterprise-grade digital infrastructure.";

export const CONTACT_EMAIL = "fortechzpvt@gmail.com";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/fortechz_pvt_ltd/",
  tiktok: "https://www.tiktok.com/@fortechz",
};

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "Fortechz (Pvt) Ltd",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_DESCRIPTION_DEFAULT,
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT_EMAIL,
      contactType: "sales",
      areaServed: "LK",
    },
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    serviceType: opts.serviceType,
    url: `${SITE_URL}/services/${opts.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
