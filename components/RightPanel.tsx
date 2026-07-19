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
        <div className="flex items-center justify-end gap-4">
          <a
            href="https://www.instagram.com/fortechz_pvt_ltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fortechz on Instagram"
            className="w-9 h-9 flex items-center justify-center text-ink/40 hover:text-accent transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@fortechz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fortechz on TikTok"
            className="w-9 h-9 flex items-center justify-center text-ink/40 hover:text-accent transition-colors duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M16.6 2h-3.2v14.2a3.1 3.1 0 1 1-2.2-2.97V9.9a6.3 6.3 0 1 0 5.4 6.24V8.62a7.9 7.9 0 0 0 4.6 1.47V6.9a4.7 4.7 0 0 1-4.6-4.9Z"
                fill="currentColor"
              />
            </svg>
          </a>
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
