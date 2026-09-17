import React, { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { faqs, testimonials } from "../../utils/content";
import CaretUp from "../Icons/CaretUp";

const TestimonialsAndFaq: React.FC = () => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIdx((cur) => (cur === i ? null : i));
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-[#faf6ff]">
      <div className="mx-auto max-w-7xl">
        {/* Testimoni Orang Tua & Siswa */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">
              {dict.testimonials.eyebrow[lang]}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b103f] tracking-tight">
              {dict.testimonials.title[lang]}
            </h2>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.li
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col justify-between rounded-2xl bg-white p-7 shadow-[0_8px_24px_rgba(64,25,95,0.06)] border border-[#40195f]/10"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={t.img}
                      alt={t.alt}
                      className="h-12 w-12 rounded-full object-cover bg-slate-100 ring-2 ring-[#c73884]/20"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#2b103f]">
                        {lang === "en" && t.nameEn ? t.nameEn : t.name}
                      </p>
                      <p className="text-xs text-[#c73884] font-medium">{t.vacation}</p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-600 font-light italic">
                    {lang === "en" && t.descriptionEn ? t.descriptionEn : t.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 uppercase tracking-wider">
                  <span>Verified Participant</span>
                  <span>★★★★★</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-[#40195f]/10">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">
              {dict.faq.eyebrow[lang]}
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#2b103f] tracking-tight">
              {dict.faq.title[lang]}
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIdx === i;
              const question = lang === "en" ? faq.qEn : faq.q;
              const answer = lang === "en" ? faq.aEn : faq.a;
              return (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-[#40195f]/10 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-sm sm:text-base text-[#2b103f] hover:text-[#c73884] transition-colors"
                  >
                    <span>{question}</span>
                    <CaretUp
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 fill-[#40195f] ${
                        isOpen ? "" : "rotate-180"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed font-light border-t border-slate-100"
                    >
                      {answer}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndFaq;
