"use client";

import { Phone, Mail, MapPin, Twitter,  } from "lucide-react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import linkedin from "@/public/linkedin.svg";
import twitter from "@/public/twitter.svg";


export const TopBar = () => {
  return (
    <div className="hidden lg:block bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 text-[18px]">
          {/* Left side - Contact Info */}
          <div className="flex items-center gap-2">
            <Link 
              href="tel:0087578456820" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-[#209F00]" />
              <span>(00) 875 784 5682</span>
            </Link>
            <Link 
              href="mailto:togetoinfo@gmail.com" 
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <Mail className="w-5 h-5 text-[#209F00]" />
              <span>togetoinfo@gmail.com</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-[#209F00]" />
              <span>238, Arimantab, Moska - USA.</span>
            </div>
          </div>

          {/* Right side - Support & Social */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Help / Support / Contact</span>
            <div className="flex items-center gap-2">
              <Link 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Image src={facebook} alt="Facebok" className="w-5 h-5"/>
              </Link>
              <Link 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                                <Image src={instagram} alt="Instagram" className="w-5 h-5" />

              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                               <Image src={twitter  } alt="Twitter"  className="w-6 h-6" />

              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Image src={linkedin} alt="LinkedIn"  className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
