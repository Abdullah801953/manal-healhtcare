// Translation storage and management
export type Translations = {
  [key: string]: string | Translations;
};

// Translation cache
const translationsCache = new Map<string, Translations>();

// Load translations for a language
export async function loadTranslations(languageCode: string): Promise<Translations> {
  // Check cache first
  if (translationsCache.has(languageCode)) {
    return translationsCache.get(languageCode)!;
  }

  try {
    // In production, fetch from API:
    // const response = await fetch(`/api/translations/${languageCode}`);
    // const translations = await response.json();
    
    // For now, return empty object - translations will be done via Google Translate API
    const translations: Translations = {};
    
    translationsCache.set(languageCode, translations);
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for ${languageCode}:`, error);
    return {};
  }
}

// Translate text using MyMemory Free Translation API
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en'
): Promise<string> {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage, sourceLanguage })
    });
    
    if (!response.ok) {
      throw new Error('Translation request failed');
    }
    
    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text as fallback
    return text;
  }
}

// Get translation by key
export function getTranslation(
  translations: Translations,
  key: string,
  fallback?: string
): string {
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
}
