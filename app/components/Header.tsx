"use client";

import Image from "next/image";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Bar - Hidden on mobile */}
      <TopBar />
      
      {/* Main Header */}
      <div className="border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MH</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold text-gray-900">Manal Healthcare</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <MainNav />

            {/* Mobile Menu */}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;