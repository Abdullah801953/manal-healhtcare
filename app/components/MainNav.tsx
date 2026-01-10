"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Our Blogs" },
  { href: "/treatments", label: "Treatments" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/doctors", label: "Doctors" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact Us" },
];

export const MainNav = () => {
  return (
    <div className="hidden lg:flex items-center gap-6">
      <nav className="flex items-center gap-7">
        {navigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-800 hover:text-green-600 transition-colors text-sm font-medium whitespace-nowrap"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Button 
        variant="outline" 
        className="bg-white border-2 border-green-600 rounded-full pl-6 pr-3 py-2.5 hover:bg-green-50 transition-all text-gray-900 font-medium text-base h-auto flex items-center gap-3"
      >
        Language
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-gray-900" />
        </div>
      </Button>
    </div>
  );
};
