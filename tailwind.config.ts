import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--canvas-rgb) / <alpha-value>)",
        ink:    "rgb(var(--ink-rgb)    / <alpha-value>)",
        muted:  "rgb(var(--muted-rgb)  / <alpha-value>)",
        line:   "rgb(var(--line-rgb)   / <alpha-value>)",
        accent: "#0C7EFF",
        // POS demo theme tokens, set per-session by components/PosDemo.tsx
        pos:     "rgb(var(--pos-fg)    / <alpha-value>)",
        posbg:   "rgb(var(--pos-bg)    / <alpha-value>)",
        poscard: "rgb(var(--pos-card)  / <alpha-value>)",
        posinset:"rgb(var(--pos-inset) / <alpha-value>)",
        posside: "rgb(var(--pos-side)  / <alpha-value>)",
        acc: {
          300: "rgb(var(--acc-300) / <alpha-value>)",
          400: "rgb(var(--acc-400) / <alpha-value>)",
          500: "rgb(var(--acc-500) / <alpha-value>)",
          600: "rgb(var(--acc-600) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ['var(--font-poppins)', '"Poppins"', "system-ui", "sans-serif"],
        mono: ['var(--font-poppins)', '"Poppins"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        display: "-0.05em",
        ui: "0.02em",
        wide: "0.15em",
        widest: "0.22em",
      },
      lineHeight: {
        tight: "0.88",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll-line": "scroll-line 1.8s ease-in-out infinite",
      },
      keyframes: {
        "scroll-line": {
          "0%, 100%": { height: "8px", opacity: "0.25" },
          "50%": { height: "22px", opacity: "0.75" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
