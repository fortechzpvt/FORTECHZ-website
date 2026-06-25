/**
 * Renders two oversized display words ("FOR" + "TECHZ") as an ultra-low-opacity
 * background canvas texture. Aria-hidden — purely decorative. Not pointer-interactive.
 */
export default function BackgroundTypography() {
  return (
    <div
      className="absolute inset-0 z-0 flex flex-col justify-between overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Top word — left-anchored, bleeds slightly off-canvas for drama */}
      <div
        className="font-display font-bold text-ink uppercase leading-none tracking-[-0.06em]"
        style={{
          fontSize: "clamp(8rem, 43vw, 52rem)",
          opacity: 0.045,
          marginLeft: "-0.03em",
          lineHeight: 0.82,
          willChange: "transform",
        }}
      >
        FOR
      </div>

      {/* Bottom word — right-anchored, offset for asymmetric tension */}
      <div
        className="font-display font-bold text-ink uppercase leading-none tracking-[-0.06em] text-right"
        style={{
          fontSize: "clamp(8rem, 43vw, 52rem)",
          opacity: 0.045,
          marginRight: "-0.03em",
          lineHeight: 0.82,
          willChange: "transform",
        }}
      >
        TECHZ
      </div>
    </div>
  );
}
