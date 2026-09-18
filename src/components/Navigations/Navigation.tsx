import { useEffect, useState } from "react";
import { dict } from "../../utils/i18n";
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitch from "../LanguageSwitch";
import NayBeGlobalLogo from "../Icons/NayBeGlobalLogo";

const Navigation: React.FC = () => {
  const { lang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: dict.nav.about[lang], href: "#tentang" },
    { label: dict.nav.program[lang], href: "#katalog" },
    { label: dict.nav.gallery[lang], href: "#galeri" },
    { label: dict.nav.contact[lang], href: "#proposal" },
  ];

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/90 shadow-[0_1px_0_rgba(43,16,63,0.1)] backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[76px] max-w-[100rem] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a href="#top" aria-label="NayBe Global home">
          <NayBeGlobalLogo className="h-10" variant="light" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-800/65 transition-colors hover:text-primary-300">
              {link.label}
            </a>
          ))}
          <LanguageSwitch compact />
          <a href="#proposal" className="rounded-full bg-primary-300 px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-primary-700">
            {dict.nav.cta[lang]}
          </a>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch compact />
          <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-800/15 text-primary-800" aria-label={open ? "Close menu" : "Open menu"}>
            <span className="text-lg">{open ? "×" : "≡"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-primary-800/10 bg-cream px-6 py-5 lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[100rem] flex-col gap-1">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-primary-800/10 py-4 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-primary-800/70">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
