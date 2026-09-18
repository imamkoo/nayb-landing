import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";

const AboutSection: React.FC = () => {
  const { lang } = useLanguage();
  return (
    <section id="tentang" className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto grid max-w-[100rem] gap-12 lg:grid-cols-[0.55fr_0.9fr_0.85fr] lg:gap-14">
        <motion.div initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
          <p className="eyebrow mb-4">Chapter 01 — {dict.about.eyebrow[lang]}</p>
          <div className="display text-[11vw] text-primary-300/25 sm:text-7xl lg:text-8xl" aria-hidden="true">01</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="display max-w-md text-4xl text-primary-800 sm:text-5xl lg:text-6xl">{dict.about.title[lang]}</h2>
          <div className="mt-10 flex flex-wrap gap-2">
            {dict.about.bullets[lang].map((bullet) => <span key={bullet} className="rounded-full border border-primary-800/15 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-primary-700">{bullet}</span>)}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:border-l lg:border-primary-800/10 lg:pl-12">
          <p className="max-w-xl text-base leading-relaxed text-primary-800/70 sm:text-lg">{dict.about.body[lang]}</p>
          <blockquote className="mt-8 border-l-2 border-primary-300 pl-5 font-display text-xl italic text-primary-700">“Lebih dari sekadar jalan-jalan.”</blockquote>
          <div className="mt-10 grid grid-cols-2 gap-8 border-t border-primary-800/10 pt-8 sm:grid-cols-4">
            {dict.hero.stats[lang].map((stat) => <div key={stat.v}><p className="display text-3xl text-primary-800 sm:text-4xl">{stat.k}</p><p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-primary-800/50">{stat.v}</p></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
