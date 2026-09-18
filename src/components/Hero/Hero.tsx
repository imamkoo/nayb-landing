import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { heroChapters } from "../../utils/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";

const INTERVAL = 5000;

const Hero: React.FC = () => {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const total = heroChapters.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [reduce, next]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sx = useSpring(pointerX, { stiffness: 100, damping: 20 });
  const sy = useSpring(pointerY, { stiffness: 100, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-30, 30]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-20, 20]);
  const wordX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const wordY = useTransform(sy, [-0.5, 0.5], [20, -20]);
  const copyX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const copyY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - r.left) / r.width - 0.5);
    pointerY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };

  const scene = heroChapters[idx];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined" && window.history.replaceState) {
        window.history.replaceState(null, "", `#${id}`);
      }
    } else if (typeof window !== "undefined") {
      window.location.hash = `#${id}`;
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-cream"
      onPointerMove={onPointer}
      onPointerLeave={resetPointer}
    >
      {/* Background photo — parallax on pointer */}
      <motion.div style={reduce ? undefined : { x: imgX, y: imgY }} className="absolute -inset-[8%]">
        <AnimatePresence mode="sync">
          <motion.div
            key={scene.id}
            initial={reduce ? false : { opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url('${scene.img}')`,
              backgroundPosition: scene.bgPos || "center center",
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,249,244,0.97)_0%,rgba(253,249,244,0.82)_30%,rgba(253,249,244,0.25)_65%,rgba(253,249,244,0.04)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-cream via-cream/40 to-transparent" />
      </motion.div>

      {/* Giant NAYBE wordmark — inverse parallax */}
      <motion.div
        style={reduce ? undefined : { x: wordX, y: wordY }}
        className="pointer-events-none absolute inset-x-0 bottom-[12svh] z-10 select-none overflow-hidden"
        aria-hidden="true"
      >
        <p className="display mx-auto max-w-[100rem] whitespace-nowrap px-6 text-[22vw] font-semibold uppercase leading-[0.78] tracking-[-0.08em] text-white/90 drop-shadow-[0_6px_24px_rgba(43,16,63,0.18)] sm:px-10 sm:text-[16vw] lg:px-16 lg:text-[16rem]">
          NAYBE
        </p>
      </motion.div>

      {/* Text content — slight pointer parallax */}
      <motion.div
        style={reduce ? undefined : { x: copyX, y: copyY }}
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-[100rem] items-center px-6 sm:px-10 lg:px-16"
      >
        <div className="max-w-[min(620px,78vw)] py-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="eyebrow mb-5 flex items-center gap-3 text-primary-300">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-300" />
                {scene.tag[lang]}
              </p>
              <h1 className="display max-w-3xl text-[12vw] font-semibold leading-[0.88] tracking-[-0.045em] text-primary-800 sm:text-7xl lg:text-[clamp(76px,8.2vw,140px)]">
                {scene.title[lang]}
              </h1>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 max-w-lg text-base font-medium leading-relaxed text-primary-800/80 sm:text-lg">
            {dict.hero.sub[lang]}
          </p>
          <div className="relative z-30 mt-7 flex flex-wrap gap-3">
            <a
              href="#katalog"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("katalog");
              }}
              className="inline-flex items-center rounded-full bg-primary-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-700/15 transition hover:bg-primary-800 active:scale-[0.97] cursor-pointer"
            >
              {dict.hero.ctaPrimary[lang]} <span className="ml-1">→</span>
            </a>
            <a
              href="#galeri"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("galeri");
              }}
              className="inline-flex items-center rounded-full border border-primary-800/20 bg-white/60 px-7 py-3.5 text-sm font-semibold text-primary-700 backdrop-blur-sm transition hover:bg-white active:scale-[0.97] cursor-pointer"
            >
              {dict.hero.ctaSecondary[lang]}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Mini photo card (desktop) — clicks to gallery */}
      <a
        href="#galeri"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("galeri");
        }}
        className="group absolute bottom-[22svh] right-[7vw] z-30 hidden w-[clamp(170px,16vw,260px)] text-left cursor-pointer lg:block"
      >
        <div className="relative aspect-[4/3] overflow-hidden border border-white/70 shadow-[0_24px_70px_rgba(43,16,63,0.18)]">
          <img src={scene.img} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 flex items-center justify-center bg-primary-800/10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-primary-700 transition group-hover:scale-110">↗</span>
          </span>
        </div>
        <p className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-primary-800/60">
          <span>{scene.tag[lang]}</span>
          <span>{String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </p>
      </a>

      {/* Side label */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
        <span className="h-20 w-px bg-primary-800/15" />
        <span className="vwrite font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-primary-800/50">Education Tour · Est. 2017</span>
        <span className="h-20 w-px bg-primary-800/15" />
      </div>

      {/* Bottom bar — dots + scroll hint */}
      <div className="absolute bottom-6 left-6 right-6 z-30 mx-auto max-w-[100rem] sm:left-10 sm:right-10 lg:left-16 lg:right-16">
        <div className="flex items-center justify-between border-t border-primary-800/15 pt-4">
          <div className="flex gap-2">
            {heroChapters.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-primary-300" : "w-2 bg-primary-800/20 hover:bg-primary-800/40"}`}
                aria-label={c.tag[lang]}
              />
            ))}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-800/50">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
