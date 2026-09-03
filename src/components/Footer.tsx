import React from "react";
import { footerCols, footerSocials } from "../utils/content";
import NayBGlobalLogo from "./Icons/NayBGlobalLogo";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 px-4 pt-16 pb-10 sm:px-6 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 text-white lg:flex-row">
        <div className="flex max-w-md flex-col gap-4">
          <NayBGlobalLogo className="h-12" variant="dark" />
          <div>
            <p className="mb-3 text-lg font-semibold">
              Your Future Starts
            </p>
            <p className="mb-6 text-sm font-light leading-relaxed text-white/80">
              NAY-B GLOBAL creates study adventures you’ll never forget. Choose your
              dream destination, and we’ll handle everything for a stress-free
              global experience.
            </p>
            <ul className="flex gap-5">
              {footerSocials.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" aria-label={social.alt} className="transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded">
                    <social.Icon className="fill-white" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:gap-12">
          {footerCols.map((col) => (
            <li key={col.id}>
              <p className="mb-4 text-base font-semibold">{col.heading}</p>
              <ul className="flex flex-col gap-y-2.5">
                {col.links.map((link) => (
                  <li key={link.id} className="flex items-center gap-x-2">
                    {link.Icon && (
                      <link.Icon className="block h-5 w-5 fill-white" />
                    )}
                    <a
                      className="text-sm font-normal text-white/80 hover:text-white transition-colors"
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
