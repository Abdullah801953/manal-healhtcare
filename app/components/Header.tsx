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
          <div className="flex items-center justify-between h-20 gap-5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="Manal Healthcare Logo"
                width={120}
                height={40}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop Navigation - visible on md and up */}
            <div className="hidden md:flex items-center gap-8">
              <MainNav />
            </div>

            {/* Mobile Navigation - visible on small screens only */}
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
