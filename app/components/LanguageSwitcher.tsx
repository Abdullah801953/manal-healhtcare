"use client";

import { useState, useEffect } from 'react';
import { Languages, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Language, fetchAvailableLanguages } from '@/app/lib/i18n/languages';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch languages on component mount
  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    setIsLoadingLanguages(true);
    try {
      const availableLanguages = await fetchAvailableLanguages();
      setLanguages(availableLanguages);
    } catch (error) {
      console.error('Failed to load languages:', error);
    } finally {
      setIsLoadingLanguages(false);
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    changeLanguage(languageCode);
    setOpen(false);
    setSearchQuery('');
  };

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-11 rounded-full border-2 border-green-600 px-5 text-sm font-medium flex items-center gap-3 hover:bg-green-50"
        >
          <span className="hidden sm:inline">{currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
            <Languages className="h-4 w-4 text-green-700" />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Select Language</DialogTitle>
          <DialogDescription>
            Choose your preferred language for the website
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
          />
        </div>

        {/* Languages List */}
        <div className="flex-1 overflow-y-auto mt-4">
          {isLoadingLanguages ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#209f00]" />
              <span className="ml-3 text-gray-600">Loading languages...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={cn(
                    'flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left',
                    'hover:border-[#209f00] hover:bg-[#209f00]/5',
                    currentLanguage.code === language.code
                      ? 'border-[#209f00] bg-[#209f00]/10'
                      : 'border-gray-200'
                  )}
                >
                  <span className="text-3xl">{language.flag}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {language.nativeName}
                    </div>
                    <div className="text-sm text-gray-600">{language.name}</div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <Check className="w-5 h-5 text-[#209f00]" />
                  )}
                </button>
              ))}
            </div>
          )}

          {!isLoadingLanguages && filteredLanguages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No languages found</p>
            </div>
          )}
        </div>

        {/* Current Selection Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Currently selected:{' '}
            <span className="font-semibold text-gray-900">
              {currentLanguage.flag} {currentLanguage.nativeName}
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
