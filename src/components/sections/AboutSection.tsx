import React from "react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import NayBGlobalLogo from "../Icons/NayBGlobalLogo";

const AboutSection: React.FC = () => {
  const { lang } = useLanguage();
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-[90rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-start">
          {/* Left — editorial heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-24"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-4">{dict.about.eyebrow[lang]}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b103f] tracking-[-0.015em] leading-[1.1] mb-6">
              {dict.about.title[lang]}
            </h2>
            <div className="w-full h-px bg-[#40195f]/10 mb-8" />
            <div className="flex flex-col sm:flex-row gap-6 mt-4">
              {dict.about.bullets[lang].map((bul, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-[#40195f] text-white text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium text-[#40195f]">{bul}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — body copy + logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-xl lg:pl-8"
          >
            <NayBGlobalLogo className="mb-8" variant="dark" showText />
            <p className="text-base sm:text-lg leading-relaxed text-slate-600 mb-6">
              {dict.about.body[lang]}
            </p>
            <blockquote className="border-l-4 border-[#c73884] pl-4 py-2 my-6 bg-[#fff1f7]/50 rounded-r-md">
              <p className="text-lg font-semibold italic text-[#2b103f]">
                "Lebih dari sekadar jalan-jalan."
              </p>
            </blockquote>
            <div className="mt-8">
              <a href="#proposal" className="inline-flex items-center gap-2 text-sm font-bold text-[#c73884] hover:text-[#a82e70] group underline underline-offset-4">
                Ajukan pertanyaan →
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >→</motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
