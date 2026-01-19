"use client";

import { useLanguage } from '@/app/contexts/LanguageContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * SEO Meta Tags Component
 * Adds hreflang tags for multilingual SEO
 * Updates HTML lang attribute based on current language
 */
export const SEOMetaTags = () => {
  const { currentLanguage } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    // Update HTML lang attribute for SEO
    document.documentElement.lang = currentLanguage.code;

    // Remove existing hreflang tags
    const existingTags = document.querySelectorAll('link[rel="alternate"]');
    existingTags.forEach(tag => tag.remove());

    // Base URL (update with your actual domain)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://manalhealthcare.com';
    
    // Languages to add hreflang for (SEO priority languages)
    const languages = [
      { code: 'en', hreflang: 'en' },
      { code: 'ar', hreflang: 'ar' },
      { code: 'ru', hreflang: 'ru' },
      { code: 'bn', hreflang: 'bn' },
      { code: 'hi', hreflang: 'hi' },
      { code: 'fr', hreflang: 'fr' },
      { code: 'es', hreflang: 'es' },
      { code: 'pt', hreflang: 'pt' },
      { code: 'de', hreflang: 'de' },
      { code: 'zh', hreflang: 'zh' },
      { code: 'it', hreflang: 'it' },
    ];

    // Add hreflang tags for each language
    languages.forEach(({ code, hreflang }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = `${baseUrl}/${code}${pathname}`;
      document.head.appendChild(link);
    });

    // Add x-default for English
    const defaultLink = document.createElement('link');
    defaultLink.rel = 'alternate';
    defaultLink.hreflang = 'x-default';
    defaultLink.href = `${baseUrl}${pathname}`;
    document.head.appendChild(defaultLink);

  }, [currentLanguage, pathname]);

  return null; // This component only manages meta tags
};
