"use client";
import logo from "@/public/logo.png"; 
import Image from "next/image";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { MainNav } from "./MainNav";
import { MobileNav } from "./MobileNav";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-blurred backdrop-blur-lg">
      {/* Top Bar - Hidden on mobile */}
      <TopBar />

      {/* Main Header */}
      <div className="">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 gap-5 ">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={logo}
                alt="Manal Healthcare Logo"
                width={150}
                height={150}
                priority
             
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
