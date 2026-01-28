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
    <div className="bg-white border-b">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 lg:gap-0 py-2 md:py-2.5 lg:py-3">
          {/* Left side - Contact Info */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8 text-xs sm:text-sm md:text-base">
            <Link
              href={`tel:${settings?.sitePhone?.replace(/\D/g, '')}`}
              className="flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-[#209F00] transition-colors"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm lg:text-base whitespace-nowrap">{settings?.sitePhone || 'Loading...'}</span>
            </Link>
            
            <span className="hidden sm:inline text-gray-300">|</span>
            
            <Link
              href={`mailto:${settings?.siteEmail}`}
              className="flex items-center gap-1 sm:gap-1.5 text-gray-700 hover:text-[#209F00] transition-colors"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="text-[11px] sm:text-xs md:text-sm lg:text-base break-all sm:break-normal">{settings?.siteEmail || 'Loading...'}</span>
            </Link>
            
            <span className="hidden md:inline text-gray-300">|</span>
            
            <div className="hidden md:flex items-center gap-1.5 text-gray-700">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#209F00]" />
              </div>
              <span className="text-sm lg:text-base truncate max-w-[150px] lg:max-w-[200px] xl:max-w-none">
                {settings?.address?.split(',').slice(0, 2).join(',') || 'Loading...'}
              </span>
            </div>
          </div>

          {/* Right side - Support & Social */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <span className="text-gray-700 text-sm hidden xl:inline whitespace-nowrap">Help / Support / Contact</span>
            <div className="hidden md:flex items-center gap-1.5 sm:gap-2 md:gap-3">
              {settings?.facebook?.trim() && (
                <Link
                  href={settings.facebook.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#209F00] transition-colors"
                  aria-label="Facebook"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={facebook}
                      alt="Facebook"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.instagram?.trim() && (
                <Link
                  href={settings.instagram.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#209F00] transition-colors"
                  aria-label="Instagram"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={instagram}
                      alt="Instagram"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.twitter?.trim() && (
                <Link
                  href={settings.twitter.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#209F00] transition-colors"
                  aria-label="X (Twitter)"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={twitter}
                      alt="Twitter"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    />
                  </div>
                </Link>
              )}
              {settings?.linkedin?.trim() && (
                <Link
                  href={settings.linkedin.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#209F00] transition-colors"
                  aria-label="LinkedIn"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                    <Image
                      src={linkedin}
                      alt="LinkedIn"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
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
