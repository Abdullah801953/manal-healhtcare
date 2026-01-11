"use client";

import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { X } from "lucide-react";

export const TopBar = () => {
  return (
    <div className="hidden lg:block bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 text-sm">
          {/* Left side - Contact Info */}
          <div className="flex items-center gap-6">
            <Link 
              href="tel:0087578456820" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4 text-[#209F00]" />
              <span>(00) 875 784 5682</span>
            </Link>
            <Link 
              href="mailto:togetoinfo@gmail.com" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Mail className="w-4 h-4 text-[#209F00]" />
              <span>togetoinfo@gmail.com</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-[#209F00]" />
              <span>238, Arimantab, Moska - USA.</span>
            </div>
          </div>

          {/* Right side - Support & Social */}
          <div className="flex items-center ">
            <span className="text-gray-700">Help / Support / Contact</span>
            <div className="flex items-center gap-3">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-blue-700" />
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-red-900" />
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <X className="w-4 h-4 text-black" />
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-800" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
