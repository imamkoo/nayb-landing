import { Link } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { navigationLinks } from "../../utils/content";
import { Button } from "../ui/button";

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}>
      <div className="m-auto max-w-[108rem] px-4 pt-4 pb-3 sm:px-6 lg:px-12">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group focus-visible:outline-none">
            {/* Placeholder Logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-700 to-primary-300 text-white font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
              N
            </div>
            <span className="text-2xl font-bold text-primary-800">
              NayBe
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <Link
                  className="text-sm font-medium text-slate-600 hover:text-primary-700 transition-colors relative group"
                  to={link.href}
                >
                  {link.text}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary-300 transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-primary-800/15 text-primary-800 hover:bg-primary-100">Sign In</Button>
            <Button size="sm">Join Now</Button>
          </div>

          {/* Mobile Menu Placeholder */}
          <button className="lg:hidden p-2 text-primary-700 hover:bg-primary-100 rounded-lg transition-colors" aria-label="Open menu">
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
