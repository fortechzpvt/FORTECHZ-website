import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Bump when page content changes; avoids a fresh timestamp on every build.
const LAST_UPDATED = "2026-10-07";

const SERVICE_SLUGS = [
  "business-website",
  "pos-systems",
  "ecommerce-platform",
  "web-mobile-development",
  "custom-website-design",
  "enterprise-software",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(LAST_UPDATED);

  const staticRoutes = ["", "/about", "/work", "/services", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = SERVICE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
