import { NextRequest, NextResponse } from 'next/server';

// MyMemory Translation API - FREE (1000 words/day, no API key required)
// Alternative: LibreTranslate (self-hosted, unlimited)

export async function POST(request: NextRequest) {
  try {
    const { text, targetLanguage, sourceLanguage = 'en' } = await request.json();

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text and targetLanguage' },
        { status: 400 }
      );
    }

    // If source and target are the same, return original text
    if (sourceLanguage === targetLanguage) {
      return NextResponse.json({
        translatedText: text,
        sourceLanguage,
        targetLanguage,
      });
    }

    // Use MyMemory Translation API (FREE)
    const encodedText = encodeURIComponent(text);
    const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLanguage}|${targetLanguage}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if translation was successful
    if (data.responseStatus !== 200) {
      throw new Error(`Translation failed: ${data.responseDetails}`);
    }

    const translatedText = data.responseData.translatedText;

    return NextResponse.json({
      translatedText,
      sourceLanguage,
      targetLanguage,
      quality: data.responseData.match || 0, // Translation quality score
    });
  } catch (error) {
    console.error('Translation error:', error);
    // Return original text as fallback
    return NextResponse.json({
      translatedText: text,
      sourceLanguage,
      targetLanguage,
      error: 'Translation failed, returning original text',
    });
  }
}
