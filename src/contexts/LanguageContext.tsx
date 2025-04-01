
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { en } from "../locales/en";
import { fr } from "../locales/fr";
import { es } from "../locales/es";
import { de } from "../locales/de";
import { nl } from "../locales/nl";
import { it } from "../locales/it";

// Define supported languages and their translations
const translations = {
  en,
  fr,
  es,
  de,
  nl,
  it,
};

export type SupportedLanguage = keyof typeof translations;

// Create context with default values
interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string) => string;
  availableLanguages: { code: SupportedLanguage; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
  availableLanguages: [],
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Available languages with their details
  const availableLanguages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];
  
  // Get language from localStorage if available, otherwise use browser language or default to English
  const getInitialLanguage = (): SupportedLanguage => {
    const savedLanguage = localStorage.getItem("language") as SupportedLanguage;
    if (savedLanguage && translations[savedLanguage]) {
      return savedLanguage;
    }
    
    // Try to get browser language
    const browserLang = navigator.language.split("-")[0] as SupportedLanguage;
    if (translations[browserLang]) {
      return browserLang;
    }
    
    return "en"; // Default to English
  };
  
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  // Translation function - get translation by key or return key if not found
  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let result = translations[language] as any;
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Key not found, return the key itself
      }
    }
    
    return typeof result === "string" ? result : key;
  }, [language]);

  // Update language and save to localStorage
  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
    
    // Force re-render of components using translations
    console.log(`Language changed to: ${lang}`);
    
    // Add an event to notify components about language change
    const event = new CustomEvent("languagechange", { detail: { language: lang } });
    window.dispatchEvent(event);
  }, []);

  // Set HTML lang attribute on mount and language change
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};
