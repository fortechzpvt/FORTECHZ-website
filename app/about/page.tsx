import Link from "next/link";
import Marquee from "@/components/Marquee";

const values = [
  {
    index: "01",
    label: "Precision over speed",
    body: "We don't rush delivery at the cost of correctness. Every system we ship is tested to failure before it reaches production.",
  },
  {
    index: "02",
    label: "Clients are partners",
    body: "We don't take briefs and disappear. Every engagement is collaborative — you're in the room for every major decision.",
  },
  {
    index: "03",
    label: "No black boxes",
    body: "We document everything. After a Fortechz engagement, your team can own, extend, and maintain the system independently.",
  },
  {
    index: "04",
    label: "Built to outlast the trend",
    body: "We choose boring, proven technology for load-bearing systems. We reserve the cutting edge for where it genuinely matters.",
  },
];

const founders = [
  {
    index: "01",
    name: "Luthmin Tathsilu",
    role: "Co-Founder",
  },
  {
    index: "02",
    name: "Nawidu Chandrasiri",
    role: "Co-Founder",
  },
  {
    index: "03",
    name: "Kethnula Siriwardana",
    role: "Co-Founder",
  },
  {
    index: "04",
    name: "Risath Athsara",
    role: "Co-Founder",
  },
];

const metrics = [
  { value: "99.99%", label: "Average uptime SLA across live systems" },
  { value: "<12ms",  label: "Median API response time in production" },
  { value: "100%",   label: "Clients who renewed or referred in 2024" },
  { value: "6+",     label: "Industries served across 3 continents" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-canvas pt-14">

      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-20 pb-16 border-b border-ink/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <p className="font-mono text-xs tracking-[0.22em] text-ink/40 uppercase mb-5 anim-up" style={{ animationDelay: "0.05s" }}>
              Fortechz · About
            </p>
            <h1 className="font-display font-bold text-ink text-6xl md:text-8xl lg:text-9xl tracking-[-0.05em] uppercase leading-[0.85] anim-up" style={{ animationDelay: "0.12s" }}>
              Who<br />We<br />Are
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="font-mono text-sm text-ink/55 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
              A precision-focused technology studio building digital infrastructure for organisations that won&apos;t accept second-best.
            </p>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Manifesto */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4 space-y-2">
          <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase anim-up" style={{ animationDelay: "0.06s" }}>
            Our purpose
          </p>
          <div className="w-8 h-px bg-accent anim-up" style={{ animationDelay: "0.1s" }} />
        </div>
        <div className="md:col-span-8 space-y-6">
          <p className="font-display font-bold text-ink text-2xl md:text-3xl tracking-[-0.04em] uppercase leading-tight anim-up" style={{ animationDelay: "0.12s" }}>
            We architect digital infrastructure for organisations that won&apos;t accept second-best.
          </p>
          <p className="font-mono text-sm text-ink/60 leading-[1.9] anim-up" style={{ animationDelay: "0.18s" }}>
            Fortechz is a premium technology agency. We build websites, applications, and software systems that perform under real-world pressure — high traffic, complex data, and demanding users included.
          </p>
          <p className="font-mono text-sm text-ink/60 leading-[1.9] anim-up" style={{ animationDelay: "0.22s" }}>
            We work with a small number of clients at any one time. That&apos;s deliberate. Smaller roster means deeper focus, tighter feedback loops, and better outcomes. We&apos;re not scaling a factory — we&apos;re running a studio.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10">
        <div className="flex items-end justify-between mb-10">
          <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase anim-up" style={{ animationDelay: "0.06s" }}>
            Co-Founders
          </p>
          <div className="h-px flex-1 bg-ink/[0.07] mx-8 hidden md:block" />
          <p className="font-mono text-xs text-ink/20 tracking-[0.12em] uppercase hidden md:block">Fortechz Systems</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-ink/[0.07]">
          {founders.map((f, i) => (
            <div
              key={f.index}
              className="bg-canvas p-8 md:p-10 space-y-5 group anim-up"
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              {/* Index */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.22em] text-ink/20 uppercase">{f.index}</span>
                <div className="w-4 h-px bg-ink/10 group-hover:w-8 group-hover:bg-accent transition-all duration-500" />
              </div>

              {/* Avatar placeholder — initials */}
              <div className="w-14 h-14 border border-ink/10 group-hover:border-accent/40 flex items-center justify-center transition-colors duration-300">
                <span className="font-display font-bold text-ink/30 group-hover:text-accent text-xl tracking-[-0.05em] transition-colors duration-300 uppercase">
                  {f.name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>

              {/* Name + role */}
              <div className="space-y-1">
                <h3 className="font-display font-bold text-ink text-lg md:text-xl tracking-[-0.04em] uppercase leading-tight">
                  {f.name}
                </h3>
                <p className="font-mono text-xs text-accent tracking-[0.14em] uppercase">{f.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10">
        <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase mb-10 anim-up" style={{ animationDelay: "0.06s" }}>
          By the numbers
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/[0.07]">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="bg-canvas p-8 space-y-3 anim-up"
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <p className="font-display font-bold text-accent text-4xl md:text-5xl tracking-[-0.05em] uppercase">{m.value}</p>
              <p className="font-mono text-xs text-ink/45 leading-[1.7] tracking-[0.04em] uppercase">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="px-6 md:px-10 lg:px-16 py-16 border-b border-ink/10">
        <p className="font-mono text-xs tracking-[0.18em] text-ink/25 uppercase mb-10 anim-up" style={{ animationDelay: "0.06s" }}>
          How we work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/[0.07]">
          {values.map((v, i) => (
            <div
              key={v.index}
              className="bg-canvas p-8 md:p-10 space-y-4 anim-up"
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">{v.index}</span>
                <div className="flex-1 h-px bg-ink/[0.07]" />
              </div>
              <h3 className="font-display font-bold text-ink text-xl md:text-2xl tracking-[-0.04em] uppercase">{v.label}</h3>
              <p className="font-mono text-sm text-ink/55 leading-[1.85]">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-ink text-2xl tracking-[-0.04em] uppercase">Work with us</p>
          <p className="font-mono text-sm text-ink/45 mt-1">We&apos;re selective — and that works in your favour.</p>
        </div>
        <Link
          href="/contact"
          className="font-mono text-xs tracking-[0.14em] uppercase
                     px-6 py-3.5 bg-accent text-canvas btn-glow
                     hover:bg-accent/90
                     transition-all duration-300"
        >
          Get in touch
        </Link>
      </section>
    </main>
  );
}
