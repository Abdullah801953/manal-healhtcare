// Language configuration and API
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  rtl?: boolean;
}

// Supported languages list
export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
];

// Default language
export const defaultLanguage = 'en';

// API to fetch available languages (simulated)
export async function fetchAvailableLanguages(): Promise<Language[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In production, replace this with actual API call:
  // const response = await fetch('/api/languages');
  // return response.json();
  
  return languages;
}

// Get language by code
export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}

// Get language name by code
export function getLanguageName(code: string): string {
  const language = getLanguageByCode(code);
  return language?.nativeName || 'English';
}
