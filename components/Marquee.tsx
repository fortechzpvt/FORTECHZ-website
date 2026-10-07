const ITEMS = [
  "Precision Engineered",
  "Digital Infrastructure",
  "99.99% Uptime",
  "Elite Technology",
  "Custom Software Systems",
  "Performance First",
  "Zero Compromise",
  "Scalable Architecture",
];

function MarqueeContent() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-6 mx-6 flex-shrink-0">
          <span className="font-mono text-xs tracking-[0.22em] text-ink/30 uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="text-accent font-bold text-xs">·</span>
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-b border-ink/[0.07] bg-canvas" aria-hidden="true">
      <div className="flex marquee-track">
        <div className="flex py-2.5 flex-shrink-0">
          <MarqueeContent />
        </div>
        <div className="flex py-2.5 flex-shrink-0" aria-hidden="true">
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}
