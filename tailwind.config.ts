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
      },
      fontFamily: {
        display: ["ClashDisplay", "Sora", "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "JetBrains Mono", "monospace"],
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
