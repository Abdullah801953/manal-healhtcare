"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { translateText } from '@/app/lib/i18n/translations';

interface TranslateProps {
  children: string;
  ns?: string; // namespace for caching
}

// Component to translate text content
export function Translate({ children, ns = 'common' }: TranslateProps) {
  const { currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState(children);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const translate = async () => {
      // If English, use original text
      if (currentLanguage.code === 'en') {
        setTranslatedText(children);
        return;
      }

      setIsTranslating(true);
      try {
        const translated = await translateText(children, currentLanguage.code, 'en');
        setTranslatedText(translated);
      } catch (error) {
        console.error('Translation failed:', error);
        setTranslatedText(children);
      } finally {
        setIsTranslating(false);
      }
    };

    translate();
  }, [children, currentLanguage.code]);

  return <>{translatedText}</>;
}

// Hook for translating text in components
export function useTranslate() {
  const { currentLanguage } = useLanguage();

  const translate = async (text: string): Promise<string> => {
    if (currentLanguage.code === 'en') {
      return text;
    }

    try {
      return await translateText(text, currentLanguage.code, 'en');
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    }
  };

  return { translate, currentLanguage };
}
