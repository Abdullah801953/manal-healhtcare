"use client";

import { Phone, Mail, MapPin, Twitter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import linkedin from "@/public/linkedin.svg";
import twitter from "@/public/twitter.svg";

export const TopBar = () => {
  return (
    <div className="hidden lg:block bg-white border-b">
      <div className="container mx-auto px-10">
        <div className="flex items-center justify-between py-3 text-[18px]">
          {/* Left side - Contact Info */}
          <div className="flex items-center gap-10">
            <Link
              href="tel:0087578456820"
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-[#209F00]" />
              </div>
              <span>(00) 875 784 5682</span> &nbsp; &nbsp;
              <span className="text-2xl font-light">|</span>
            </Link>
            <Link
              href="mailto:togetoinfo@gmail.com"
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
            >
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-[#209F00]" />
              </div>
              <span>togetoinfo@gmail.com</span> &nbsp; &nbsp;{" "}
              <span className="text-2xl font-light">|</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-700">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#209F00]" />
              </div>
              <span>238, Arimantab, Moska - USA.</span>
            </div>
          </div>

          {/* Right side - Support & Social */}
          <div className="flex items-center gap-10">
            <span className="text-gray-700">Help / Support / Contact</span>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors "
                aria-label="Facebook"
              >
                <div className="w-9 h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                  <Image
                    src={facebook}
                    alt="Facebok"
                    className="w-5 h-5"
                  />
                </div>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <div className="w-9 h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                  <Image
                    src={instagram}
                    alt="Instagram"
                    className="w-5 h-5"
                  />
                </div>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <div className="w-9 h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                  <Image
                    src={twitter}
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </div>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <div className="w-9 h-9 bg-green-100 hover:bg-green-100 rounded-full flex items-center justify-center transition-colors">
                  <Image
                    src={linkedin}
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
