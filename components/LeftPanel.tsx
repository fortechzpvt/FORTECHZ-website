"use client";

export default function LeftPanel() {
  return (
    <div className="flex flex-col justify-between h-full pt-20 pb-16">
      {/* Slide Index Counter */}
      <div
        className="flex items-center gap-3 anim-up"
        style={{ animationDelay: "0.1s" }}
        aria-label="Slide 1 of 4"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-ink/70 uppercase">01</span>
        <div className="w-7 h-[1px] bg-ink/25" />
        <span className="font-mono text-xs tracking-[0.2em] text-ink/25 uppercase">04</span>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Display Headline */}
        <div className="anim-up" style={{ animationDelay: "0.22s" }}>
          <h1
            className="font-display font-bold text-ink uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.2rem)" }}
          >
            Architecting
            <br />
            <span className="text-accent/60">Digital</span>
            <br />
            Elite
            <br />
            Infrastructure
          </h1>
        </div>

        {/* Glassmorphic Play CTA */}
        <div className="anim-up" style={{ animationDelay: "0.38s" }}>
          <button
            type="button"
            className="group flex items-center gap-3.5 pl-1.5 pr-5 py-1.5
                       border border-accent/20 rounded-full
                       backdrop-blur-sm bg-accent/5
                       hover:bg-accent/15 hover:border-accent/40
                       transition-all duration-300 cursor-pointer"
            aria-label="Watch Fortechz case study reel"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
                <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" fill="#EEF5FF" />
              </svg>
            </div>
            <span className="font-mono text-xs tracking-[0.14em] text-ink uppercase">
              View Case Study
            </span>
            <div className="w-3 h-[1px] bg-accent/40 group-hover:w-6 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="w-10 h-[2px] bg-accent anim-up"
        style={{ animationDelay: "0.5s" }}
        aria-hidden="true"
      />
    </div>
  );
}
"use client";

export default function LeftPanel() {
  return (
    <div className="flex flex-col justify-between h-full pt-20 pb-16">
      {/* Slide Index Counter */}
      <div
        className="flex items-center gap-3 anim-up"
        style={{ animationDelay: "0.1s" }}
        aria-label="Slide 1 of 4"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-ink/70 uppercase">01</span>
        <div className="w-7 h-[1px] bg-ink/25" />
        <span className="font-mono text-xs tracking-[0.2em] text-ink/25 uppercase">04</span>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Display Headline */}
        <div className="anim-up" style={{ animationDelay: "0.22s" }}>
          <h1
            className="font-display font-bold text-ink uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.2rem)" }}
          >
            Architecting
            <br />
            <span className="text-accent/60">Digital</span>
            <br />
            Elite
            <br />
            Infrastructure
          </h1>
        </div>

        {/* Glassmorphic Play CTA */}
        <div className="anim-up" style={{ animationDelay: "0.38s" }}>
          <button
            type="button"
            className="group flex items-center gap-3.5 pl-1.5 pr-5 py-1.5
                       border border-accent/20 rounded-full
                       backdrop-blur-sm bg-accent/5
                       hover:bg-accent/15 hover:border-accent/40
                       transition-all duration-300 cursor-pointer"
            aria-label="Watch Fortechz case study reel"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
                <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" fill="#EEF5FF" />
              </svg>
            </div>
            <span className="font-mono text-xs tracking-[0.14em] text-ink uppercase">
              View Case Study
            </span>
            <div className="w-3 h-[1px] bg-accent/40 group-hover:w-6 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="w-10 h-[2px] bg-accent anim-up"
        style={{ animationDelay: "0.5s" }}
        aria-hidden="true"
      />
    </div>
  );
}
"use client";

export default function LeftPanel() {
  return (
    <div className="flex flex-col justify-between h-full pt-20 pb-16">
      {/* Slide Index Counter */}
      <div
        className="flex items-center gap-3 anim-up"
        style={{ animationDelay: "0.1s" }}
        aria-label="Slide 1 of 4"
      >
        <span className="font-mono text-xs tracking-[0.2em] text-ink/70 uppercase">01</span>
        <div className="w-7 h-[1px] bg-ink/25" />
        <span className="font-mono text-xs tracking-[0.2em] text-ink/25 uppercase">04</span>
      </div>

      {/* Main Content */}
      <div className="space-y-10">
        {/* Display Headline */}
        <div className="anim-up" style={{ animationDelay: "0.22s" }}>
          <h1
            className="font-display font-bold text-ink uppercase leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 4.2rem)" }}
          >
            Architecting
            <br />
            <span className="text-accent/60">Digital</span>
            <br />
            <span className="text-ink">Elite</span>
            <br />
            Infrastructure
          </h1>
        </div>

        {/* Glassmorphic Play CTA */}
        <div className="anim-up" style={{ animationDelay: "0.38s" }}>
          <button
            type="button"
            className="group flex items-center gap-3.5 pl-1.5 pr-5 py-1.5
                       border border-accent/20 rounded-full
                       backdrop-blur-sm bg-accent/5
                       hover:bg-accent/15 hover:border-accent/40
                       transition-all duration-300 cursor-pointer"
            aria-label="Watch Fortechz case study reel"
          >
            <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
              <svg width="9" height="10" viewBox="0 0 9 10" fill="none" aria-hidden="true">
                <path d="M1.5 1.5L7.5 5L1.5 8.5V1.5Z" fill="#EEF5FF" />
              </svg>
            </div>
            <span className="font-mono text-xs tracking-[0.14em] text-ink uppercase">
              View Case Study
            </span>
            <div className="w-3 h-[1px] bg-accent/40 group-hover:w-6 transition-all duration-300" />
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="w-10 h-[2px] bg-accent anim-up"
        style={{ animationDelay: "0.5s" }}
        aria-hidden="true"
      />
    </div>
  );
}
