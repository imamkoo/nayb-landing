import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { platformCategories } from "../../utils/content";

const Platform: React.FC = () => {
  const [activeId, setActiveId] = useState(platformCategories[0].id);
  const active = platformCategories.find((c) => c.id === activeId) ?? platformCategories[0];

  return (
    <section id="platform" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-800 sm:text-4xl lg:text-5xl">
            Satu Platform untuk Seluruh Perjalanan Edukasi
          </h2>
          <p className="mx-auto max-w-2xl text-base font-light text-slate-500 sm:text-lg">
            Dari merancang program hingga dokumentasi akhir — semua kebutuhan edutour sekolah dalam satu tempat
          </p>
        </motion.div>

        {/* Tab kategori */}
        <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Kategori platform">
          {platformCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={cat.id === activeId}
              onClick={() => setActiveId(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 sm:px-5 ${
                cat.id === activeId
                  ? "bg-primary-700 text-white shadow-lg shadow-primary-700/25"
                  : "bg-primary-100 text-primary-800 hover:bg-primary-300/30"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Panel aktif */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-[2rem] border border-primary-100 bg-white p-6 shadow-xl shadow-primary-800/5 sm:p-10"
          >
            <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 font-mono text-xs tracking-[0.2em] text-primary-300 uppercase">
                  {String(active.id).padStart(2, "0")} / {String(platformCategories.length).padStart(2, "0")}
                </p>
                <h3 className="text-2xl font-bold text-primary-800 sm:text-3xl">{active.title}</h3>
              </div>
              <p className="max-w-md font-light text-slate-500">{active.tagline}</p>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {active.features.map((f, i) => (
                <motion.li
                  key={f.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="group rounded-2xl border border-slate-100 bg-[#fbf8fc] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300/40 hover:shadow-lg hover:shadow-primary-700/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-700 to-primary-300 text-white shadow-md">
                    <f.Icon className="h-6 w-6 fill-current" />
                  </div>
                  <h4 className="mb-1.5 font-bold text-primary-800">{f.heading}</h4>
                  <p className="text-sm leading-relaxed font-light text-slate-500">{f.description}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Platform;
