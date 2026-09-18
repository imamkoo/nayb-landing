import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { heroChapters } from "../../utils/content";

const AUTO_MS = 6000;

const Hero: React.FC = () => {
  const reduce = useReducedMotion();
  const { lang } = useLanguage();
  const [idx, setIdx] = useState(0);
  const total = heroChapters.length;

  const go = useCallback((n: number) => setIdx((n + total) % total), [total]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), AUTO_MS);
    return () => clearInterval(t);
  }, [reduce, total]);

  const active = heroChapters[idx];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-cream">
      {/* Layered photo backdrop — NO dark scrim, bright & cheerful */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.id}
          initial={reduce ? false : { opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${active.img}')` }}
          />
          {/* Light wash for text legibility — warm, not dark */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-white/30" />
        </motion.div>
      </AnimatePresence>

      {/* Vertical side label — Kage-style */}
      <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 lg:flex flex-col items-center gap-4 z-20">
        <span className="hair h-16 w-px" />
        <span className="vwrite eyebrow text-primary-700/60">NAYBE GLOBAL · EST 2017</span>
        <span className="hair h-16 w-px" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[100rem] flex-col justify-between px-6 pb-10 pt-28 sm:px-10 lg:px-16">
        <div className="max-w-3xl pt-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5 flex items-center gap-3"
          >
            <span className="chapter-num text-primary-300">{String(idx + 1).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-primary-300/60" />
            {active.tag[lang]}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="display text-[13vw] leading-[0.92] text-primary-800 sm:text-7xl lg:text-8xl"
            >
              {active.title[lang]}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-primary-800/70 sm:text-lg"
          >
            {dict.hero.sub[lang]}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#katalog"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-700/20 transition-all hover:bg-primary-800 active:scale-95"
            >
              {dict.hero.ctaPrimary[lang]}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#galeri"
              className="inline-flex items-center gap-2 rounded-full border border-primary-700/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-primary-700 backdrop-blur-sm transition-all hover:border-primary-700/40 hover:bg-white active:scale-95"
            >
              {dict.hero.ctaSecondary[lang]}
            </a>
          </motion.div>
        </div>

        {/* Chapter chips — Kage bottom index */}
        <div className="mt-10">
          <div className="hair mb-5 w-full" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {heroChapters.map((c, i) => (
              <button
                key={c.id}
                onClick={() => go(i)}
                className="group flex items-start gap-3 text-left"
              >
                <span
                  className={`chapter-num text-lg transition-colors ${
                    i === idx ? "text-primary-300" : "text-primary-800/30 group-hover:text-primary-800/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block text-xs font-semibold uppercase tracking-wide transition-colors ${
                      i === idx ? "text-primary-800" : "text-primary-800/50 group-hover:text-primary-800/80"
                    }`}
                  >
                    {c.tag[lang]}
                  </span>
                  <span className="mt-1 block h-0.5 w-full overflow-hidden rounded-full bg-primary-800/10">
                    <motion.span
                      className="block h-full bg-primary-300"
                      initial={{ width: 0 }}
                      animate={{ width: i === idx ? "100%" : "0%" }}
                      transition={{ duration: i === idx && !reduce ? AUTO_MS / 1000 : 0.3, ease: "linear" }}
                    />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
