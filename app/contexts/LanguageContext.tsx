"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, defaultLanguage, getLanguageByCode } from '@/app/lib/i18n/languages';
import { Translations, loadTranslations } from '@/app/lib/i18n/translations';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (languageCode: string) => void;
  translations: Translations;
  isLoading: boolean;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguageCode, setCurrentLanguageCode] = useState<string>(defaultLanguage);
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguageCode(savedLanguage);
    }
  }, []);

  // Load translations when language changes
  useEffect(() => {
    const loadLanguageTranslations = async () => {
      setIsLoading(true);
      try {
        const newTranslations = await loadTranslations(currentLanguageCode);
        setTranslations(newTranslations);
        
        // Update document direction for RTL languages
        const language = getLanguageByCode(currentLanguageCode);
        if (language?.rtl) {
          document.documentElement.dir = 'rtl';
          document.documentElement.lang = currentLanguageCode;
        } else {
          document.documentElement.dir = 'ltr';
          document.documentElement.lang = currentLanguageCode;
        }
      } catch (error) {
        console.error('Failed to load translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguageTranslations();
  }, [currentLanguageCode]);

  const changeLanguage = (languageCode: string) => {
    setCurrentLanguageCode(languageCode);
    localStorage.setItem('preferred-language', languageCode);
    
    // Update document language attribute
    document.documentElement.lang = languageCode;
    
    // Note: Page reload removed to allow Google Translate to work
    // Translation happens via GoogleTranslateWidget component
  };

  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let current: any = translations;
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return fallback || key;
      }
    }
    
    return typeof current === 'string' ? current : fallback || key;
  };

  const currentLanguage = getLanguageByCode(currentLanguageCode) || getLanguageByCode(defaultLanguage)!;

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        translations,
        isLoading,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
