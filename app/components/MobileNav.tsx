"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, Languages } from "lucide-react";
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
  { href: "/contact", label: "Contact Us" },
];

const infoSubmenu = [
  { href: "/info/plan-your-travel", label: "Plan Your Travel" },
  { href: "/info/medical-tourism-india", label: "Medical Tourism in India" },
  { href: "/info/advantages-medical-tourism", label: "Advantages of Medical Tourism" },
  { href: "/info/halal-certification", label: "Halal Certification" },
  { href: "/info/second-opinion", label: "Second Opinion" },
  { href: "/info/faqs-for-patient", label: "FAQs for Patient" },
  { href: "/info/medical-tourism", label: "Medical Tourism" },
  { href: "/info/best-hospital", label: "Best Hospital" },
  { href: "/info/privacy-policy", label: "Privacy Policy" },
  { href: "/info/terms-conditions", label: "Terms & Conditions" },
];

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[85vw] max-w-sm sm:w-96 md:w-[400px] p-4 sm:p-6"
      >
        {/* Close button for mobile */}

        <nav className="flex flex-col gap-3 mt-10 sm:mt-12 md:mt-14 overflow-y-auto max-h-[calc(100vh-200px)]">
          {mobileNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-2.5 sm:py-3 text-base sm:text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-2 rounded-lg hover:bg-gray-50"
            >
              <span className="truncate">{link.label}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400  shrink-0 ml-2" />
            </Link>
          ))}

          {/* Info Menu with Submenu */}
          <div>
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className="flex items-center justify-between py-2.5 sm:py-3 text-base sm:text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-2 rounded-lg hover:bg-gray-50 w-full"
            >
              <span className="truncate">Info</span>
              {infoOpen ? (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 ml-2" />
              ) : (
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 shrink-0 ml-2" />
              )}
            </button>
            
            {infoOpen && (
              <div className="ml-4 mt-1 flex flex-col gap-1">
                {infoSubmenu.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-2 sm:py-2.5 text-sm sm:text-base font-normal text-gray-700 hover:text-green-600 transition-colors duration-200 px-2 rounded-lg hover:bg-gray-50"
                  >
                    <span className="truncate">{subLink.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Language Button */}
          <Button 
            variant="outline" 
            className="mt-4 bg-white border-2 border-green-600 rounded-full px-8 sm:px-10 py-5 sm:py-5.5 hover:bg-green-50 text-gray-900 font-medium text-lg sm:text-xl h-auto flex items-center justify-between w-full transition-all duration-200"
          >
            <span className="truncate">Language</span>
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center shrink-0 ml-3 transition-colors">
              <Languages className="w-6 h-6" />
            </div>
          </Button>
        </nav>

        {/* Additional responsive elements */}
        <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col gap-3 sm:gap-4">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-3.5 text-sm sm:text-base rounded-full font-medium">
                Book Consultation
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50 text-gray-800 py-3 sm:py-3.5 text-sm sm:text-base rounded-full font-medium"
              >
                Emergency Contact
              </Button>
            </div>
            
            {/* Contact info for tablet/desktop */}
            <div className="hidden sm:block mt-6 text-center">
              <p className="text-sm text-gray-600">24/7 Support Available</p>
              <a 
                href="tel:+911234567890" 
                className="text-green-600 font-semibold text-lg hover:underline mt-1 inline-block"
              >
                +91 123 456 7890
              </a>
            </div>
          </div>

        {/* Bottom info for mobile */}
        <div className="absolute bottom-6 left-0 right-0 px-6 sm:hidden">
          <div className="text-center border-t border-gray-200 pt-4">
            <p className="text-xs text-gray-500">© 2024 Manal Healthcare</p>
            <p className="text-xs text-gray-500 mt-1">All rights reserved</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};