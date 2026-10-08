```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";

/**
 * Cute robot mascot.
 * Sneaks up from the bottom/top corners, waves,
 * changes facial expressions, and exits on user scroll interaction.
 *
 * IMPORTANT:
 * The robot is completely hidden while changing corners/orientation.
 * This prevents the 180° top-corner rotation from being visible.
 */

type Eyes = "open" | "blink" | "happy" | "love" | "wink";
type Corner = { v: "bottom" | "top"; h: "right" | "left" };

const CORNERS: readonly Corner[] = [
  { v: "bottom", h: "right" },
  { v: "top", h: "left" },
  { v: "bottom", h: "left" },
  { v: "top", h: "right" },
] as const;

const WAVE_FACES: readonly Eyes[] = [
  "happy",
  "wink",
  "love",
  "happy",
] as const;

const HEADER_PX = 56;
const FIRST_DELAY_MS = 3500;
const REPEAT_EVERY_MS = 30000;

const VB_W = 365;
const VB_H = 420;
const EYE_Y = 112;
const EYE_L = 146;
const EYE_R = 217;
const SHOULDER = "20% 58%";
const EYE_FILL = "#7DF3FF";

interface EyeProps {
  cx: number;
  kind: "open" | "blink" | "happy" | "love";
}

function Eye({ cx, kind }: EyeProps) {
  if (kind === "happy") {
    return (
      <path
        d={`M ${cx - 22} ${EYE_Y + 12} Q ${cx} ${EYE_Y - 26} ${cx + 22} ${
          EYE_Y + 12
        }`}
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
      <ellipse
        cx={cx}
        cy={EYE_Y}
        rx={23}
        ry={ry}
        fill={EYE_FILL}
        className="transition-all duration-150 ease-in-out"
      />

      {kind === "open" && (
        <ellipse
          cx={cx - 7}
          cy={EYE_Y - 10}
          rx={6}
          ry={8}
          fill="#ffffff"
          opacity={0.75}
        />
      )}
    </g>
  );
}

function Face({ eyes }: { eyes: Eyes }) {
  const left = eyes === "wink" ? "open" : eyes;
  const right = eyes === "wink" ? "happy" : eyes;

  const showCheeks =
    eyes === "happy" ||
    eyes === "love" ||
    eyes === "wink";

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className="absolute inset-0 h-full w-full pointer-events-none select-none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="eyeGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <Eye
        cx={EYE_L}
        kind={left as "open" | "blink" | "happy" | "love"}
      />

      <Eye
        cx={EYE_R}
        kind={right as "open" | "blink" | "happy" | "love"}
      />

      <g
        className="transition-opacity duration-250 ease-in-out"
        style={{ opacity: showCheeks ? 0.8 : 0 }}
      >
        <ellipse
          cx={EYE_L - 8}
          cy={146}
          rx={11}
          ry={4.5}
          fill="#FF8FB8"
        />

        <ellipse
          cx={EYE_R + 8}
          cy={146}
          rx={11}
          ry={4.5}
          fill="#FF8FB8"
        />
      </g>
    </svg>
  );
}

export default function RobotPeek() {
  const prefersReducedMotion = useReducedMotion();

  const [corner, setCorner] = useState<Corner>(CORNERS[0]);
  const [eyes, setEyes] = useState<Eyes>("open");

  // Controls whether the robot can be visually seen.
  // FALSE = completely hidden while changing orientation/corner.
  const [isReady, setIsReady] = useState(false);

  // Explicit element references
  const botRef = useRef<HTMLDivElement | null>(null);
  const armRef = useRef<HTMLImageElement | null>(null);

  // Controller state refs
  const isVisitingRef = useRef(false);
  const isAbortedRef = useRef(false);
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortResolverRef = useRef<(() => void) | null>(null);

  // Keeps the currently active corner available without restarting the effect.
  const activeCornerRef = useRef<Corner>(CORNERS[0]);

  const clearActiveTimer = useCallback(() => {
    if (activeTimerRef.current) {
      clearTimeout(activeTimerRef.current);
      activeTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let isUnmounted = false;
    let visitIndex = 0;

    const wait = (ms: number): Promise<void> => {
      return new Promise((resolve) => {
        clearActiveTimer();

        activeTimerRef.current = setTimeout(resolve, ms);
      });
    };

    const awaitAbortSignal = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        abortResolverRef.current = resolve;
      });
    };

    const runOrAbort = async <T,>(
      task: Promise<T> | T
    ): Promise<T> => {
      const result = await Promise.race([
        Promise.resolve(task),

        awaitAbortSignal().then(() => {
          throw new Error("ABORT_ANIMATION");
        }),
      ]);

      if (isAbortedRef.current || isUnmounted) {
        throw new Error("ABORT_ANIMATION");
      }

      return result as T;
    };

    const triggerEmergencyRetract = () => {
      const botEl = botRef.current;
      const armEl = armRef.current;

      const activeCorner = activeCornerRef.current;
      const isTop = activeCorner.v === "top";

      const targetHiddenY = isTop ? "-115%" : "112%";
      const targetRot = isTop ? 180 : 0;

      if (botEl) {
        animate(
          botEl,
          {
            y: targetHiddenY,
            rotate: targetRot,
          },
          {
            duration: 0.25,
            ease: "easeIn",
          }
        );
      }

      if (armEl) {
        animate(
          armEl,
          {
            rotate: 0,
          },
          {
            duration: 0.2,
          }
        );
      }

      // Once the emergency retract starts, keep the robot hidden.
      setIsReady(false);
    };

    const onScroll = () => {
      if (!isVisitingRef.current || isAbortedRef.current) return;

      isAbortedRef.current = true;

      if (abortResolverRef.current) {
        abortResolverRef.current();
      }

      triggerEmergencyRetract();
    };

    async function blink() {
      if (isUnmounted) return;

      setEyes("blink");

      await wait(140);

      if (!isUnmounted) {
        setEyes("open");
      }
    }

    async function executeVisit() {
      const currentCorner =
        CORNERS[visitIndex % CORNERS.length];

      const currentFace =
        WAVE_FACES[visitIndex % WAVE_FACES.length];

      visitIndex += 1;

      // Store active corner for scroll/emergency handling.
      activeCornerRef.current = currentCorner;

      isAbortedRef.current = false;
      isVisitingRef.current = true;

      const isTop = currentCorner.v === "top";

      const rot = isTop ? 180 : 0;

      const hiddenY = isTop ? "-115%" : "112%";
      const sneakY = isTop ? "-82%" : "78%";
      const shownY = isTop ? "-30%" : "32%";

      try {
        /*
         * ---------------------------------------------------------
         * PHASE 1 — COMPLETELY HIDE ROBOT
         * ---------------------------------------------------------
         *
         * This is the important fix.
         *
         * Before changing from one corner to another:
         *
         * 1. Hide robot with opacity/visibility.
         * 2. Move it to the new corner.
         * 3. Apply the required 180° rotation if it is a top corner.
         *
         * The user sees NONE of these operations.
         */

        setIsReady(false);
        setEyes("open");

        await runOrAbort(wait(60));

        const botEl = botRef.current;
        const armEl = armRef.current;

        if (!botEl || !armEl || isUnmounted) return;

        /*
         * Reset position and orientation while INVISIBLE.
         */
        await animate(
          botEl,
          {
            y: hiddenY,
            rotate: rot,
          },
          {
            duration: 0,
          }
        );

        await animate(
          armEl,
          {
            rotate: 0,
          },
          {
            duration: 0,
          }
        );

        /*
         * Give the browser one frame to apply the hidden
         * position + rotation before making the robot visible.
         */
        await runOrAbort(wait(80));

        /*
         * ---------------------------------------------------------
         * PHASE 2 — NOW MAKE ROBOT VISIBLE
         * ---------------------------------------------------------
         *
         * The robot is already correctly positioned and rotated.
         * Therefore the user can ONLY see the sneak-in animation.
         */

        if (!isUnmounted) {
          setIsReady(true);
        }

        await runOrAbort(wait(40));

        /*
         * ---------------------------------------------------------
         * PHASE 3 — SNEAK IN
         * ---------------------------------------------------------
         */

        await runOrAbort(
          animate(
            botEl,
            {
              y: sneakY,
              rotate: rot,
            },
            {
              duration: 0.9,
              ease: "easeOut",
            }
          )
        );

        if (!isUnmounted) {
          setEyes("open");
        }

        await runOrAbort(wait(350));

        await runOrAbort(blink());

        await runOrAbort(wait(150));

        /*
         * ---------------------------------------------------------
         * PHASE 4 — POP OUT
         * ---------------------------------------------------------
         */

        await runOrAbort(
          animate(
            botEl,
            {
              y: shownY,
              rotate: rot,
            },
            {
              type: "spring",
              stiffness: 120,
              damping: 26,
            }
          )
        );

        await runOrAbort(blink());

        /*
         * ---------------------------------------------------------
         * PHASE 5 — FACIAL EXPRESSION + WAVE
         * ---------------------------------------------------------
         */

        if (!isUnmounted) {
          setEyes(currentFace);
        }

        await runOrAbort(
          animate(
            armEl,
            {
              rotate: 128,
            },
            {
              type: "spring",
              stiffness: 200,
              damping: 14,
            }
          )
        );

        await runOrAbort(
          animate(
            armEl,
            {
              rotate: [128, 152, 126, 152, 126, 140],
            },
            {
              duration: 1.6,
              ease: "easeInOut",
            }
          )
        );

        await runOrAbort(wait(450));

        /*
         * ---------------------------------------------------------
         * PHASE 6 — GOODBYE
         * ---------------------------------------------------------
         */

        animate(
          armEl,
          {
            rotate: 0,
          },
          {
            duration: 0.35,
            ease: "easeOut",
          }
        );

        if (!isUnmounted) {
          setEyes("open");
        }

        await runOrAbort(wait(250));

        await runOrAbort(blink());

        /*
         * Robot retracts completely.
         */
        await runOrAbort(
          animate(
            botEl,
            {
              y: hiddenY,
              rotate: rot,
            },
            {
              duration: 0.6,
              ease: [0.5, 0, 0.75, 0],
            }
          )
        );

        /*
         * Hide it after it has completely disappeared.
         */
        if (!isUnmounted) {
          setIsReady(false);
        }
      } catch (err) {
        /*
         * Animation was aborted because of:
         * - user scrolling
         * - component unmount
         */
      } finally {
        isVisitingRef.current = false;

        if (!isUnmounted) {
          setEyes("open");
        }
      }
    }

    async function startLoop() {
      await wait(FIRST_DELAY_MS);

      while (!isUnmounted) {
        if (!document.hidden) {
          await executeVisit();
        }

        if (isUnmounted) return;

        await wait(REPEAT_EVERY_MS);
      }
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    startLoop();

    return () => {
      isUnmounted = true;

      clearActiveTimer();

      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion, clearActiveTimer]);

  if (prefersReducedMotion) return null;

  const isTop = corner.v === "top";

  const positionStyle: React.CSSProperties = {
    width: "clamp(55px, 10vw, 109px)",

    ...(isTop
      ? {
          top: `calc(${HEADER_PX}px + env(safe-area-inset-top, 0px))`,
          clipPath: "inset(0 -120px -120% -120px)",
        }
      : {
          bottom: 0,
        }),

    ...(corner.h === "right"
      ? {
          right:
            "max(0.75rem, env(safe-area-inset-right, 0px))",
        }
      : {
          left:
            "max(0.75rem, env(safe-area-inset-left, 0px))",
        }),
  };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 select-none"
      style={{
        ...positionStyle,

        /*
         * CRITICAL:
         *
         * While changing corners/orientation, the entire robot
         * is invisible.
         *
         * This prevents the user from seeing:
         * - the 180° top rotation
         * - position changes
         * - orientation changes
         * - reset animations
         */
        opacity: isReady ? 1 : 0,

        /*
         * Opacity transition is disabled so there is no
         * visible fade during the orientation change.
         */
        transition: "none",
      }}
    >
      <div
        ref={botRef}
        className="relative will-change-transform"
        style={{
          aspectRatio: `${VB_W} / ${VB_H}`,

          /*
           * Initial transform only.
           * Framer Motion takes control during the animation.
           */
          transform: `translateY(${
            isTop ? "-115%" : "112%"
          }) rotate(${isTop ? 180 : 0}deg)`,

          transformOrigin: isTop
            ? "50% 50%"
            : "50% 100%",

          filter:
            "drop-shadow(0 8px 14px rgba(12,126,255,0.35))",
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
          ref={armRef}
          src="/robot-arm.png"
          alt=""
          width={VB_W}
          height={VB_H}
          decoding="async"
          draggable={false}
          className="absolute inset-0 h-full w-full will-change-transform"
          style={{
            transformOrigin: SHOULDER,
          }}
        />
      </div>
    </div>
  );
}
```
