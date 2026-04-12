"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, ChevronDown, ArrowRight, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

interface MobileCategoryGroup {
  category: string;
  treatments: { _id: string; slug: string; title: string }[];
}

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const [openCategorySlug, setOpenCategorySlug] = useState<string | null>(null);
  const [categoryGroups, setCategoryGroups] = useState<MobileCategoryGroup[]>([]);
  const [settings, setSettings] = useState<any>(null);

  // Fetch settings and treatments from API
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

    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        const data = await response.json();
        if (data.success) {
          const active = data.data.filter((t: any) => t.status === 'active');
          const groupMap = new Map<string, MobileCategoryGroup>();
          active.forEach((t: any) => {
            if (!groupMap.has(t.category)) {
              groupMap.set(t.category, { category: t.category, treatments: [] });
            }
            groupMap.get(t.category)!.treatments.push({
              _id: t._id,
              slug: t.slug,
              title: t.title,
            });
          });
          setCategoryGroups(Array.from(groupMap.values()));
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchSettings();
    fetchTreatments();
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
              <div className="ml-2 mb-2 flex flex-col bg-gray-50 rounded-lg overflow-hidden">
                <Link
                  href="/treatments"
                  onClick={() => setOpen(false)}
                  className="flex items-center py-2.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200 px-4 border-b border-gray-200"
                >
                  <span>View All Treatments</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                {categoryGroups.map((group) => {
                  const isOpen = openCategorySlug === group.category;
                  return (
                    <div key={group.category} className="border-b border-gray-200 last:border-b-0">
                      <button
                        onClick={() => setOpenCategorySlug(isOpen ? null : group.category)}
                        className="flex items-center justify-between w-full py-2.5 px-4 text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-white transition-colors"
                      >
                        <span className="text-left leading-snug">{group.category}</span>
                        {isOpen ? (
                          <Minus className="w-4 h-4 shrink-0 ml-2 text-green-600" />
                        ) : (
                          <Plus className="w-4 h-4 shrink-0 ml-2 text-gray-400" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="bg-white border-t border-gray-100">
                          {group.treatments.map((t) => (
                            <Link
                              key={t._id}
                              href={`/treatments/${t.slug}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 py-2 pl-6 pr-4 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span>{t.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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

        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <Link href="/contact" onClick={() => setOpen(false)}>
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base rounded-full font-medium"
            >
              Get Free Quote
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};