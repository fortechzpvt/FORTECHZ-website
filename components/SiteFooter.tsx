"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "SLA",      value: "99.99%" },
  { label: "Response", value: "12ms"   },
  { label: "Uptime",   value: "100%"   },
];

export default function SiteFooter() {
  return (
    <footer
      className="absolute bottom-0 left-0 right-0 z-20 border-t border-ink/8 anim-fade"
      style={{ animationDelay: "0.8s" }}
      role="contentinfo"
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-12">
        {/* Left: SLA Status */}
        <div className="flex items-center gap-5" aria-label="System status metrics">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-65" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-ink/55 tracking-[0.12em] uppercase">
              All Systems Nominal
            </span>
          </div>
          <div className="h-3 w-[1px] bg-ink/15 hidden sm:block" aria-hidden="true" />
          <div className="hidden sm:flex items-center gap-5">
            {metrics.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="font-mono text-xs text-ink/35 tracking-[0.14em] uppercase">{label}:</span>
                <span className="font-mono text-xs text-accent tracking-[0.1em] font-bold">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Scroll Indicator */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <div className="flex flex-col items-center justify-end overflow-hidden h-5">
            <motion.div
              className="w-[1px] bg-ink/40 rounded-full"
              animate={{ height: ["8px", "20px", "8px"], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "8px" }}
            />
          </div>
          <span className="font-mono text-xs text-ink/35 tracking-[0.22em] uppercase">Scroll</span>
        </div>
      </div>
    </footer>
  );
}
