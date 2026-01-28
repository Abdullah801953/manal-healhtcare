"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Hook to translate dynamic content using LibreTranslate
 * Usage: const translatedTitle = useTranslate(blog.title);
 */
export function useTranslate(text: string | undefined): string {
  const { translateText, currentLanguage } = useLanguage();
  const [translated, setTranslated] = useState(text || '');

  useEffect(() => {
    if (!text) {
      setTranslated('');
      return;
    }

    // If English, no need to translate
    if (currentLanguage.code === 'en') {
      setTranslated(text);
      return;
    }

    let isMounted = true;

    translateText(text).then((result) => {
      if (isMounted) {
        setTranslated(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [text, currentLanguage.code, translateText]);

  return translated;
}

/**
 * Hook to translate multiple texts at once
 * Usage: const [title, desc] = useTranslateMultiple([blog.title, blog.description]);
 */
export function useTranslateMultiple(texts: (string | undefined)[]): string[] {
  const { translateText, currentLanguage } = useLanguage();
  const [translated, setTranslated] = useState<string[]>(texts.map(t => t || ''));

  useEffect(() => {
    // If English, no need to translate
    if (currentLanguage.code === 'en') {
      setTranslated(texts.map(t => t || ''));
      return;
    }

    let isMounted = true;

    Promise.all(
      texts.map(text => text ? translateText(text) : Promise.resolve(''))
    ).then((results) => {
      if (isMounted) {
        setTranslated(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [JSON.stringify(texts), currentLanguage.code, translateText]);

  return translated;
}
