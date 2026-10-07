import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm tracking-[0.2em] uppercase text-ink/50 mb-4">404</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Page not found</h1>
      <p className="text-ink/60 max-w-md mb-8">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="flex gap-6 text-sm">
        <Link href="/" className="hover:text-accent transition-colors">Home</Link>
        <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
        <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
      </div>
    </main>
  );
}
