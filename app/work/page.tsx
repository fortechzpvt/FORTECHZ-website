import Link from "next/link";
import Marquee from "@/components/Marquee";

const projects = [
  {
    index: "01",
    client: "Meridian Capital",
    type: "Enterprise Platform",
    year: "2024",
    desc: "Full-stack financial dashboard handling $2B+ in daily transactions. Sub-12ms query response, real-time data streaming, and SOC 2 compliant infrastructure.",
    tags: ["Next.js", "PostgreSQL", "AWS", "Real-time"],
  },
  {
    index: "02",
    client: "Luxe Retail Group",
    type: "E-commerce Platform",
    year: "2024",
    desc: "Custom multi-tenant e-commerce system serving 14 independent brands under one infrastructure. 340% uplift in checkout conversion.",
    tags: ["E-commerce", "Multi-tenant", "Payments", "CDN"],
  },
  {
    index: "03",
    client: "Harrow Hospitality",
    type: "POS & Operations System",
    year: "2024",
    desc: "End-to-end point-of-sale and kitchen display system for a 6-venue restaurant group. Reduced order errors by 78% in the first month.",
    tags: ["POS", "Real-time sync", "Mobile", "Analytics"],
  },
  {
    index: "04",
    client: "Vantage Studio",
    type: "Brand & Web Build",
    year: "2025",
    desc: "From-zero brand identity and bespoke marketing site for an architecture firm. Custom 3D WebGL scenes and micro-interaction system.",
    tags: ["Brand", "WebGL", "Design system", "Animations"],
  },
  {
    index: "05",
    client: "Axiom Health",
    type: "Mobile Application",
    year: "2025",
    desc: "React Native patient engagement app for a private health network. HIPAA-compliant architecture, biometric auth, and push notification scheduling.",
    tags: ["React Native", "HIPAA", "iOS + Android", "HealthKit"],
  },
  {
    index: "06",
    client: "NordTrade AG",
    type: "Custom Business Website",
    year: "2025",
    desc: "Multilingual B2B website for a Swiss trading company. CMS-driven, 6-language support, and custom SEO infrastructure.",
    tags: ["Multilingual", "CMS", "B2B", "SEO"],
  },
];

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-canvas pt-14">

      {/* Page header */}
      <section className="px-6 md:px-10 lg:px-16 pt-20 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5 anim-up" style={{ animationDelay: "0.05s" }}>
              Fortechz · Selected Work
            </p>
            <h1 className="font-display font-bold text-ink text-6xl md:text-8xl lg:text-9xl tracking-[-0.05em] uppercase leading-[0.85] anim-up" style={{ animationDelay: "0.12s" }}>
              Our<br />Projects
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
              A curated selection of systems we&apos;ve architected for clients who demand performance, precision, and longevity.
            </p>
            <div className="mt-6 flex items-center gap-3 anim-up" style={{ animationDelay: "0.28s" }}>
              <span className="font-mono text-xs text-ink/25 tracking-[0.18em] uppercase">06 Projects</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Projects list */}
      <section className="px-6 md:px-10 lg:px-16 py-4">
        {projects.map((p, i) => (
          <div
            key={p.index}
            className="border-b border-ink/[0.07] py-10 md:py-14 group anim-up"
            style={{ animationDelay: `${0.08 + i * 0.06}s` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              {/* Left: index + year */}
              <div className="md:col-span-2 flex md:flex-col gap-4 md:gap-2">
                <span className="font-mono text-xs tracking-[0.22em] text-ink/20 uppercase">{p.index}</span>
                <span className="font-mono text-xs tracking-[0.14em] text-ink/30 uppercase">{p.year}</span>
              </div>

              {/* Center: content */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase mb-2 flex items-center gap-2">
                    <span className="block w-4 h-px bg-accent" />
                    {p.type}
                  </p>
                  <h2 className="font-display font-bold text-ink text-3xl md:text-4xl tracking-[-0.04em] uppercase">
                    {p.client}
                  </h2>
                </div>
                <p className="font-mono text-sm text-ink/55 leading-[1.85] max-w-prose">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs tracking-[0.1em] text-ink/40 uppercase px-3 py-1 border border-ink/[0.1]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: arrow */}
              <div className="hidden md:flex md:col-span-3 items-center justify-end">
                <div className="w-10 h-10 border border-ink/12 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="text-ink/25 group-hover:text-canvas transition-colors duration-300">
                    <path d="M3 11L11 3M11 3H6M11 3v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-ink text-2xl tracking-[-0.04em] uppercase">Ready to be next?</p>
          <p className="font-mono text-sm text-ink/45 mt-1">We take a limited number of new projects each quarter.</p>
        </div>
        <Link
          href="/contact"
          className="font-mono text-xs tracking-[0.14em] uppercase
                     px-6 py-3.5 bg-accent text-canvas btn-glow
                     hover:bg-accent/90
                     transition-all duration-300"
        >
          Start a project
        </Link>
      </section>
    </main>
  );
}
