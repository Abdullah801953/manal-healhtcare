"use client";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";
import { LanguageSelector } from "./LanguageSelector";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/30 backdrop-blur-md border-b border-gray-200">
      {/* Top Bar - Hidden on mobile */}
      <TopBar />

      {/* Main Header */}
      <div className="">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 md:gap-0">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <Image
                src={logo}
                alt="Manal Healthcare Logo"
                width={120}
                height={120}
                className="w-[100px] sm:w-[120px] lg:w-[150px]"
                style={{ height: 'auto' }}
                priority
              />
            </Link>

            {/* Desktop Navigation - visible on lg and up */}
            <div className="hidden lg:flex items-center gap-8">
              <MainNav />
            </div>

            <div className="hidden lg:block">
              <LanguageSelector />
            </div>

            {/* Mobile Navigation - visible on screens below lg */}
            <div className="lg:hidden bg-green-400 rounded-full text-white hover:bg-green-500 transition-colors duration-200 ">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
