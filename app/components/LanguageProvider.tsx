"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Lang } from "../i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // מתחילים תמיד בעברית כדי להתאים ל-HTML שהשרת מייצר, ומעדכנים אחרי הטעינה
  const [lang, setLang] = useState<Lang>("he");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "he") {
      setLang(saved);
    } else if (!navigator.language.startsWith("he")) {
      setLang("en");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
    document.title = dictionaries[lang].meta.title;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggleLang: () => setLang(lang === "he" ? "en" : "he"),
    t: dictionaries[lang],
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
