"use client";

import { useEffect } from 'react';
import { useLanguage } from '@/app/contexts/LanguageContext';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

// Language code mapping for Google Translate
const languageCodeMap: { [key: string]: string } = {
  'en': 'en',
  'es': 'es',
  'fr': 'fr',
  'de': 'de',
  'zh': 'zh-CN',
  'ja': 'ja',
  'ar': 'ar',
  'hi': 'hi',
  'pt': 'pt',
  'ru': 'ru',
  'ko': 'ko',
  'it': 'it',
};

export function GoogleTranslateWidget() {
  const { currentLanguage } = useLanguage();

  useEffect(() => {
    // Add Google Translate script
    const addScript = () => {
      if (document.getElementById('google-translate-script')) return;

      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,zh-CN,ja,ar,hi,pt,ru,ko,it',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      } catch (error) {
        console.error('Google Translate initialization error:', error);
      }
    };

    addScript();

    // Add CSS to hide Google's default UI
    if (!document.getElementById('google-translate-styles')) {
      const style = document.createElement('style');
      style.id = 'google-translate-styles';
      style.innerHTML = `
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        #google_translate_element {
          position: fixed;
          bottom: 10px;
          right: 10px;
          z-index: 9999;
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        #google_translate_element:hover {
          opacity: 1;
        }
        .goog-te-gadget {
          font-family: inherit !important;
        }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: none !important;
          font-size: 10px !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    // Change language when currentLanguage changes
    const changeLanguage = () => {
      const googleLangCode = languageCodeMap[currentLanguage.code] || currentLanguage.code;
      
      // Try multiple methods to trigger translation
      const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
      if (iframe) {
        try {
          const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
          if (innerDoc) {
            const langLink = innerDoc.querySelector(`a[data-value="${googleLangCode}"]`) as HTMLElement;
            if (langLink) {
              langLink.click();
              return;
            }
          }
        } catch (e) {
          console.log('Could not access iframe:', e);
        }
      }

      // Alternative method: use select element
      const selectElement = document.querySelector('select.goog-te-combo') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = googleLangCode;
        selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        return;
      }

      // If both methods fail, try clicking the language link
      const langButtons = document.querySelectorAll('.goog-te-menu-value span');
      langButtons.forEach((button) => {
        if (button.textContent?.includes(currentLanguage.name)) {
          (button as HTMLElement).click();
        }
      });
    };

    // Wait for Google Translate to be fully loaded
    const checkAndTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        setTimeout(changeLanguage, 1000);
      } else {
        setTimeout(checkAndTranslate, 500);
      }
    };

    checkAndTranslate();
  }, [currentLanguage]);

  return (
    <div id="google_translate_element" title="Google Translate Widget" />
  );
}
