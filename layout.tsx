import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import TransitionOverlay from "@/components/TransitionOverlay";
import { SITE_URL, SITE_TITLE_DEFAULT, SITE_DESCRIPTION_DEFAULT, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: "%s | Fortechz",
  },
  description: SITE_DESCRIPTION_DEFAULT,
  keywords: [
    "custom software development Sri Lanka",
    "web development company Sri Lanka",
    "POS system Sri Lanka",
    "ecommerce website development",
    "mobile app development company",
    "enterprise software development",
    "digital infrastructure",
    "technology agency Sri Lanka",
  ],
  authors: [{ name: "Fortechz Systems" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Fortechz: Elite Digital Infrastructure",
    description: "Engineering precision grade digital systems for enterprises demanding uncompromising performance.",
    type: "website",
    url: SITE_URL,
    siteName: "Fortechz",
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: SITE_TITLE_DEFAULT }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortechz: Elite Digital Infrastructure",
    description: "Engineering precision grade digital systems for enterprises demanding uncompromising performance.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport: Viewport = {
  themeColor: "#F0F0F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" />
      </head>
      <body className="bg-canvas text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {/* Grain texture — noise overlay without broken root URL paths */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            opacity: 0.025,
            mixBlendMode: "overlay",
          }}
        />
        <TransitionOverlay />
        <Header />
        {children}
      </body>
    </html>
  );
}
