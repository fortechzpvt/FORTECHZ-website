"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

function FortechzLogoMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <polygon points="15,1.5 27.5,8.25 27.5,21.75 15,28.5 2.5,21.75 2.5,8.25"
        stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round" />
      <line x1="15" y1="1.5" x2="15" y2="28.5" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="2.5" y1="8.25" x2="27.5" y2="21.75" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <line x1="27.5" y1="8.25" x2="2.5" y2="21.75" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <text x="15" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor"
        fontFamily="ClashDisplay, system-ui, sans-serif" letterSpacing="-0.05em">F</text>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6.5 1v1.2M6.5 10.8V12M1 6.5h1.2M10.8 6.5H12M2.75 2.75l.85.85M9.4 9.4l.85.85M9.4 2.75l-.85.85M3.6 9.4l-.85.85"
        stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M10.5 7.5A5 5 0 0 1 5.5 2.5a5 5 0 1 0 5 5z"
        stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

const navItems = [
  { label: "Work",     href: "/work"     },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about"    },
  { label: "Contact",  href: "/contact"  },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  // mounted guards against SSR/hydration mismatch on the toggle button
  const [mounted, setMounted]    = useState(false);
  const [isDark, setIsDark]      = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    // Read theme preference from localStorage
    const saved = localStorage.getItem("ftchz-theme");
    const dark = saved ? saved === "dark" : true; // default to dark (black-blue theme)
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("ftchz-theme", next ? "dark" : "light");
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-canvas/90 backdrop-blur-md border-b border-ink/10"
            : "bg-canvas/70 backdrop-blur-sm"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-ink anim-left" style={{ animationDelay: "0.05s" }}>
            <FortechzLogoMark />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-ink text-[0.85rem] tracking-[-0.04em] uppercase">
                Fortechz
              </span>
              <span className="font-mono text-[0.5rem] text-ink/45 tracking-[0.18em] uppercase mt-0.5">
                · Systems
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 ml-3 px-2 py-1 border border-ink/10 rounded-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span className="font-mono text-[0.5rem] text-ink/40 tracking-[0.15em] uppercase">Operational</span>
            </div>
          </Link>

          {/* Desktop nav + theme toggle + hamburger */}
          <div className="flex items-center gap-5 anim-right" style={{ animationDelay: "0.05s" }}>
            <nav className="hidden md:flex items-center gap-7" aria-label="Primary navigation">
              {navItems.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`font-mono text-[0.62rem] tracking-[0.14em] uppercase transition-colors duration-200 ${
                    pathname === href ? "text-ink" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            {/* Theme toggle — only render after mount to avoid hydration mismatch */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to bright mode" : "Switch to dark mode"}
                className="flex items-center gap-1.5 px-2.5 py-1.5 border border-ink/15
                           hover:border-accent/60 text-ink/50 hover:text-accent
                           transition-all duration-200 rounded-sm"
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
                <span className="font-mono text-[0.52rem] tracking-[0.14em] uppercase hidden sm:inline">
                  {isDark ? "Bright" : "Dark"}
                </span>
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className={`block h-[1.5px] bg-ink origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.25px] w-5" : "w-5"}`} />
              <span className={`block h-[1.5px] bg-ink transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.25px] w-5" : "w-3.5 ml-auto"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-canvas/97 backdrop-blur-lg flex flex-col justify-between px-6 pt-20 pb-10"
          >
            <nav aria-label="Mobile navigation">
              <ul className="space-y-5">
                {navItems.map(({ label, href }, i) => (
                  <motion.li
                    key={label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={href}
                      className={`font-display font-bold text-4xl tracking-[-0.04em] uppercase transition-colors duration-200 ${
                        pathname === href ? "text-ink" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center justify-between">
              <div className="font-mono text-[0.6rem] text-ink/30 tracking-[0.18em] uppercase">
                Fortechz Systems — Est. 2024
              </div>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-1.5 border border-ink/15
                             hover:border-accent text-ink/40 hover:text-ink transition-colors duration-200"
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                  <span className="font-mono text-[0.55rem] tracking-[0.14em] uppercase">
                    {isDark ? "Bright mode" : "Dark mode"}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

