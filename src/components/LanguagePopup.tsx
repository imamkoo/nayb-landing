import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";

const LanguagePopup: React.FC = () => {
  const { showPopup, setLang, dismissPopup } = useLanguage();
  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1a0a2e]/60 backdrop-blur-sm p-4"
          onClick={dismissPopup}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[1.5rem] bg-white p-8 shadow-2xl border border-primary-100"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-300 mb-3">NayBe Global</p>
            <h2 className="text-xl font-bold text-primary-800 mb-2">Pilih bahasa · Choose language</h2>
            <p className="text-sm text-slate-500 mb-6">Situs ini tersedia dalam Bahasa Indonesia dan English. Anda bisa ganti kapan saja.</p>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => setLang("id")} className="w-full rounded-full py-6 text-base">🇮🇩 Bahasa Indonesia</Button>
              <Button onClick={() => setLang("en")} variant="outline" className="w-full rounded-full py-6 text-base border-primary-800/15">🇬🇧 English</Button>
            </div>
            <button onClick={dismissPopup} className="mt-4 w-full text-xs text-slate-400 hover:text-slate-600 underline underline-offset-4">Lewati · Skip</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguagePopup;
