import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { navigationLinks } from "../../utils/content";
import NayBeGlobalLogo from "../Icons/NayBeGlobalLogo";
import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navigation: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (overlay) return null; // hero handles its own nav when overlay=true

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1a0728]/95 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-14">
        <Link to="/" className="flex items-center gap-3">
          <NayBeGlobalLogo className="h-10 sm:h-12" variant="dark" />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigationLinks.slice(0, 4).map((link) => (
            <li key={link.id}>
              <Link to={link.href}
                className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a href="#kontak"
            className="rounded-full bg-[#E3007B] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#E3007B]/30 transition hover:bg-[#c73884] active:scale-95">
            Konsultasi
          </a>
        </div>

        <button className="lg:hidden p-2 text-white" aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
