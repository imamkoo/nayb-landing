import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { services } from "../../utils/content";

const KatalogProgram: React.FC = () => {
  const { lang } = useLanguage();
  return (
    <section id="katalog" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-24 bg-[#fbf8fc]">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-3">{dict.katalog.eyebrow[lang]}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b103f] tracking-tight mb-3">{dict.katalog.title[lang]}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{dict.katalog.sub[lang]}</p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.li key={s.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-[#40195f]/10 bg-white p-6 shadow-[0_8px_24px_rgba(64,25,95,0.06)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#40195f] text-white mb-4">
                <s.Icon className="h-6 w-6 fill-current" />
              </div>
              <h3 className="text-lg font-semibold text-[#2b103f] mb-2">{s.heading}</h3>
              <p className="text-sm text-slate-600">{s.description}</p>
            </motion.li>
          ))}
          <li className="rounded-2xl border border-dashed border-[#40195f]/20 p-6 bg-white/70 flex items-center justify-center text-sm text-slate-500">
            {dict.katalog.comingSoon[lang]}
          </li>
        </ul>
      </div>
    </section>
  );
};

export default KatalogProgram;
