import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroChapters } from "../../utils/content";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce || !rootRef.current) return;

    const context = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>("[data-story-scene]");
      const visual = ".story-visual";

      scenes.forEach((scene, index) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top 52%",
          end: "bottom 52%",
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        });
      });

      gsap.to(visual, {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    }, rootRef);

    return () => context.revert();
  }, [reduce]);

  const scene = heroChapters[active];

  return (
    <section id="top" ref={rootRef} className="relative bg-cream">
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
        <div className="story-visual absolute -inset-y-[8%] inset-x-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={scene.id}
              initial={reduce ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${scene.img}')` }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(253,249,244,0.96)_0%,rgba(253,249,244,0.74)_34%,rgba(253,249,244,0.14)_68%,rgba(253,249,244,0.04)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-cream via-cream/45 to-transparent" />
        </div>

        <div className="pointer-events-none absolute inset-y-0 right-6 hidden items-center lg:flex">
          <div className="flex flex-col items-center gap-4">
            <span className="h-20 w-px bg-primary-800/15" />
            <span className="vwrite font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-primary-800/55">NayBe Global · Est. 2017</span>
            <span className="h-20 w-px bg-primary-800/15" />
          </div>
        </div>

        <div className="absolute bottom-7 left-6 right-6 z-20 mx-auto max-w-[100rem] sm:left-10 sm:right-10 lg:left-16 lg:right-16">
          <div className="grid grid-cols-4 gap-2 border-t border-primary-800/15 pt-4 sm:gap-5">
            {heroChapters.map((chapter, index) => (
              <button
                key={chapter.id}
                type="button"
                onClick={() => {
                  document.getElementById(`scene-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group flex min-w-0 gap-2 text-left"
              >
                <span className={`chapter-num text-lg transition-colors ${active === index ? "text-primary-300" : "text-primary-800/35 group-hover:text-primary-800/70"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 pt-1">
                  <span className={`block truncate font-mono text-[9px] font-bold uppercase tracking-[0.11em] transition-colors ${active === index ? "text-primary-800" : "text-primary-800/50"}`}>
                    {chapter.tag[lang]}
                  </span>
                  <span className="mt-2 block h-px overflow-hidden bg-primary-800/15">
                    <motion.span
                      className="block h-full bg-primary-300"
                      animate={{ width: active === index ? "100%" : "0%" }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                    />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 -mt-[100svh]">
        {heroChapters.map((chapter, index) => (
          <article
            id={`scene-${index}`}
            data-story-scene
            key={chapter.id}
            className="relative flex min-h-[100svh] items-center px-6 pt-24 sm:px-10 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(280px,0.4fr)] lg:items-end lg:gap-20">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.55 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <p className="eyebrow mb-5 flex items-center gap-3">
                  <span className="chapter-num text-primary-300">{String(index + 1).padStart(2, "0")}</span>
                  <span className="h-px w-10 bg-primary-300/70" />
                  {chapter.tag[lang]}
                </p>
                <h1 className="display max-w-4xl text-[14vw] text-primary-800 sm:text-7xl lg:text-[clamp(72px,8.5vw,144px)]">
                  {chapter.title[lang]}
                </h1>
                {index === 0 && (
                  <>
                    <p className="mt-7 max-w-xl text-base leading-relaxed text-primary-800/70 sm:text-lg">{dict.hero.sub[lang]}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href="#katalog" className="rounded-full bg-primary-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-primary-700/15 transition hover:bg-primary-800 active:scale-95">{dict.hero.ctaPrimary[lang]} <span className="ml-1">→</span></a>
                      <a href="#galeri" className="rounded-full border border-primary-800/20 bg-white/55 px-7 py-3.5 text-sm font-semibold text-primary-700 backdrop-blur-sm transition hover:bg-white active:scale-95">{dict.hero.ctaSecondary[lang]}</a>
                    </div>
                  </>
                )}
              </motion.div>

              <motion.aside
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ amount: 0.55 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="hidden border-l border-primary-800/15 pl-7 lg:block"
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary-300">{String(index + 1).padStart(2, "0")} / 04</p>
                <p className="mt-4 text-sm leading-relaxed text-primary-800/65">
                  {index === 0 ? dict.about.body[lang] : dict.process.steps[lang][Math.min(index - 1, 3)].desc}
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.16em] text-primary-800/45">Scroll untuk melanjutkan</p>
              </motion.aside>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Hero;
