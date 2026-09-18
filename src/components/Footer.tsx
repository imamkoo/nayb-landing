import React from "react";
import { footerCols, footerSocials } from "../utils/content";
import NayBeGlobalLogo from "./Icons/NayBeGlobalLogo";

const Footer: React.FC = () => (
  <footer className="relative overflow-hidden border-t border-primary-800/10 bg-sand px-6 pb-8 pt-20 text-primary-800 sm:px-10 lg:px-16">
    <div className="mx-auto max-w-[100rem]">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
        <div>
          <NayBeGlobalLogo className="h-12" variant="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-800/60">
            Education tour sejak 2017. Kami membantu sekolah Indonesia merancang perjalanan belajar yang aman, nyaman, dan berkesan.
          </p>
          <div className="mt-7 flex gap-3">
            {footerSocials.map((social) => (
              <a key={social.id} href={social.href} aria-label={social.alt} className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-800/15 text-primary-700 transition hover:border-primary-300 hover:bg-primary-300 hover:text-white">
                <social.Icon className="h-4 w-4 fill-current" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerCols.slice(0, 3).map((column) => (
            <div key={column.id}>
              <h2 className="eyebrow mb-5 text-primary-300">{column.heading}</h2>
              <ul className="space-y-3">
                {column.links.map((link) => <li key={link.id}><a href={link.href} className="text-sm text-primary-800/60 transition hover:text-primary-300">{link.name}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-3 border-t border-primary-800/10 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} NayBe Global Indonesia</span>
        <span>Safe journeys · Open worlds</span>
      </div>
    </div>
  </footer>
);

export default Footer;
