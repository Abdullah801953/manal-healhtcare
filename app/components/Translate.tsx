"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TranslateProps {
  children: string | ReactNode;
  className?: string;
}

export const Translate: React.FC<TranslateProps> = ({ children, className }) => {
  const { translateText, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (typeof children === 'string') {
        setIsLoading(true);
        const translated = await translateText(children);
        setTranslatedText(translated);
        setIsLoading(false);
      }
    };

    translate();
  }, [children, currentLanguage, translateText]);

  // If children is not a string, return as is
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  // Show loading state or translated text
  if (isLoading && currentLanguage.code !== 'en') {
    return <span className={className}>{children}</span>;
  }

  return <span className={className}>{translatedText || children}</span>;
};

// Hook for translating text programmatically
export const useTranslate = () => {
  const { translateText } = useLanguage();
  return translateText;
};
