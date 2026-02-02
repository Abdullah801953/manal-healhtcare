"use client";
import { useState } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { Languages, MessageCircleMore } from "lucide-react";
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
import { Check } from "lucide-react";

const Header = () => {
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { currentLanguage, setLanguage } = useLanguage();

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setLanguage(language);
    setLangOpen(false);
    setSearchQuery("");
  };

  const handleScrollToQuery = () => {
    const queryForm = document.getElementById('query-form');
    if (queryForm) {
      queryForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      {/* Top Bar - Hidden on mobile and tablet */}
      <TopBar />

      {/* Main Header */}
      <div className="">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src={logo}
                alt="Manal Healthcare Logo"
                width={120}
                height={120}
                className="w-[90px] sm:w-[100px] lg:w-[120px] xl:w-[140px]"
                style={{ height: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Navigation - visible on xl and up */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
              <MainNav />
            </div>

            <div className="hidden xl:block">
              <LanguageSelector />
            </div>

            {/* Mobile/Tablet Navigation - visible on screens below xl */}
            <div className="xl:hidden flex items-center gap-2 sm:gap-3">
              {/* Query Button */}
              <Button
                onClick={handleScrollToQuery}
                className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-3 sm:px-4 h-10 text-xs sm:text-sm"
              >
                <MessageCircleMore className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">Get Quote</span>
              </Button>
              
              {/* Language Button - compact version matching Get Quote style */}
              <Dialog open={langOpen} onOpenChange={setLangOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="flex bg-green-600 hover:bg-green-700 text-white font-medium rounded-full px-3 sm:px-4 h-10 text-xs sm:text-sm"
                  >
                    <Languages className="w-4 h-4 sm:mr-1" />
                    <span className="hidden sm:inline">Language</span>
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
                  <div className="py-4">
                    <Input
                      type="text"
                      placeholder="Search languages or countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </div>
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
                          <span className="text-2xl">{language.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-gray-900">{language.name}</span>
                            <span className="text-sm text-gray-500">{language.country}</span>
                          </div>
                          {currentLanguage.code === language.code && (
                            <Check className="w-5 h-5 text-[#209F00] ml-auto" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {/* Mobile Menu */}
              <div className="bg-green-600 rounded-full text-white hover:bg-green-700 transition-colors duration-200">
                <MobileNav />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
