import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { programGallery } from "../../utils/content";
import NayBeGlobalLogo from "../Icons/NayBeGlobalLogo";
import { Button } from "../ui/button";

const GaleriPerjalanan: React.FC = () => {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const active = programGallery[activeTab];
  return (
    <section id="galeri" className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c73884] mb-2">{dict.gallery.eyebrow[lang]}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b103f] tracking-tight">{dict.gallery.title[lang]}</h2>
            <p className="text-slate-600 max-w-2xl mt-3">{dict.gallery.sub[lang]}</p>
          </div>
          <a href="https://drive.google.com/drive/folders/1IYkX5tHHe1Q1ZSWgPciskBCUgg48DxYv" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-full border-[#40195f]/15 text-[#40195f]">
              {dict.gallery.viewDrive[lang]} ↗
            </Button>
          </a>
        </div>
        {/* Tabs per program */}
        <div className="flex gap-2 mb-6 overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
          {programGallery.map((p, i) => (
            <button key={p.id} onClick={() => setActiveTab(i)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] transition-colors border ${i === activeTab ? "bg-[#40195f] text-white border-[#40195f]" : "bg-white text-slate-600 border-[#40195f]/15 hover:border-[#40195f]/40"}`}
            >
              {lang === "id" ? p.labelId : p.label}
            </button>
          ))}
        </div>
        {/* Swipeable scroller */}
        <div ref={scrollerRef} className="overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4 pb-4 scrollbar-hide cursor-grab active:cursor-grabbing">
          <div className="flex gap-4 w-max">
            {active.images.map((_img, i) => (
              <motion.div key={i} initial={reduce ? false : { opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: i * 0.03 }}
                className="snap-start w-[280px] sm:w-[340px] lg:w-[420px] flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-[0_8px_24px_rgba(64,25,95,0.08)] border border-[#40195f]/8"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#fff1f7] to-[#f3ecfa] flex items-center justify-center">
                  <NayBeGlobalLogo variant="dark" showText={false} className="h-12 opacity-30" />
                </div>
                <div className="p-4">
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Galeri {active.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Dots */}
        <div className="flex gap-2 justify-center mt-4">
          {active.images.map((_, i) => (
            <span key={i} className={`h-2 w-2 rounded-full transition-colors duration-300 ${i === 0 ? "bg-[#40195f]" : "bg-[#40195f]/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GaleriPerjalanan;