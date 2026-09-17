import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageSwitch: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { lang, setLang } = useLanguage();
  const base = "rounded-full text-xs font-bold tracking-wide px-3 py-1.5 transition-colors border";
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur border border-slate-200 p-1">
      <button
        onClick={() => setLang("id")}
        className={`${base} ${lang === "id" ? "bg-primary-700 text-white border-primary-700" : "bg-transparent text-slate-600 border-transparent hover:bg-slate-100"} ${compact ? "px-2 py-1 text-[11px]" : ""}`}
        aria-label="Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? "bg-primary-700 text-white border-primary-700" : "bg-transparent text-slate-600 border-transparent hover:bg-slate-100"} ${compact ? "px-2 py-1 text-[11px]" : ""}`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitch;
