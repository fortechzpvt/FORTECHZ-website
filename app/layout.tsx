import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import TransitionOverlay from "@/components/TransitionOverlay";

export const metadata: Metadata = {
  title: "Fortechz — Architecting Elite Digital Infrastructure",
  description:
    "Premium technology agency specializing in elite custom software systems, scalable digital infrastructure, and high-performing web development.",
  keywords: ["custom software", "digital infrastructure", "web development", "technology agency", "scalable systems", "enterprise software"],
  authors: [{ name: "Fortechz Systems" }],
  openGraph: {
    title: "Fortechz — Elite Digital Infrastructure",
    description: "Engineering precision-grade digital systems for enterprises demanding uncompromising performance.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fortechz — Elite Digital Infrastructure",
    description: "Engineering precision-grade digital systems for enterprises demanding uncompromising performance.",
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
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" />
      </head>
      <body className="bg-canvas text-ink antialiased">
        {/* Grain texture — noise overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            pointerEvents: "none",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
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
