import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";

const ProcessSection: React.FC = () => {
  const { lang } = useLanguage();
  const data = dict.process.steps[lang];
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">{dict.process.eyebrow[lang]}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b103f] tracking-tight">{dict.process.title[lang]}</h2>
        </div>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.map((s, i) => (
            <motion.li key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.55, delay: i * 0.05 }} className="rounded-2xl border border-[#40195f]/10 bg-white p-6 shadow-[0_8px_24px_rgba(64,25,95,0.06)]">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">{s.no}</p>
              <h3 className="text-xl font-semibold text-[#2b103f] mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
