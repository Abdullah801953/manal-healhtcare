import { NextResponse } from 'next/server';

// Simple in-memory cache for translated text
const translationCache = new Map<string, { text: string; timestamp: number }>();
const CACHE_DURATION = 1000 * 60 * 60 * 24 * 7; // 7 days cache

// Use Google Translate (completely FREE, no limits, no API key needed)
async function translateWithGoogle(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  
  if (!response.ok) {
    throw new Error(`Google Translate error: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  // Google returns nested array, combine all translated segments
  if (data && data[0]) {
    const translatedParts = data[0]
      .filter((part: any) => part && part[0])
      .map((part: any) => part[0]);
    return translatedParts.join('');
  }
  
  throw new Error('Invalid response from Google Translate');
}

// Batch translate multiple texts at once (more efficient)
async function batchTranslate(
  texts: string[],
  sourceLang: string,
  targetLang: string
): Promise<string[]> {
  // Join texts with a special separator that won't appear in normal text
  const separator = ' ||| ';
  const combined = texts.join(separator);
  
  const translated = await translateWithGoogle(combined, sourceLang, targetLang);
  
  // Split back into individual translations
  return translated.split(separator).map(t => t.trim());
}

export async function POST(request: Request) {
  let requestBody: { text?: string; texts?: string[]; targetLang: string; sourceLang?: string } = {
    targetLang: 'en'
  };
  
  try {
    requestBody = await request.json();
    const { text, texts, targetLang, sourceLang = 'en' } = requestBody;

    // Don't translate if target is English
    if (targetLang === 'en') {
      if (texts) {
        return NextResponse.json({ success: true, translatedTexts: texts });
      }
      return NextResponse.json({ success: true, translatedText: text });
    }

    // Handle batch translation
    if (texts && Array.isArray(texts)) {
      const results: string[] = [];
      const toTranslate: { index: number; text: string }[] = [];
      
      // Check cache for each text
      texts.forEach((t, index) => {
        const cacheKey = `${sourceLang}:${targetLang}:${t}`;
        const cached = translationCache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          results[index] = cached.text;
        } else {
          toTranslate.push({ index, text: t });
        }
      });
      
      // Translate uncached texts in batch
      if (toTranslate.length > 0) {
        try {
          const translated = await batchTranslate(
            toTranslate.map(t => t.text),
            sourceLang,
            targetLang
          );
          
          translated.forEach((translatedText, i) => {
            const original = toTranslate[i];
            results[original.index] = translatedText;
            
            // Cache result
            const cacheKey = `${sourceLang}:${targetLang}:${original.text}`;
            translationCache.set(cacheKey, {
              text: translatedText,
              timestamp: Date.now(),
            });
          });
        } catch (error) {
          // On error, use original texts for uncached items
          toTranslate.forEach(t => {
            results[t.index] = t.text;
          });
        }
      }
      
      return NextResponse.json({ success: true, translatedTexts: results });
    }

    // Handle single text translation
    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      );
    }

    // Check cache
    const cacheKey = `${sourceLang}:${targetLang}:${text}`;
    const cached = translationCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        translatedText: cached.text,
        cached: true,
      });
    }

    // Translate
    const translatedText = await translateWithGoogle(text, sourceLang, targetLang);

    // Cache result
    translationCache.set(cacheKey, {
      text: translatedText,
      timestamp: Date.now(),
    });

    return NextResponse.json({
      success: true,
      translatedText,
    });
  } catch (error: any) {
    console.error('Translation error:', error.message);
    
    return NextResponse.json({
      success: true,
      translatedText: requestBody?.text || '',
      translatedTexts: requestBody?.texts || [],
      fallback: true,
    });
  }
}
