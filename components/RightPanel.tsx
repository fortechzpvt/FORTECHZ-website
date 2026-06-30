"use client";

import { useState } from "react";

const TOTAL_SLIDES = 4;

export default function RightPanel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const goNext = () => setActiveSlide((p) => (p + 1) % TOTAL_SLIDES);
  const goPrev = () => setActiveSlide((p) => (p - 1 + TOTAL_SLIDES) % TOTAL_SLIDES);

  const trackFill = `${((activeSlide + 1) / TOTAL_SLIDES) * 100}%`;

  return (
    <div className="flex flex-col justify-end h-full py-6 pt-20 text-right">
      {/* Pagination */}
      <div className="space-y-3 anim-up" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-end gap-2">
          <span className="font-mono text-xs text-ink/30 tracking-[0.18em] uppercase">
            {String(activeSlide + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={goPrev}
            className="font-mono text-sm tracking-[0.22em] text-ink/40 hover:text-accent transition-colors duration-200 uppercase"
            aria-label="Previous slide"
          >
            P
          </button>
          <div className="relative w-20 h-[1px] bg-ink/18 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-accent transition-all duration-300"
              style={{ width: trackFill }}
            />
          </div>
          <button
            onClick={goNext}
            className="font-mono text-sm tracking-[0.22em] text-ink hover:text-accent transition-colors duration-200 uppercase"
            aria-label="Next slide"
          >
            N
          </button>
        </div>
      </div>
    </div>
  );
}

