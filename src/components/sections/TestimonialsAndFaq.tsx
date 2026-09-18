import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { faqs, testimonials } from "../../utils/content";
import CaretUp from "../Icons/CaretUp";

const TestimonialsAndFaq: React.FC = () => {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-sand/60 px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <p className="eyebrow mb-4">{dict.testimonials.eyebrow[lang]}</p>
        <h2 className="display max-w-2xl text-5xl text-primary-800 sm:text-6xl">{dict.testimonials.title[lang]}</h2>
        <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.li key={testimonial.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }} className={`flex flex-col justify-between rounded-md border border-primary-800/10 bg-white p-8 ${index % 3 === 1 ? "md:translate-y-8" : ""}`}>
              <div>
                <span className="font-display text-4xl text-primary-300">“</span>
                <p className="mt-2 font-display text-lg italic leading-relaxed text-primary-800">{lang === "en" && testimonial.descriptionEn ? testimonial.descriptionEn : testimonial.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-primary-800/10 pt-5">
                <img src={testimonial.img} alt={testimonial.alt} className="h-11 w-11 rounded-full bg-primary-100 object-cover" />
                <div>
                  <p className="text-xs font-bold text-primary-800">{lang === "en" && testimonial.nameEn ? testimonial.nameEn : testimonial.name}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-primary-800/50">{testimonial.vacation}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="mt-24 grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">{dict.faq.eyebrow[lang]}</p>
            <h3 className="display text-4xl text-primary-800 sm:text-5xl">{dict.faq.title[lang]}</h3>
          </div>
          <div className="divide-y divide-primary-800/10 border-y border-primary-800/10">
            {faqs.map((faq, index) => {
              const open = openIdx === index;
              return (
                <div key={index}>
                  <button type="button" onClick={() => setOpenIdx((current) => (current === index ? null : index))} className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg text-primary-800 transition hover:text-primary-300">
                    <span>{lang === "en" ? faq.qEn : faq.q}</span>
                    <CaretUp className={`h-4 w-4 shrink-0 fill-primary-300 transition-transform duration-300 ${open ? "" : "rotate-180"}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden"><p className="max-w-2xl pb-7 text-sm leading-relaxed text-primary-800/60">{lang === "en" ? faq.aEn : faq.a}</p></motion.div>}
                  </AnimatePresence>
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
