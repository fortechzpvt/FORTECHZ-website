"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";

/**
 * Cute robot mascot. Visits the four corners in turn: it pops up from the
 * bottom corners and drops in from under the header at the top corners, waves
 * with one arm, changes its facial expression, then leaves again.
 * Decorative only: ignores pointer events and is hidden from assistive tech.
 */

type Eyes = "open" | "blink" | "happy" | "love" | "wink";
type Corner = { v: "bottom" | "top"; h: "right" | "left" };

// Order of visits.
const CORNERS: Corner[] = [
  { v: "bottom", h: "right" },
  { v: "top", h: "left" },
  { v: "bottom", h: "left" },
  { v: "top", h: "right" },
];

// Expression used while waving, per visit.
const WAVE_FACES: Eyes[] = ["happy", "wink", "love", "happy"];

const FIRST_DELAY_MS = 3500;
const REPEAT_EVERY_MS = 30000;
const HEADER_PX = 56; // matches h-14 header

// Geometry of the artwork (365 x 420 canvas)
const VB_W = 365;
const VB_H = 420;
const EYE_Y = 112;
const EYE_L = 146;
const EYE_R = 217;
const SHOULDER = "20% 58%"; // pivot of the waving arm

const EYE_FILL = "#7DF3FF";

function Eye({ cx, kind }: { cx: number; kind: "open" | "blink" | "happy" | "love" }) {
  const common = { style: { transition: "all 0.15s ease" } };
  if (kind === "happy") {
    return (
      <path
        d={`M ${cx - 22} ${EYE_Y + 12} Q ${cx} ${EYE_Y - 26} ${cx + 22} ${EYE_Y + 12}`}
        fill="none"
        stroke={EYE_FILL}
        strokeWidth={10}
        strokeLinecap="round"
        filter="url(#eyeGlow)"
      />
    );
  }
  if (kind === "love") {
    return (
      <path
        transform={`translate(${cx} ${EYE_Y + 2}) scale(1.25)`}
        d="M0 22 C -34 -2 -18 -26 0 -10 C 18 -26 34 -2 0 22 Z"
        fill="#FF7FB0"
        filter="url(#eyeGlow)"
      />
    );
  }
  const ry = kind === "blink" ? 3 : 27;
  return (
    <g filter="url(#eyeGlow)">
      <ellipse cx={cx} cy={EYE_Y} rx={23} ry={ry} fill={EYE_FILL} {...common} />
      {kind === "open" && <ellipse cx={cx - 7} cy={EYE_Y - 10} rx={6} ry={8} fill="#fff" opacity={0.75} />}
    </g>
  );
}

function Face({ eyes }: { eyes: Eyes }) {
  const left = eyes === "wink" ? "open" : eyes;
  const right = eyes === "wink" ? "happy" : eyes;
  const cheeks = eyes === "happy" || eyes === "love" || eyes === "wink";
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <Eye cx={EYE_L} kind={left as "open" | "blink" | "happy" | "love"} />
      <Eye cx={EYE_R} kind={right as "open" | "blink" | "happy" | "love"} />
      <g style={{ opacity: cheeks ? 0.8 : 0, transition: "opacity 0.25s ease" }}>
        <ellipse cx={EYE_L - 8} cy={146} rx={11} ry={4.5} fill="#FF8FB8" />
        <ellipse cx={EYE_R + 8} cy={146} rx={11} ry={4.5} fill="#FF8FB8" />
      </g>
    </svg>
  );
}

export default function RobotPeek() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const [corner, setCorner] = useState<Corner>(CORNERS[0]);
  const [eyes, setEyes] = useState<Eyes>("open");

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let timer: number | undefined;
    let visitIndex = 0;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    const body = () => scope.current?.querySelector("[data-bot]") as HTMLElement | null;
    const arm = () => scope.current?.querySelector("[data-arm]") as HTMLElement | null;
    const spring = { type: "spring", stiffness: 120, damping: 26 } as const; // no overshoot

    async function blink() {
      setEyes("blink");
      await wait(140);
      setEyes("open");
    }

    async function visit() {
      const c = CORNERS[visitIndex % CORNERS.length];
      const face = WAVE_FACES[visitIndex % WAVE_FACES.length];
      visitIndex += 1;
      setCorner(c);
      setEyes("open");
      await wait(60); // let the corner position apply
      const b = body();
      const a = arm();
      if (cancelled || !b || !a) return;

      const top = c.v === "top";
      // Top corners: hang upside down from under the header.
      const rot = top ? 180 : 0; // no sideways tilt, so it never looks like it is sliding
      const hidden = top ? "-115%" : "112%";
      const sneak = top ? "-82%" : "78%"; // first, cautious look
      const shown = top ? "-30%" : "32%"; // then a proper peek

      await animate(b, { y: hidden, rotate: rot }, { duration: 0 });
      await animate(a, { rotate: 0 }, { duration: 0 });

      // Sneak in slowly, look around, then pop out further.
      await animate(b, { y: sneak, rotate: rot }, { duration: 0.9, ease: "easeOut" });
      setEyes("open");
      await wait(350);
      await blink();
      await wait(150);
      await animate(b, { y: shown, rotate: rot }, spring);
      await blink();
      if (cancelled) return;

      // Wave with a happy face.
      setEyes(face);
      await animate(a, { rotate: 128 }, { type: "spring", stiffness: 200, damping: 14 });
      await animate(
        a,
        { rotate: [128, 152, 126, 152, 126, 140] },
        { duration: 1.6, ease: "easeInOut" }
      );
      await wait(450);

      // Bye: lower the arm, blink, leave.
      animate(a, { rotate: 0 }, { duration: 0.35, ease: "easeOut" });
      setEyes("open");
      await wait(250);
      await blink();
      await animate(
        b,
        { y: hidden, rotate: rot },
        { duration: 0.6, ease: [0.5, 0, 0.75, 0] }
      );
    }

    async function loop() {
      await wait(FIRST_DELAY_MS);
      while (!cancelled) {
        if (!document.hidden) await visit();
        if (cancelled) return;
        await wait(REPEAT_EVERY_MS);
      }
    }

    loop();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [reduce, animate, scope]);

  if (reduce) return null;

  const top = corner.v === "top";
  const style: React.CSSProperties = {
    width: "clamp(60px, 11vw, 112px)",
    ...(top
      ? {
          top: `calc(${HEADER_PX}px + env(safe-area-inset-top, 0px))`,
          // Hide anything above the header edge so the robot appears from under it.
          clipPath: "inset(0 -120px -120% -120px)",
        }
      : { bottom: 0 }),
    ...(corner.h === "right"
      ? { right: "max(0.75rem, env(safe-area-inset-right, 0px))" }
      : { left: "max(0.75rem, env(safe-area-inset-left, 0px))" }),
  };

  return (
    <div
      ref={scope}
      aria-hidden="true"
      className="pointer-events-none fixed z-30 select-none"
      style={style}
    >
      <div
        data-bot
        className="relative will-change-transform"
        style={{
          aspectRatio: `${VB_W} / ${VB_H}`,
          transform: `translateY(${top ? "-115%" : "112%"}) rotate(${top ? 180 : 0}deg)`,
          transformOrigin: top ? "50% 50%" : "50% 100%",
          filter: "drop-shadow(0 8px 14px rgba(12,126,255,0.35))",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/robot-body.png"
          alt=""
          width={VB_W}
          height={VB_H}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full"
        />
        <Face eyes={eyes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          data-arm
          src="/robot-arm.png"
          alt=""
          width={VB_W}
          height={VB_H}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{ transformOrigin: SHOULDER }}
        />
      </div>
    </div>
  );
}
