"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/public/logo.png";
import { useSettings } from "../contexts/SettingsContext";
import { useState, useEffect } from "react";
// Footer data organized for reusability
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact US" },
  { href: "/blogs", label: "Blogs" },
  { href: "/doctors", label: "Doctors" },
];

const utilityPages = [
  { href: "/password-protected", label: "Password Protected" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact US" },
  { href: "/blogs", label: "Blogs" },
  { href: "/doctors", label: "Doctors" },
];

const Footer = () => {
  const { settings } = useSettings();
  const [treatments, setTreatments] = useState<any[]>([]);

  // Fetch treatments from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments?status=active');
        const data = await response.json();
        
        if (data.success) {
          // Get unique categories and limit to 6
          const uniqueCategories = Array.from(
            new Map(
              data.data.map((t: any) => [t.category, t])
            ).values()
          ).slice(0, 6);
          setTreatments(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, []);

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 py-8 xs:py-10 sm:py-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 xs:gap-8 lg:gap-6">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src={logo}
                alt="Manal Healthcare Logo"
                width={120}
                height={40}
                priority
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Manal Healthcare provides trusted Medical Tourism services in
              India, connecting patients with top hospitals and experienced
              doctors.{" "}
              <a href="/contact" className="text-[#209F00] underline">
                Book your consultation today
              </a>
              .
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Get In Touch
            </h3>
            <div className="space-y-4">
              {/* Location */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{settings?.address || 'Loading...'}</span>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 shrink-0" />
                    <Link
                      href={`tel:${settings?.sitePhone?.replace(/\D/g, '')}`}
                      className="hover:text-primary transition-colors"
                    >
                      {settings?.sitePhone || 'Loading...'}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 shrink-0" />
                    <Link
                      href={`mailto:${settings?.siteEmail}`}
                      className="hover:text-primary transition-colors"
                    >
                      {settings?.siteEmail || 'Loading...'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {(settings?.facebook || settings?.twitter || settings?.instagram || settings?.linkedin || settings?.youtube) && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Follow Us</h4>
                  <div className="flex items-center gap-3">
                    {settings?.facebook && (
                      <Link
                        href={settings.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1877F2] transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </Link>
                    )}
                    {settings?.twitter && (
                      <Link
                        href={settings.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#1DA1F2] transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                    )}
                    {settings?.instagram && (
                      <Link
                        href={settings.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#E4405F] transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                    )}
                    {settings?.linkedin && (
                      <Link
                        href={settings.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#0A66C2] transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    )}
                    {settings?.youtube && (
                      <Link
                        href={settings.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-[#FF0000] transition-colors"
                      >
                        <Youtube className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Our Services
            </h3>
            <ul className="space-y-3">
              {utilityPages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Our Treatments
            </h3>
            <ul className="space-y-3">
              {treatments.length > 0 ? (
                treatments.map((treatment) => (
                  <li key={treatment._id}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{treatment.category}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Loading services...</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-200 border-t border-gray-300">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 py-4">
          <p className="text-center text-sm text-gray-700">
            Copyright © <span className="font-semibold">FAAB</span> |
            Designed & Powered by <span className="font-semibold">FAAB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
