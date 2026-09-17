import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "id" | "en";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  showPopup: boolean;
  dismissPopup: () => void;
} | null>(null);

const STORAGE_KEY = "nayb-lang";
const POPUP_KEY = "nayb-lang-chosen";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>("id");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    const chosen = localStorage.getItem(POPUP_KEY);
    if (stored === "id" || stored === "en") {
      setLangState(stored);
      setShowPopup(false);
      return;
    }
    const browser = navigator.language.toLowerCase().startsWith("en") ? "en" : "id";
    setLangState(browser);
    if (!chosen) setShowPopup(true);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem(STORAGE_KEY, l);
    localStorage.setItem(POPUP_KEY, "1");
    setShowPopup(false);
  };

  const dismissPopup = () => {
    localStorage.setItem(POPUP_KEY, "1");
    setShowPopup(false);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, showPopup, dismissPopup }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
};
