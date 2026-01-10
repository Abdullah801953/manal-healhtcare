"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const mobileNavigationLinks = [
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

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden hover:bg-gray-100">
          <Menu className="h-6 w-6 text-gray-900" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-75 sm:w-100">
        <nav className="flex flex-col gap-4 mt-8">
          {mobileNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-2 text-lg font-medium text-gray-700 hover:text-green-600 transition-colors"
            >
              {link.label}
              <ChevronRight className="w-5 h-5" />
            </Link>
          ))}
          <Button 
            variant="outline" 
            className="mt-4 bg-white border-2 border-green-600 rounded-full pl-6 pr-3 py-2.5 hover:bg-green-50 text-gray-900 font-medium text-base h-auto flex items-center justify-between w-full"
          >
            Language
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
              <ArrowRight className="w-4 h-4 text-gray-900" />
            </div>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
