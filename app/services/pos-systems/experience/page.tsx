import type { Metadata } from "next";
import Link from "next/link";
import PosDemo from "@/components/PosDemo";

export const metadata: Metadata = {
  title: "Experience the POS System",
  description: "Try a live demo of the Fortechz POS system, fully customised to your preference, with sample sales, inventory, tax and reports.",
  alternates: { canonical: "/services/pos-systems/experience" },
  robots: { index: false, follow: true },
};

export default function PosExperiencePage() {
  return (
    <main className="min-h-screen bg-canvas pt-14 pb-20">
      <nav aria-label="Breadcrumb" className="px-6 md:px-10 lg:px-16 pt-6">
        <ol className="flex items-center gap-2 font-mono text-[0.65rem] text-ink/35 tracking-[0.1em] uppercase">
          <li><Link href="/services/pos-systems" className="hover:text-accent transition-colors">← POS Systems</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink/55" aria-current="page">Experience</li>
        </ol>
      </nav>
      <header className="px-6 md:px-10 lg:px-16 pt-8 pb-10 max-w-3xl">
        <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-4">Live demo</p>
        <h1 className="font-display font-bold text-ink text-4xl md:text-6xl tracking-[-0.05em] uppercase leading-[0.95]">Experience the POS</h1>
        <p className="font-mono text-sm text-ink/55 leading-[1.9] mt-5">
          Sign in with the demo credentials and explore the dashboard, reports, stock and more with sample data. Everything is fully customised to your preference, so open Settings to switch between dark and bright mode, change colours, move the sidebar and set your own tax rates. Adding products is disabled in this view only demo.
        </p>
      </header>
      <section className="px-4 sm:px-6 md:px-10 lg:px-16">
        <PosDemo />
      </section>
    </main>
  );
}
