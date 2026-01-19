"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '@/app/data/translations';

export interface Language {
  code: string;
  name: string;
  flag: string;
  country: string;
}

// SEO-friendly languages prioritized for medical tourism in India
export const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', country: 'United States' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', country: 'Saudi Arabia' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', country: 'Russia' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', country: 'Bangladesh' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', country: 'India' },
  { code: 'fr', name: 'French', flag: '🇫🇷', country: 'France' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', country: 'Spain' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', country: 'Portugal' },
  { code: 'de', name: 'German', flag: '🇩🇪', country: 'Germany' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', country: 'China' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', country: 'Italy' },
];

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation cache to avoid repeated API calls
const translationCache = new Map<string, string>();

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  // Load saved language from localStorage
  useEffect(() => {
    const savedLangCode = localStorage.getItem('preferredLanguage');
    if (savedLangCode) {
      const savedLang = languages.find(lang => lang.code === savedLangCode);
      if (savedLang) {
        setCurrentLanguage(savedLang);
      }
    }
  }, []);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language.code);
    // Clear cache when language changes
    translationCache.clear();
  };

  const translateText = async (text: string): Promise<string> => {
    // Don't translate if already in English or text is empty
    if (currentLanguage.code === 'en' || !text.trim()) {
      return text;
    }

    // Check cache first
    const cacheKey = `${currentLanguage.code}:${text}`;
    if (translationCache.has(cacheKey)) {
      return translationCache.get(cacheKey)!;
    }

    // Use static translation dictionary (SEO-friendly, instant, free)
    const translatedText = getTranslation(text, currentLanguage.code);
    
    // Cache the result
    translationCache.set(cacheKey, translatedText);
    
    return translatedText;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translateText, isTranslating }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
