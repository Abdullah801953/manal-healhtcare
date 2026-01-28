"use client";

import { useEffect, useState, ReactNode } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

interface TranslateProps {
  text?: string;
  children?: string | ReactNode;
  className?: string;
}

const Translate: React.FC<TranslateProps> = ({ text, children, className }) => {
  const { translateText, currentLanguage } = useLanguage();
  const [translatedText, setTranslatedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const textToTranslate = text || (typeof children === 'string' ? children : '');

  useEffect(() => {
    const translate = async () => {
      if (textToTranslate) {
        setIsLoading(true);
        const translated = await translateText(textToTranslate);
        setTranslatedText(translated);
        setIsLoading(false);
      }
    };

    translate();
  }, [textToTranslate, currentLanguage, translateText]);

  // If children is not a string and no text prop, return as is
  if (!textToTranslate && children) {
    return <>{children}</>;
  }

  // Show original text while loading
  if (isLoading && currentLanguage.code !== 'en') {
    return <span className={className}>{textToTranslate}</span>;
  }

  return <span className={className}>{translatedText || textToTranslate}</span>;
};

export default Translate;
