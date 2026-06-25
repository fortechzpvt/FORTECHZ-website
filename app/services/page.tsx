import Link from "next/link";
import Marquee from "@/components/Marquee";

const services = [
  {
    index: "01",
    title: "Basic Business Website",
    desc: "A clean, fast, professionally crafted website for your business. Built with performance-first principles, mobile-optimized, and designed to convert visitors into clients.",
    features: ["Responsive design", "SEO-ready structure", "Contact & enquiry forms", "CMS integration"],
  },
  {
    index: "02",
    title: "POS Systems",
    desc: "Custom point-of-sale software tailored to your retail or hospitality operation. Real-time inventory, multi-terminal support, and sales analytics built in.",
    features: ["Real-time inventory tracking", "Multi-location support", "Payment gateway integration", "Reporting dashboard"],
  },
  {
    index: "03",
    title: "E-commerce Platform",
    desc: "A fully-featured online store engineered for scale. From product catalogues to checkout flows, built to handle high traffic without compromise.",
    features: ["Custom storefront design", "Secure payment processing", "Order & fulfilment management", "Customer account portals"],
  },
  {
    index: "04",
    title: "Web & Mobile Development",
    desc: "Cross-platform applications that work seamlessly on every device. Whether web, iOS, or Android, we engineer systems that perform at every touchpoint.",
    features: ["React / Next.js web apps", "React Native mobile apps", "API design & integration", "App Store deployment"],
  },
  {
    index: "05",
    title: "Custom Website Design & Build",
    desc: "Bespoke digital experiences designed from a blank canvas. Every pixel is intentional — brand-aligned, interactive, and built to impress.",
    features: ["Bespoke UI/UX design", "3D & interactive elements", "Brand system integration", "Performance audits"],
  },
  {
    index: "06",
    title: "Enterprise Software Systems",
    desc: "Complex, mission-critical software for organisations that can't afford downtime. Microservices, cloud-native architecture, and 99.99% uptime SLAs.",
    features: ["Cloud infrastructure (AWS/GCP)", "Microservices architecture", "CI/CD pipeline setup", "24/7 monitoring & SLA"],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-canvas pt-14">

      {/* Page header */}
      <section className="px-6 md:px-10 lg:px-16 pt-20 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5 anim-up" style={{ animationDelay: "0.05s" }}>
              Fortechz · Services
            </p>
            <h1 className="font-display font-bold text-ink text-6xl md:text-8xl lg:text-9xl tracking-[-0.05em] uppercase leading-[0.85] anim-up" style={{ animationDelay: "0.12s" }}>
              What<br />We<br />Build
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
              Precision-engineered digital solutions. From a first business site to enterprise-grade systems — every engagement is treated with the same obsessive attention to craft.
            </p>
            <div className="mt-6 flex items-center gap-3 anim-up" style={{ animationDelay: "0.28s" }}>
              <span className="font-mono text-xs text-ink/25 tracking-[0.18em] uppercase">06 Services</span>
              <div className="flex-1 h-px bg-ink/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Services grid */}
      <section className="px-6 md:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-ink/[0.07]">
          {services.map((s, i) => (
            <div
              key={s.index}
              className="bg-canvas p-8 md:p-10 flex flex-col gap-6 group anim-up relative overflow-hidden"
              style={{ animationDelay: `${0.08 + i * 0.06}s` }}
            >
              {/* Ghost index number */}
              <span
                className="absolute -bottom-6 -right-2 font-display font-bold text-ink/[0.04] select-none pointer-events-none leading-none"
                style={{ fontSize: "clamp(5rem, 10vw, 8rem)" }}
                aria-hidden="true"
              >
                {s.index}
              </span>

              {/* Index + divider */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.22em] text-ink/25 uppercase">{s.index}</span>
                <div className="h-px bg-ink/10 w-8 group-hover:w-14 transition-all duration-500" />
              </div>

              {/* Title */}
              <h2 className="font-display font-bold text-ink text-2xl md:text-[1.65rem] tracking-[-0.04em] uppercase leading-tight relative">
                {s.title}
              </h2>

              {/* Description */}
              <p className="font-mono text-sm text-ink/60 leading-[1.85] flex-1 relative">
                {s.desc}
              </p>

              {/* Feature list */}
              <ul className="space-y-2 relative">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="block w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-mono text-xs text-ink/50 tracking-[0.06em] uppercase">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 w-fit mt-2 relative
                           font-mono text-xs tracking-[0.14em] uppercase
                           px-5 py-3 bg-accent text-canvas btn-glow
                           hover:bg-accent/90
                           transition-all duration-300"
              >
                Work with us
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M1.5 5.5h8M5.5 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="px-6 md:px-10 lg:px-16 py-12 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-ink text-xl tracking-[-0.03em] uppercase">Not sure which service fits?</p>
          <p className="font-mono text-sm text-ink/45 mt-1">Let&apos;s have a conversation first — no commitment required.</p>
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
