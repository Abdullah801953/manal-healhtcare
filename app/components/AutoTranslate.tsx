"use client";

import { useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePathname } from 'next/navigation';

// Cache for translations to avoid re-translating
const pageTranslationCache = new Map<string, Map<string, string>>();

export function AutoTranslate() {
  const { currentLanguage } = useLanguage();
  const pathname = usePathname(); // Track route changes
  const isTranslating = useRef(false);
  const originalTexts = useRef(new Map<Element, string>());
  const lastPathname = useRef(pathname);

  const translatePage = useCallback(async () => {
    if (currentLanguage.code === 'en' || isTranslating.current) {
      // Restore original texts when switching back to English
      if (currentLanguage.code === 'en' && originalTexts.current.size > 0) {
        originalTexts.current.forEach((text, element) => {
          if (element.textContent !== text) {
            element.textContent = text;
          }
        });
      }
      return;
    }

    // If pathname changed, clear cache for this page to force fresh translation
    if (lastPathname.current !== pathname) {
      lastPathname.current = pathname;
      originalTexts.current.clear();
    }

    isTranslating.current = true;

    try {
      // Get or create cache for this language
      let langCache = pageTranslationCache.get(currentLanguage.code);
      if (!langCache) {
        langCache = new Map<string, string>();
        pageTranslationCache.set(currentLanguage.code, langCache);
      }

      // Find all text nodes in the page
      const textElements: Element[] = [];
      const textsToTranslate: string[] = [];
      const textIndices: number[] = [];

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const text = node.textContent?.trim();
            if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
            
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            
            // Skip script, style, and input elements
            const tagName = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'iframe', 'textarea'].includes(tagName)) {
              return NodeFilter.FILTER_REJECT;
            }
            
            // Skip elements with data-no-translate attribute
            if (parent.closest('[data-no-translate]')) {
              return NodeFilter.FILTER_REJECT;
            }
            
            // Skip if already translated or is a URL/email/number
            if (/^[\d\s\-\+\(\)\.@:\/]+$/.test(text)) {
              return NodeFilter.FILTER_REJECT;
            }
            
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let node;
      while ((node = walker.nextNode())) {
        const element = node.parentElement;
        const text = node.textContent?.trim();
        
        if (element && text) {
          // Store original text
          if (!originalTexts.current.has(element)) {
            originalTexts.current.set(element, text);
          }
          
          const originalText = originalTexts.current.get(element) || text;
          
          // Check cache first
          if (langCache.has(originalText)) {
            element.textContent = langCache.get(originalText)!;
          } else {
            textElements.push(element);
            textsToTranslate.push(originalText);
            textIndices.push(textElements.length - 1);
          }
        }
      }

      // Batch translate uncached texts
      if (textsToTranslate.length > 0) {
        // Split into smaller batches to avoid URL length limits
        const batchSize = 20;
        for (let i = 0; i < textsToTranslate.length; i += batchSize) {
          const batchTexts = textsToTranslate.slice(i, i + batchSize);
          const batchElements = textElements.slice(i, i + batchSize);
          
          try {
            const response = await fetch('/api/translate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                texts: batchTexts,
                targetLang: currentLanguage.code,
                sourceLang: 'en',
              }),
            });

            const data = await response.json();

            if (data.success && data.translatedTexts) {
              data.translatedTexts.forEach((translatedText: string, index: number) => {
                const element = batchElements[index];
                const originalText = batchTexts[index];
                
                // Update element
                if (element && translatedText) {
                  element.textContent = translatedText;
                  // Cache the translation
                  langCache?.set(originalText, translatedText);
                }
              });
            }
          } catch (error) {
            console.error('Batch translation error:', error);
          }
          
          // Small delay between batches to be nice to the API
          if (i + batchSize < textsToTranslate.length) {
            await new Promise(resolve => setTimeout(resolve, 100));
          }
        }
      }
    } finally {
      isTranslating.current = false;
    }
  }, [currentLanguage.code, pathname]); // Added pathname to dependencies

  // Trigger translation on initial load and when route changes
  useEffect(() => {
    // Clear original texts when route changes to get fresh content
    originalTexts.current.clear();
    
    // Wait for page content to fully load before translating
    const timeoutId = setTimeout(() => {
      // Wait a bit more for dynamic content to render
      requestAnimationFrame(() => {
        setTimeout(() => {
          translatePage();
        }, 100);
      });
    }, 500); // Increased delay for route changes

    return () => clearTimeout(timeoutId);
  }, [currentLanguage.code, pathname, translatePage]); // Added pathname dependency

  // Force translation when window loads (for initial page load)
  useEffect(() => {
    const handleLoad = () => {
      if (currentLanguage.code !== 'en') {
        setTimeout(() => translatePage(), 500);
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [currentLanguage.code, pathname, translatePage]);

  // Re-translate when new content is added (for dynamic content)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      const hasNewTextNodes = mutations.some(mutation => 
        mutation.addedNodes.length > 0 || 
        (mutation.type === 'characterData' && mutation.target.textContent?.trim())
      );
      
      if (hasNewTextNodes && currentLanguage.code !== 'en') {
        // Debounce
        setTimeout(() => translatePage(), 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [currentLanguage.code, translatePage]);

  return null; // This component doesn't render anything
}
