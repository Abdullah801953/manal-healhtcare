# Language Translation Feature

## Overview
This website now supports automatic translation into 20+ languages using the free MyMemory Translation API.

## Features
- ✅ 20+ languages supported including Hindi, Spanish, French, German, Arabic, Chinese, Japanese, and more
- ✅ Country flags for easy identification
- ✅ Search functionality to quickly find languages
- ✅ Translation caching for better performance
- ✅ Persistent language preference (saved in localStorage)
- ✅ Free API - no paid subscriptions required

## How to Use

### For Users
1. Click the "Language" button in the navigation bar
2. A popup will open showing all available languages with country flags
3. Search for a language or scroll through the list
4. Click on your preferred language
5. The entire website will automatically translate to that language

### For Developers

#### Using the Translate Component
Wrap any text content with the `<Translate>` component:

```tsx
import { Translate } from '@/app/components/Translate';

<Translate>Hello World</Translate>
```

#### Using the useTranslate Hook
For programmatic translations:

```tsx
import { useTranslate } from '@/app/components/Translate';

const MyComponent = () => {
  const translate = useTranslate();
  
  const handleTranslate = async () => {
    const translated = await translate("Hello World");
    console.log(translated);
  };
  
  return <button onClick={handleTranslate}>Translate</button>;
};
```

#### Accessing Current Language
```tsx
import { useLanguage } from '@/app/contexts/LanguageContext';

const MyComponent = () => {
  const { currentLanguage } = useLanguage();
  
  return <div>Current language: {currentLanguage.name}</div>;
};
```

## Supported Languages
- 🇺🇸 English (United States)
- 🇮🇳 Hindi (India)
- 🇪🇸 Spanish (Spain)
- 🇫🇷 French (France)
- 🇩🇪 German (Germany)
- 🇸🇦 Arabic (Saudi Arabia)
- 🇵🇹 Portuguese (Portugal)
- 🇷🇺 Russian (Russia)
- 🇯🇵 Japanese (Japan)
- 🇨🇳 Chinese (China)
- 🇰🇷 Korean (South Korea)
- 🇮🇹 Italian (Italy)
- 🇹🇷 Turkish (Turkey)
- 🇳🇱 Dutch (Netherlands)
- 🇵🇱 Polish (Poland)
- 🇻🇳 Vietnamese (Vietnam)
- 🇹🇭 Thai (Thailand)
- 🇮🇩 Indonesian (Indonesia)
- 🇲🇾 Malay (Malaysia)
- 🇧🇩 Bengali (Bangladesh)

## Technical Details

### Translation API
- **Provider**: MyMemory Translation API
- **Cost**: FREE (no API key required)
- **Rate Limit**: 1000 translations per day (can be increased with registration)
- **Endpoint**: `https://api.mymemory.translated.net/get`

### Caching
- Translations are cached in memory to reduce API calls
- Cache is cleared when language changes
- Improves performance and reduces API usage

### Storage
- Selected language is saved in localStorage
- Language preference persists across sessions
- Key: `preferredLanguage`

## How to Add More Languages
Edit `app/contexts/LanguageContext.tsx` and add to the `languages` array:

```tsx
{ code: 'sw', name: 'Swahili', flag: '🇰🇪', country: 'Kenya' }
```

## Performance Tips
1. Translation happens automatically when language changes
2. Results are cached for better performance
3. Original text is shown during translation
4. Failed translations fall back to English

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Notes
- First translation may take 1-2 seconds due to API call
- Subsequent same text translations are instant (cached)
- Translation quality depends on MyMemory API
- Complex technical terms may not translate perfectly
- Works best for general content and UI elements
