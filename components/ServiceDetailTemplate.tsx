import Link from "next/link";
import Marquee from "@/components/Marquee";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export type ServiceFaq = { question: string; answer: string };

export type ServiceDetailData = {
  index: string;
  slug: string;
  serviceType: string;
  titleLines: string[];
  tagline: string;
  intro: string[];
  features: string[];
  faqs: ServiceFaq[];
  metaDescription: string;
};

export default function ServiceDetailTemplate({ data }: { data: ServiceDetailData }) {
  const { index, slug, serviceType, titleLines, tagline, intro, features, faqs, metaDescription } = data;
  const name = titleLines.join(" ");

  const jsonLdBlocks = [
    serviceJsonLd({ name, description: metaDescription, slug, serviceType }),
    faqJsonLd(faqs),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name, path: `/services/${slug}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-canvas pt-14">
      {jsonLdBlocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="px-6 md:px-10 lg:px-16 pt-6">
        <ol className="flex items-center gap-2 font-mono text-[0.65rem] text-ink/35 tracking-[0.1em] uppercase">
          <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/services" className="hover:text-accent transition-colors">Services</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ink/55" aria-current="page">{name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-10 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5 anim-up" style={{ animationDelay: "0.05s" }}>
              Fortechz · Services · {index}
            </p>
            <h1 className="font-display font-bold text-ink text-5xl md:text-7xl lg:text-8xl tracking-[-0.05em] uppercase leading-[0.9] anim-up" style={{ animationDelay: "0.12s" }}>
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
              {tagline}
            </p>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Intro copy */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4 space-y-2">
          <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase anim-up" style={{ animationDelay: "0.06s" }}>
            Overview
          </p>
          <div className="w-8 h-px bg-accent anim-up" style={{ animationDelay: "0.1s" }} />
        </div>
        <div className="md:col-span-8 space-y-6">
          {intro.map((p, i) => (
            <p key={i} className="font-mono text-sm text-ink/60 leading-[1.9] anim-up" style={{ animationDelay: `${0.12 + i * 0.06}s` }}>
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10">
        <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase mb-10 anim-up" style={{ animationDelay: "0.06s" }}>
          What&apos;s included
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/[0.07]">
          {features.map((f, i) => (
            <div
              key={f}
              className="bg-canvas p-6 md:p-8 flex items-center gap-4 anim-up"
              style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            >
              <span className="block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
              <span className="font-mono text-sm text-ink/65 tracking-[0.02em]">{f}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10">
        <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase mb-10 anim-up" style={{ animationDelay: "0.06s" }}>
          Frequently asked
        </p>
        <div className="space-y-px bg-ink/[0.07]">
          {faqs.map((f, i) => (
            <div key={f.question} className="bg-canvas p-6 md:p-8 space-y-2 anim-up" style={{ animationDelay: `${0.08 + i * 0.06}s` }}>
              <h3 className="font-display font-bold text-ink text-base md:text-lg tracking-[-0.02em] uppercase">
                {f.question}
              </h3>
              <p className="font-mono text-sm text-ink/55 leading-[1.85]">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-ink text-xl tracking-[-0.03em] uppercase">Ready to start?</p>
          <p className="font-mono text-sm text-ink/45 mt-1">Tell us about your project, no commitment required.</p>
        </div>
        <Link
          href="/contact"
          className="font-mono text-xs tracking-[0.14em] uppercase
                     px-6 py-3.5 bg-accent text-canvas btn-glow
                     hover:bg-accent/90
                     transition-all duration-300"
        >
          Book a free consultation
        </Link>
      </section>
    </main>
  );
}
