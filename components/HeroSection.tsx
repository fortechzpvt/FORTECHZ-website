"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import BackgroundTypography from "./BackgroundTypography";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import SiteFooter from "./SiteFooter";

const WebGLScene = dynamic(() => import("./WebGLScene"), {
  ssr: false,
  loading: () => null,
});

class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}

export default function HeroSection() {
  const scrollProgress = useScrollProgress();

  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-canvas"
      aria-label="Hero — Fortechz elite digital infrastructure"
    >
      {/* Layer 0: Background Display Typography */}
      <BackgroundTypography />

      {/* Structural grid lines */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden lg:block" aria-hidden="true">
        <div className="absolute top-0 bottom-0 left-[41.66%] w-[1px] bg-ink/[0.05]" />
        <div className="absolute top-0 bottom-0 left-[75%] w-[1px] bg-ink/[0.05]" />
        <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-ink/[0.04]" />
      </div>

      {/* Corner registration marks */}
      <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
        {/* Top-left */}
        <div className="absolute top-16 left-4 w-5 h-5 border-t border-l border-ink/[0.18]" />
        {/* Top-right */}
        <div className="absolute top-16 right-4 w-5 h-5 border-t border-r border-ink/[0.18]" />
        {/* Bottom-left */}
        <div className="absolute bottom-12 left-4 w-5 h-5 border-b border-l border-ink/[0.18]" />
        {/* Bottom-right */}
        <div className="absolute bottom-12 right-4 w-5 h-5 border-b border-r border-ink/[0.18]" />
      </div>

      {/* Vertical coordinate labels */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-2" aria-hidden="true">
        <div className="w-[1px] h-16 bg-ink/10" />
        <span
          className="font-mono text-ink/20 tracking-[0.3em] uppercase"
          style={{ fontSize: "0.45rem", writingMode: "vertical-rl" }}
        >
          00°N · 00°E
        </span>
        <div className="w-[1px] h-16 bg-ink/10" />
      </div>

      {/* Vertical scroll hint — right side */}
      <div className="absolute right-4 bottom-20 z-20 pointer-events-none hidden lg:flex flex-col items-center gap-2" aria-hidden="true">
        <span
          className="font-mono text-ink/25 tracking-[0.35em] uppercase"
          style={{ fontSize: "0.45rem", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-ink/15" />
      </div>

      {/* Layer 1: WebGL Interactive Model */}
      <div className="absolute inset-0 z-10" aria-hidden="true">
        <WebGLErrorBoundary>
          <WebGLScene scrollProgress={scrollProgress} />
        </WebGLErrorBoundary>
      </div>

      {/* Layer 2: Foreground UI — 12-column asymmetric grid */}
      <div className="absolute inset-0 z-20 grid grid-cols-12 gap-4 px-6 md:px-10 pointer-events-none">
        <div className="col-span-12 md:col-span-5 pointer-events-auto">
          <LeftPanel />
        </div>
        <div className="hidden md:block md:col-span-4" />
        <div className="hidden md:block md:col-span-3 pointer-events-auto">
          <RightPanel />
        </div>
      </div>

      {/* Layer 2: Footer Status Bar */}
      <SiteFooter />
    </section>
  );
}
