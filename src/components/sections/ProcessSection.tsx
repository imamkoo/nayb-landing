import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";

const ProcessSection: React.FC = () => {
  const { lang } = useLanguage();
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <p className="eyebrow mb-4">{dict.process.eyebrow[lang]}</p>
        <h2 className="display max-w-3xl text-5xl text-primary-800 sm:text-6xl">{dict.process.title[lang]}</h2>
        <div className="mt-16 border-t border-primary-800/10">
          {dict.process.steps[lang].map((step, index) => (
            <motion.article key={step.no} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="group grid gap-5 border-b border-primary-800/10 py-9 transition hover:bg-white sm:grid-cols-[70px_1fr_1fr_90px] sm:items-center sm:gap-8 sm:px-5">
              <span className="chapter-num text-3xl text-primary-300">{step.no}</span>
              <h3 className="max-w-sm font-display text-2xl text-primary-800 sm:text-3xl">{step.title}</h3>
              <p className="max-w-md text-sm leading-relaxed text-primary-800/60">{step.desc}</p>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/35 sm:block">{String(index + 1).padStart(2, "0")} / 04</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
