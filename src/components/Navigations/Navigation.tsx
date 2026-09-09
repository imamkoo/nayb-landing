import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { navigationLinks } from "../../utils/content";

const Navigation: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (overlay) return null; // hero handles its own nav when overlay=true

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#07090e]/95 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5">
            <span className="font-mono text-xs font-bold text-white">N</span>
          </div>
          <div>
            <p className="font-sans text-sm font-extrabold uppercase tracking-[0.18em] text-white">NayB</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Global</p>
          </div>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navigationLinks.slice(0, 4).map((link) => (
            <li key={link.id}>
              <Link to={link.href}
                className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        <a href="#platform"
          className="hidden rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:bg-white hover:text-[#07090e] lg:block">
          Mulai
        </a>

        <button className="lg:hidden p-2 text-white" aria-label="Menu">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

import React from "react";
export default Navigation;
