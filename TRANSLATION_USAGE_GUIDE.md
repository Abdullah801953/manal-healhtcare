# How to Use Translation in Your Website

## Quick Start Guide

The translation system is now fully integrated! Here's how to use it:

## 1. Basic Usage - Wrap Text with Translate Component

For any text content you want to translate, simply wrap it with the `<Translate>` component:

### Example 1: Simple Text
```tsx
import { Translate } from '@/app/components/Translate';

<h1>
  <Translate>Welcome to Manal Healthcare</Translate>
</h1>
```

### Example 2: Paragraph Text
```tsx
<p>
  <Translate>
    We provide world-class healthcare services in India with experienced doctors and modern facilities.
  </Translate>
</p>
```

### Example 3: Button Text
```tsx
<Button>
  <Translate>Get a quote</Translate>
</Button>
```

## 2. Using Translation in Your Components

### Hero Component Example
```tsx
"use client";

import { Translate } from '@/app/components/Translate';

export const Hero = () => {
  return (
    <div>
      <h1>
        <Translate>Enhancing Lives, Reviving Health for a Better Tomorrow</Translate>
      </h1>
      
      <p>
        <Translate>
          Your trusted partner in Medical Tourism in India, connecting you with top hospitals and experienced doctors.
        </Translate>
      </p>
      
      <button>
        <Translate>Learn More</Translate>
      </button>
    </div>
  );
};
```

### Services Component Example
```tsx
"use client";

import { Translate } from '@/app/components/Translate';

export const Services = () => {
  return (
    <section>
      <h2>
        <Translate>Our Top Treatments</Translate>
      </h2>
      
      <p>
        <Translate>Innovative Medical Treatments for Modern Healthcare</Translate>
      </p>
    </section>
  );
};
```

## 3. Dynamic Content Translation

For dynamic content or programmatic translations, use the `useTranslate` hook:

```tsx
"use client";

import { useTranslate } from '@/app/components/Translate';
import { useState, useEffect } from 'react';

export const DynamicComponent = () => {
  const translate = useTranslate();
  const [translatedTitle, setTranslatedTitle] = useState('');
  
  useEffect(() => {
    const translateContent = async () => {
      const result = await translate("Welcome to our hospital");
      setTranslatedTitle(result);
    };
    
    translateContent();
  }, [translate]);
  
  return <h1>{translatedTitle}</h1>;
};
```

## 4. Accessing Current Language

To check what language is currently selected:

```tsx
"use client";

import { useLanguage } from '@/app/contexts/LanguageContext';

export const MyComponent = () => {
  const { currentLanguage } = useLanguage();
  
  return (
    <div>
      <p>Current language: {currentLanguage.name}</p>
      <p>Language code: {currentLanguage.code}</p>
      <p>Country: {currentLanguage.country}</p>
      <p>Flag: {currentLanguage.flag}</p>
    </div>
  );
};
```

## 5. Complete Page Example

Here's a complete page using translations:

```tsx
"use client";

import { Translate } from '@/app/components/Translate';
import { useLanguage } from '@/app/contexts/LanguageContext';

export default function AboutPage() {
  const { currentLanguage } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Show current language */}
      <div className="mb-4 text-sm text-gray-600">
        Reading in: {currentLanguage.flag} {currentLanguage.name}
      </div>
      
      {/* Translated heading */}
      <h1 className="text-4xl font-bold mb-6">
        <Translate>About Manal Healthcare</Translate>
      </h1>
      
      {/* Translated content */}
      <div className="space-y-4">
        <p className="text-lg">
          <Translate>
            Manal Healthcare is a leading medical tourism company in India, 
            providing world-class healthcare services to international patients.
          </Translate>
        </p>
        
        <p>
          <Translate>
            We partner with top hospitals and experienced doctors across India 
            to ensure you receive the best possible care.
          </Translate>
        </p>
        
        {/* Translated list */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          <Translate>Our Services</Translate>
        </h2>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><Translate>Cardiac Surgery</Translate></li>
          <li><Translate>Orthopedic Treatment</Translate></li>
          <li><Translate>Cancer Treatment</Translate></li>
          <li><Translate>Brain and Spine Surgery</Translate></li>
        </ul>
      </div>
    </div>
  );
}
```

## 6. Best Practices

### ✅ DO:
- Wrap user-facing text with `<Translate>` component
- Keep translation strings concise and clear
- Use translations for headings, paragraphs, buttons, labels
- Test translations in multiple languages

### ❌ DON'T:
- Translate code, URLs, or technical identifiers
- Nest multiple `<Translate>` components
- Translate very long paragraphs (break them into smaller chunks)
- Use translations for CSS class names or data attributes

## 7. Where to Add Translations

Add `<Translate>` to these common areas:

### Navigation/Header
```tsx
<Translate>Home</Translate>
<Translate>About Us</Translate>
<Translate>Treatments</Translate>
<Translate>Contact Us</Translate>
```

### Hero Section
```tsx
<Translate>Your main headline here</Translate>
<Translate>Your subheading here</Translate>
```

### Service Cards
```tsx
<Translate>Brain and Spine Surgery</Translate>
<Translate>Expert brain and spine surgery services with world-class facilities</Translate>
<Translate>Learn More</Translate>
```

### Forms
```tsx
<Translate>Name</Translate>
<Translate>Email</Translate>
<Translate>Phone Number</Translate>
<Translate>Submit</Translate>
```

### Footer
```tsx
<Translate>Quick Links</Translate>
<Translate>Contact Information</Translate>
<Translate>Follow Us</Translate>
```

## 8. Testing Your Translations

1. Click the "Language" button in the navbar
2. Select a language (try Hindi or Spanish first)
3. Wait 1-2 seconds for translation to load
4. Verify all wrapped text is translated
5. Check that layout still looks good
6. Test on mobile devices

## 9. Troubleshooting

### Translation not working?
- Make sure component is wrapped with `"use client"` directive
- Check that text is inside `<Translate>` component
- Verify internet connection (API requires network)
- Check browser console for errors

### Translation too slow?
- First translation takes 1-2 seconds (API call)
- Subsequent same text is instant (cached)
- Consider translating only essential content
- Keep text chunks smaller

### Wrong translation?
- Translation quality depends on the API
- Technical terms may not translate well
- Try rephrasing the English text
- Some languages work better than others

## 10. API Information

- **Provider**: MyMemory Translation API
- **Cost**: FREE (no API key needed)
- **Limit**: 1000 translations/day
- **Cache**: Results are cached in memory
- **Fallback**: Shows original English text if translation fails

## Support

If you need help implementing translations on specific pages, please ask!
