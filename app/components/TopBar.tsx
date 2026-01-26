"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import linkedin from "@/public/linkedin.svg";
import twitter from "@/public/twitter.svg";
import { useSettings } from "../contexts/SettingsContext";

export const TopBar = () => {
  const { settings, loading } = useSettings();

  // Debug log - will show in browser console
  if (typeof window !== 'undefined') {
    console.log('TopBar (client) - Settings:', {
      loading,
      facebook: settings?.facebook,
      twitter: settings?.twitter,
      instagram: settings?.instagram,
      linkedin: settings?.linkedin,
    });
  }

  return (
    <div className="hidden md:block bg-white border-b">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 lg:gap-0 py-2 md:py-2.5 lg:py-3 text-sm md:text-base lg:text-[18px]">
          {/* Left side - Contact Info */}
          <div className="flex items-center gap-0 md:gap-0 lg:gap-0 xl:gap-10 justify-center md:justify-start">
            <Link
              href={`tel:${settings?.sitePhone?.replace(/\D/g, '')}`}
              className="flex items-center gap-1.5 md:gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="lg:text-[15px] xl:text-base md:text-[12px] ">{settings?.sitePhone || 'Loading...'}</span>
              <span className="hidden lg:inline text-2xl font-light mx-2">|</span>
            </Link>
            <Link
              href={`mailto:${settings?.siteEmail}`}
              className="flex items-center gap-1.5 md:gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <div className="w-7 h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="lg:text-[15px] xl:text-base md:text-[12px] ">{settings?.siteEmail || 'Loading...'}</span>
              <span className="hidden lg:inline text-2xl font-light mx-2">|</span>
            </Link>
            <div className="flex items-center gap-1.5 md:gap-2 text-gray-700">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="lg:text-[15px] xl:text-base md:text-[12px] hidden lg:inline">{settings?.address || 'Loading...'}</span>
              <span className="lg:text-[15px] xl:text-base md:text-[12px] lg:hidden">{settings?.address?.split(',').slice(0, 2).join(',') || 'Loading...'}</span>
            </div>
          </div>

          {/* Right side - Support & Social */}
          <div className="flex flex-wrap items-center gap-3 md:gap-6 lg:gap-10 justify-center md:justify-end">
            <span className="text-gray-700 text-sm md:text-base hidden xl:inline">Help / Support / Contact</span>
            <div className="flex items-center gap-2 md:gap-3 lg:gap-4">
              {settings?.facebook?.trim() && (
                <Link
                  href={settings.facebook.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={facebook}
                      alt="Facebook"
                      className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.instagram?.trim() && (
                <Link
                  href={settings.instagram.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={instagram}
                      alt="Instagram"
                      className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.twitter?.trim() && (
                <Link
                  href={settings.twitter.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition-colors"
                  aria-label="X (Twitter)"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={twitter}
                      alt="Twitter"
                      className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.linkedin?.trim() && (
                <Link
                  href={settings.linkedin.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={linkedin}
                      alt="LinkedIn"
                      className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5"
                    />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
