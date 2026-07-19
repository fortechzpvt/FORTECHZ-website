"use client";

import { useState, useEffect } from "react";

/**
 * Returns a normalized 0–1 scroll progress value.
 * Used to drive parallax and 3D model tilt offsets.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(window.scrollY / totalScrollable, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
