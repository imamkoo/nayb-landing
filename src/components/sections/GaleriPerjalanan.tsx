import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { dict } from "../../utils/i18n";
import { programGallery } from "../../utils/content";

const GaleriPerjalanan: React.FC = () => {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);
  const active = programGallery[activeTab];

  return (
    <section id="galeri" className="overflow-hidden border-y border-primary-800/10 bg-white px-6 py-24 sm:px-10 lg:px-16 lg:py-36">
      <div className="mx-auto max-w-[100rem]">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="eyebrow mb-4">{dict.gallery.eyebrow[lang]}</p>
            <h2 className="display max-w-md text-5xl text-primary-800 sm:text-6xl">{dict.gallery.title[lang]}</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-primary-800/60">{dict.gallery.sub[lang]}</p>
        </div>

        <div className="mt-12 flex gap-2 overflow-x-auto border-b border-primary-800/10 pb-3 scrollbar-hide">
          {programGallery.map((program, index) => (
            <button
              key={program.id}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`whitespace-nowrap px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition ${activeTab === index ? "border-b-2 border-primary-300 text-primary-300" : "text-primary-800/40 hover:text-primary-800"}`}
            >
              {lang === "id" ? program.labelId : program.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 scrollbar-hide">
          {active.images.map((image, index) => (
            <motion.button
              type="button"
              key={image}
              onClick={() => setLightbox({ src: image, caption: `${active.label} — ${String(index + 1).padStart(2, "0")} / ${String(active.images.length).padStart(2, "0")}` })}
              initial={reduce ? false : { opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
              className="group w-[78vw] shrink-0 snap-start text-left sm:w-[42vw] lg:w-[31vw]"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-primary-100">
                <img src={image} alt={`${active.label} ${index + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-center justify-center bg-primary-800/0 text-white opacity-0 transition group-hover:bg-primary-800/25 group-hover:opacity-100">
                  <span className="rounded-full bg-white/90 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary-800">{lang === "id" ? "Perbesar" : "Enlarge"}</span>
                </span>
              </div>
              <span className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/45">
                <span>{active.label}</span>
                <span>{String(index + 1).padStart(2, "0")} / {String(active.images.length).padStart(2, "0")}</span>
              </span>
            </motion.button>
          ))}
        </div>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-800/35">{lang === "id" ? "Geser untuk melihat lebih banyak" : "Swipe to see more"}</p>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-primary-800/85 p-4 backdrop-blur-sm sm:p-10"
          >
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full max-w-full"
            >
              <img src={lightbox.src} alt={lightbox.caption} className="max-h-[82vh] max-w-full rounded-sm object-contain shadow-2xl" />
              <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">{lightbox.caption}</figcaption>
            </motion.figure>
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label={lang === "id" ? "Tutup" : "Close"}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GaleriPerjalanan;
