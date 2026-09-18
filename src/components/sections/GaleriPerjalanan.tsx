import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { programGallery } from "../../utils/content";
import { Button } from "../ui/button";

const GaleriPerjalanan: React.FC = () => {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const active = programGallery[activeTab];

  return (
    <section id="galeri" className="overflow-hidden border-y border-primary-800/10 bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow mb-4">{dict.gallery.eyebrow[lang]}</p>
            <h2 className="display max-w-md text-5xl text-primary-800 sm:text-6xl">{dict.gallery.title[lang]}</h2>
          </div>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-primary-800/60">{dict.gallery.sub[lang]}</p>
            <a href="https://drive.google.com/drive/folders/1IYkX5tHHe1Q1ZSWgPciskBCUgg48DxYv" target="_blank" rel="noreferrer"><Button variant="outline" size="sm" className="w-fit rounded-full border-primary-800/20 text-primary-700">{dict.gallery.viewDrive[lang]} ↗</Button></a>
          </div>
        </div>
        <div className="mt-12 flex gap-2 overflow-x-auto border-b border-primary-800/10 pb-3 scrollbar-hide">
          {programGallery.map((program, index) => <button key={program.id} type="button" onClick={() => setActiveTab(index)} className={`whitespace-nowrap px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition ${activeTab === index ? "border-b-2 border-primary-300 text-primary-300" : "text-primary-800/40 hover:text-primary-800"}`}>{lang === "id" ? program.labelId : program.label}</button>)}
        </div>
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 scrollbar-hide">
          {active.images.map((image, index) => (
            <motion.figure key={image} initial={reduce ? false : { opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.04 }} className="w-[78vw] shrink-0 snap-start sm:w-[42vw] lg:w-[31vw]">
              <div className="aspect-[4/3] overflow-hidden rounded-sm bg-primary-100">
                <img src={image} alt={`${active.label} ${index + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              </div>
              <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/45"><span>{active.label}</span><span>{String(index + 1).padStart(2, "0")} / {String(active.images.length).padStart(2, "0")}</span></figcaption>
            </motion.figure>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/35">Swipe / geser untuk melihat lebih banyak</p>
      </div>
    </section>
  );
};

export default GaleriPerjalanan;
