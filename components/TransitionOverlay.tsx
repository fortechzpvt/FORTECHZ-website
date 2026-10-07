"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["F","O","R","T","E","C","H","Z"];

export default function TransitionOverlay() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setAnimKey((k) => k + 1);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={animKey}
          className="fixed inset-0 z-[300] bg-[#0D0D0D] flex flex-col items-center justify-center overflow-hidden"
          style={{ pointerEvents: "none" }}
          variants={{
            initial: { opacity: 0 },
            // Cover the screen fast, then hold
            animate: { opacity: 1, transition: { duration: 0.12, ease: "linear" } },
            // Wipe upward to reveal the new page
            exit: { y: "-100%", transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] } },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Letter row */}
          <div style={{ perspective: "1200px" }} className="flex items-center">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="font-display font-bold text-[#F0F0F0] inline-block select-none"
                style={{
                  fontSize: "clamp(2.6rem, 11vw, 9rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  transformOrigin: "50% 50%",
                  display: "inline-block",
                }}
                initial={{ opacity: 0, rotateX: 90, y: 24 }}
                animate={{
                  opacity: 1,
                  rotateX: 0,
                  y: 0,
                  transition: {
                    delay: 0.15 + i * 0.045,
                    duration: 0.48,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -16,
                  transition: { delay: i * 0.02, duration: 0.2, ease: "easeIn" },
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Orange accent line */}
          <motion.div
            className="mt-5 h-[2px] bg-[#FF5C00]"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: "clamp(120px, 20vw, 300px)",
              opacity: 1,
              transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          />

          {/* Sub-label */}
          <motion.p
            className="mt-3 font-mono text-[#F0F0F0]/30 tracking-[0.3em] uppercase"
            style={{ fontSize: "clamp(0.5rem, 1.2vw, 0.68rem)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.65, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
            }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            Systems
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
