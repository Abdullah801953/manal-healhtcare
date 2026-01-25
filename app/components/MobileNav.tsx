"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, Languages, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { treatmentCategories } from "@/app/lib/treatments";

const mobileNavigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Our Blogs" },
];

const afterTreatmentsLinks = [
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
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="xl:hidden hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6 text-gray-900" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[90vw] max-w-[400px] p-0 overflow-hidden"
      >
        {/* Header with contact info */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white">
          <h2 className="text-lg font-semibold mb-3">Manal Healthcare</h2>
          <div className="space-y-2 text-sm">
            <a href="tel:0087578456820" className="flex items-center gap-2 hover:text-green-200 transition-colors">
              <Phone className="w-4 h-4" />
              <span>(00) 875 784 5682</span>
            </a>
            <a href="mailto:togetoinfo@gmail.com" className="flex items-center gap-2 hover:text-green-200 transition-colors">
              <Mail className="w-4 h-4" />
              <span>togetoinfo@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col overflow-y-auto max-h-[calc(100vh-280px)] p-4">
          {/* Main links before treatments */}
          {mobileNavigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50 border-b border-gray-100"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}

          {/* Treatments Menu with Submenu */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setTreatmentsOpen(!treatmentsOpen)}
              className="flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50 w-full"
            >
              <span>Treatments</span>
              {treatmentsOpen ? (
                <ChevronDown className="w-5 h-5 text-green-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {treatmentsOpen && (
              <div className="ml-2 mb-2 flex flex-col bg-gray-50 rounded-lg max-h-[200px] overflow-y-auto">
                <Link
                  href="/treatments"
                  onClick={() => setOpen(false)}
                  className="flex items-center py-2.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 px-4 border-b border-gray-200"
                >
                  <span>View All Treatments</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                {treatmentCategories.slice(0, 10).map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={`/treatments?category=${encodeURIComponent(treatment.category)}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-2 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200 px-4 hover:bg-gray-100"
                  >
                    <span>{treatment.category}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links after treatments */}
          {afterTreatmentsLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50 border-b border-gray-100"
            >
              <span>{link.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}

          {/* Info Menu with Submenu */}
          <div className="border-b border-gray-100">
            <button
              onClick={() => setInfoOpen(!infoOpen)}
              className="flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-green-600 transition-colors duration-200 px-3 rounded-lg hover:bg-gray-50 w-full"
            >
              <span>Info</span>
              {infoOpen ? (
                <ChevronDown className="w-5 h-5 text-green-600" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {infoOpen && (
              <div className="ml-2 mb-2 flex flex-col bg-gray-50 rounded-lg max-h-[200px] overflow-y-auto">
                {infoSubmenu.map((subLink) => (
                  <Link
                    key={subLink.href}
                    href={subLink.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-2 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200 px-4 hover:bg-gray-100"
                  >
                    <span>{subLink.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <div className="flex flex-col gap-3">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base rounded-full font-medium">
              Book Consultation
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-gray-300 hover:bg-gray-50 text-gray-800 py-2.5 text-sm rounded-full font-medium"
              >
                <Languages className="w-4 h-4 mr-2" />
                Language
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-green-600 text-green-600 hover:bg-green-50 py-2.5 text-sm rounded-full font-medium"
                asChild
              >
                <a href="tel:0087578456820">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};