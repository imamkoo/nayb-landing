import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { navigationLinks } from "../../utils/content";
import { Button } from "../ui/button";
import NayBGlobalLogo from "../Icons/NayBGlobalLogo";

const Navigation: React.FC<{ overlay?: boolean }> = ({ overlay = false }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // overlay = tampil di atas hero full-bleed: teks putih saat di puncak, kaca putih setelah scroll
  const light = overlay && !scrolled;

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}>
      <div className="m-auto max-w-[108rem] px-4 pt-4 pb-3 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center group focus-visible:outline-none">
            <NayBGlobalLogo className="h-10 sm:h-12" variant={light ? "dark" : "light"} />
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <Link
                  className={`text-sm font-medium transition-colors relative group ${light ? "text-white/85 hover:text-white" : "text-slate-600 hover:text-primary-700"}`}
                  to={link.href}
                >
                  {link.text}
                  <span className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full ${light ? "bg-white/80" : "bg-primary-300"}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className={light ? "border-white/40 bg-white/5 text-white hover:bg-white/15 hover:text-white" : "border-primary-800/15 text-primary-800 hover:bg-primary-100"}>Sign In</Button>
            <Button size="sm">Join Now</Button>
          </div>

          {/* Mobile Menu Placeholder */}
          <button className={`lg:hidden p-2 rounded-lg transition-colors ${light ? "text-white hover:bg-white/15" : "text-primary-700 hover:bg-primary-100"}`} aria-label="Open menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
