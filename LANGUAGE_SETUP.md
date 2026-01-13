// How to Use the Language Switcher System

## Overview
This language system provides multi-language support for your website with API integration.

## Features
- 12 languages supported (English, Spanish, French, German, Chinese, Japanese, Arabic, Hindi, Portuguese, Russian, Korean, Italian)
- Language switcher popup with search functionality
- Persistent language selection (localStorage)
- RTL support for Arabic
- Google Translate API integration ready

## Usage

### 1. Using the Language Switcher
The language button is already integrated in the navbar. Click it to:
- See all available languages
- Search for languages
- Select your preferred language

### 2. Using Translations in Components

```tsx
"use client";

import { useLanguage } from '@/app/contexts/LanguageContext';

export function MyComponent() {
  const { currentLanguage, t, changeLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('welcome.title', 'Welcome to Manal Healthcare')}</h1>
      <p>{t('welcome.description', 'Your health is our priority')}</p>
      
      <p>Current language: {currentLanguage.nativeName}</p>
      
      <button onClick={() => changeLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  );
}
```

### 3. Translation Keys Structure

Create translation files in your backend/database:

```json
{
  "welcome": {
    "title": "Welcome to Manal Healthcare",
    "description": "Your health is our priority"
  },
  "navigation": {
    "home": "Home",
    "about": "About Us",
    "treatments": "Treatments",
    "hospitals": "Hospitals",
    "doctors": "Doctors",
    "contact": "Contact Us"
  },
  "common": {
    "loading": "Loading...",
    "error": "An error occurred",
    "success": "Success"
  }
}
```

### 4. Translation API (MyMemory - FREE)

**No setup required!** The system uses MyMemory Translation API which:
- ✅ Completely FREE
- ✅ No API key needed
- ✅ 1000 words/day limit
- ✅ Supports all major languages
- ✅ Ready to use out of the box

The API automatically translates text when users change language.

### 5. Programmatic Language Change

```tsx
const { changeLanguage } = useLanguage();

// Change to Spanish
changeLanguage('es');

// Change to Arabic (RTL)
changeLanguage('ar');
```

### 6. Available Languages

| Code | Language | Native Name |
|------|----------|-------------|
| en   | English  | English     |
| es   | Spanish  | Español     |
| fr   | French   | Français    |
| de   | German   | Deutsch     |
| zh   | Chinese  | 中文        |
| ja   | Japanese | 日本語      |
| ar   | Arabic   | العربية     |
| hi   | Hindi    | हिन्दी      |
| pt   | Portuguese | Português |
| ru   | Russian  | Русский     |
| ko   | Korean   | 한국어      |
| it   | Italian  | Italiano    |

## API Endpoints

### GET /api/languages
Returns list of available languages

### POST /api/translate
Translates text using Google Translate API

```json
{
  "text": "Hello",
  "targetLanguage": "es",
  "sourceLanguage": "en"
}
```

Response:
```json
{
  "translatedText": "Hola",
  "sourceLanguage": "en",
  "targetLanguage": "es"
}
```

## Components Created

1. `LanguageSwitcher` - The language button and popup dialog
2. `LanguageProvider` - Context provider for language state
3. `languages.ts` - Language configuration and API
4. `translations.ts` - Translation management
5. `/api/translate` - Translation API endpoint
6. `/api/languages` - Languages list API endpoint

## Notes

- Language preference is saved in localStorage
- Page automatically applies RTL for Arabic
- Dialog has search functionality for quick language selection
- System works without Google Translate API (returns original text)
- For production, implement server-side translation caching
