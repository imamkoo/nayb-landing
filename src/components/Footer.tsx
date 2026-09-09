import React from "react";
import { Link } from "@tanstack/react-router";
import { footerCols, footerSocials } from "../utils/content";
import NayBGlobalLogo from "./Icons/NayBGlobalLogo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#10031a] border-t border-white/10 pt-20 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3">
              <NayBGlobalLogo className="h-10 sm:h-12" variant="dark" />
            </Link>
            <p className="mt-6 max-w-xs font-sans text-sm font-light text-white/60 leading-relaxed">
              Platform manajemen perjalanan edukasi & pertukaran pelajar terpercaya untuk sekolah-sekolah di Indonesia dan mancanegara.
            </p>
            <div className="mt-8 flex gap-4">
              {footerSocials.map((social) => (
                <a key={social.id} href={social.href} aria-label={social.alt}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-[#E3007B] hover:border-[#E3007B]">
                  <social.Icon className="h-4 w-4 fill-white" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerCols.map((col) => (
              <div key={col.id}>
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#E3007B] mb-6">
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

        <div className="mt-20 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            &copy; {new Date().getFullYear()} NAY-B GLOBAL. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
