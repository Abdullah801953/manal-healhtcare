"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

export function PageTranslator() {
  const { currentLanguage } = useLanguage();
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Skip if English
    if (currentLanguage.code === 'en') {
      return;
    }

    const translatePage = async () => {
      setIsTranslating(true);
      
      try {
        // Get all text nodes
        const textNodes: Node[] = [];
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              // Skip script, style, and empty nodes
              const parent = node.parentElement;
              if (!parent || 
                  parent.tagName === 'SCRIPT' || 
                  parent.tagName === 'STYLE' ||
                  parent.tagName === 'NOSCRIPT' ||
                  !node.textContent?.trim()) {
                return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_ACCEPT;
            }
          }
        );

        let node;
        while (node = walker.nextNode()) {
          textNodes.push(node);
        }

        // Translate text nodes in batches
        const batchSize = 10;
        for (let i = 0; i < textNodes.length; i += batchSize) {
          const batch = textNodes.slice(i, i + batchSize);
          
          await Promise.all(batch.map(async (node) => {
            const originalText = node.textContent?.trim();
            if (!originalText) return;

            try {
              const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  text: originalText,
                  targetLanguage: currentLanguage.code,
                  sourceLanguage: 'en'
                })
              });

              if (response.ok) {
                const data = await response.json();
                if (node.textContent && data.translatedText) {
                  node.textContent = data.translatedText;
                }
              }
            } catch (error) {
              console.error('Translation error:', error);
            }
          }));

          // Small delay between batches to avoid rate limits
          if (i + batchSize < textNodes.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      } catch (error) {
        console.error('Page translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    translatePage();
  }, [currentLanguage.code]);

  if (isTranslating) {
    return (
      <div className="fixed top-20 right-4 z-50 bg-[#209f00] text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Translating to {currentLanguage.nativeName}...</span>
      </div>
    );
  }

  return null;
}
