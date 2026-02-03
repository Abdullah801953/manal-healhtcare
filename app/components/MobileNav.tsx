"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { treatmentsData } from "@/app/treatments/data";

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
  const [settings, setSettings] = useState<any>(null);

  // Fetch settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.success) {
          setSettings(data.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

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
            {settings?.sitePhone && (
              <a 
                href={`tel:${settings.sitePhone.replace(/\s+/g, '')}`} 
                className="flex items-center gap-2 hover:text-green-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{settings.sitePhone}</span>
              </a>
            )}
            {settings?.siteEmail && (
              <a 
                href={`mailto:${settings.siteEmail}`} 
                className="flex items-center gap-2 hover:text-green-200 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{settings.siteEmail}</span>
              </a>
            )}
          </div>
          
          {/* Social Icons */}
          {(settings?.facebook || settings?.instagram || settings?.twitter || settings?.linkedin) && (
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-green-500/30">
              {settings?.facebook && (
                <a 
                  href={settings.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.instagram && (
                <a 
                  href={settings.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings?.twitter && (
                <a 
                  href={settings.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings?.linkedin && (
                <a 
                  href={settings.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
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
                {treatmentsData.slice(0, 10).map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={`/treatments/${treatment.slug || treatment.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-2 text-sm text-gray-700 hover:text-green-600 transition-colors duration-200 px-4 hover:bg-gray-100"
                  >
                    <span>{treatment.title}</span>
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
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base rounded-full font-medium"
            onClick={() => {
              setOpen(false);
              setTimeout(() => {
                const queryForm = document.getElementById('query-form');
                if (queryForm) {
                  queryForm.scrollIntoView({ behavior: 'smooth' });
                }
              }, 300);
            }}
          >
            Get Free Quote
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};