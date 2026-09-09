import React from "react";
import { Link } from "@tanstack/react-router";
import { footerCols, footerSocials } from "../utils/content";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07090e] border-t border-white/[0.06] pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                <span className="font-mono text-xs font-bold text-white">N</span>
              </div>
              <div>
                <p className="font-sans text-sm font-extrabold uppercase tracking-[0.18em] text-white">NayB</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Global</p>
              </div>
            </Link>
            <p className="mt-6 max-w-xs font-sans text-sm font-light text-white/50">
              Platform manajemen perjalanan edukasi & pertukaran pelajar yang andal.
            </p>
            <div className="mt-8 flex gap-4">
              {footerSocials.map((social) => (
                <a key={social.id} href={social.href} aria-label={social.alt}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/15">
                  <social.Icon className="h-4 w-4 fill-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerCols.map((col) => (
              <div key={col.id}>
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-6">
                  {col.heading}
                </h4>
                <ul className="flex flex-col gap-4">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="font-sans text-sm font-light text-white/70 transition hover:text-white flex items-center gap-3">
                        {link.Icon && <link.Icon className="h-4 w-4 shrink-0 fill-white/40" />}
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            &copy; {new Date().getFullYear()} NAY-B GLOBAL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
