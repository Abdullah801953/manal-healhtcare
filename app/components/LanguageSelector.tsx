"use client";

import { useState } from "react";
import { Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage, languages } from "@/app/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

export const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setLanguage(language);
    setOpen(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="gap-2 border-2 border-[#209F00] text-[#209F00] hover:bg-[#209F00] hover:text-white font-medium rounded-full px-11 py-6 text-lg"
        >
          <Languages className="w-6 h-6" size={"40"}/>
          <span className="hidden md:hidden xl:block">Language</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Select Language
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Choose your preferred language. The website will be translated automatically.
          </DialogDescription>
        </DialogHeader>

        {/* Search Input */}
        <div className="py-4">
          <Input
            type="text"
            placeholder="Search languages or countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Language Grid */}
        <div className="overflow-y-auto flex-1 pr-2 scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredLanguages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageSelect(language)}
                className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:border-[#209F00] hover:bg-green-50 ${
                  currentLanguage.code === language.code
                    ? "border-[#209F00] bg-green-50"
                    : "border-gray-200"
                }`}
              >
                <span className="text-3xl">{language.flag}</span>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">{language.name}</p>
                  <p className="text-sm text-gray-600">{language.country}</p>
                </div>
                {currentLanguage.code === language.code && (
                  <Check className="w-5 h-5 text-[#209F00]" />
                )}
              </button>
            ))}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No languages found matching "{searchQuery}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
