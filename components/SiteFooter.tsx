"use client";

import { motion } from "framer-motion";

export default function SiteFooter() {
  return (
    <footer
      className="absolute bottom-0 left-0 right-0 z-20 border-t border-accent/10 anim-fade"
      style={{ animationDelay: "0.8s" }}
      role="contentinfo"
    >
      <div className="flex items-center justify-between px-6 md:px-10 h-12">
        {/* Left: minimal status dot */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-50" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          <span className="font-mono text-xs text-ink/35 tracking-[0.16em] uppercase">
            Operational
          </span>
        </div>

        {/* Right: Scroll Indicator */}
        <div className="flex items-center gap-2" aria-hidden="true">
          <div className="flex flex-col items-center justify-end overflow-hidden h-5">
            <motion.div
              className="w-[1px] bg-accent/50 rounded-full"
              animate={{ height: ["8px", "20px", "8px"], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ height: "8px" }}
            />
          </div>
          <span className="font-mono text-xs text-ink/30 tracking-[0.22em] uppercase">Scroll</span>
        </div>
      </div>
    </footer>
  );
}
