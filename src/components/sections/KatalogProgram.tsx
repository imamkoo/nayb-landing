import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { services } from "../../utils/content";

const KatalogProgram: React.FC = () => {
  const { lang } = useLanguage();
  return (
    <section id="katalog" className="bg-sand/60 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <p className="eyebrow mb-4">{dict.katalog.eyebrow[lang]}</p>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <h2 className="display max-w-2xl text-5xl text-primary-800 sm:text-6xl">{dict.katalog.title[lang]}</h2>
          <p className="max-w-md text-sm leading-relaxed text-primary-800/60">{dict.katalog.sub[lang]}</p>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.li key={service.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.05 }} className={`rounded-md border border-primary-800/10 bg-white p-8 shadow-[0_16px_40px_rgba(64,25,95,0.06)] ${index % 3 === 1 ? "md:translate-y-10" : ""}`}>
              <p className="chapter-num text-sm text-primary-300">{String(index + 1).padStart(2, "0")}</p>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-700"><service.Icon className="h-6 w-6 fill-current" /></div>
              <h3 className="mt-5 font-display text-2xl text-primary-800">{service.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-primary-800/60">{service.description}</p>
            </motion.li>
          ))}
        </ul>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border border-dashed border-primary-300/50 bg-white/80 px-7 py-6 sm:flex-row sm:items-center">
          <p className="text-sm text-primary-800/70">{dict.katalog.comingSoon[lang]}</p>
          <a href="#proposal" className="rounded-full bg-primary-700 px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-primary-800">{lang === "id" ? "Konsultasi Itinerary" : "Discuss Your Itinerary"}</a>
        </div>
      </div>
    </section>
  );
};

export default KatalogProgram;
