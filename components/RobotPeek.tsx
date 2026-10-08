"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";

const FIRST_DELAY_MS = 4000;
const REPEAT_EVERY_MS = 22000;

/**
 * A small robot that peeks up from a bottom corner, waves, then ducks back
 * down. Alternates between the right and left corner on each visit.
 * Decorative only: ignores pointer events and is hidden from assistive tech.
 */
export default function RobotPeek() {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const [side, setSide] = useState<"right" | "left">("right");
  const sideRef = useRef<"right" | "left">("right");

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let timer: number | undefined;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });

    async function visit() {
      if (cancelled || !scope.current) return;
      const lean = sideRef.current === "right" ? -10 : 10;
      const spring = { type: "spring", stiffness: 140, damping: 14 } as const;

      // Start hidden below the viewport edge, leaning toward the page.
      await animate(scope.current, { y: "110%", rotate: lean }, { duration: 0 });
      // Peek up
      await animate(scope.current, { y: "12%", rotate: lean }, spring);
      // Wave: tilt side to side
      await animate(
        scope.current,
        { rotate: [lean, lean * -0.9, lean * 0.9, lean * -0.9, lean * 0.6, 0] },
        { duration: 1.5, ease: "easeInOut" }
      );
      await wait(500);
      // Duck back down
      await animate(scope.current, { y: "115%", rotate: lean }, { duration: 0.55, ease: [0.5, 0, 0.75, 0] });
    }

    async function loop() {
      await wait(FIRST_DELAY_MS);
      while (!cancelled) {
        await visit();
        if (cancelled) return;
        sideRef.current = sideRef.current === "right" ? "left" : "right";
        setSide(sideRef.current);
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

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed bottom-0 z-30 w-[72px] sm:w-[92px] overflow-visible ${
        side === "right" ? "right-3 sm:right-8" : "left-3 sm:left-8"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={scope}
        src="/robot.png"
        alt=""
        width={365}
        height={420}
        decoding="async"
        draggable={false}
        className="block w-full h-auto select-none translate-y-[110%] drop-shadow-[0_8px_14px_rgba(12,126,255,0.35)]"
        style={{ transformOrigin: "50% 100%" }}
      />
    </div>
  );
}
