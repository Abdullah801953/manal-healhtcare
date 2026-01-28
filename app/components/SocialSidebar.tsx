"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import facebook from "@/public/facebook.svg";
import instagram from "@/public/instagram.svg";
import linkedin from "@/public/linkedin.svg";
import twitter from "@/public/twitter.svg";
import { useSettings } from "../contexts/SettingsContext";

export function SocialSidebar() {
  const { settings } = useSettings();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Only show on homepage
  const isHomepage = pathname === '/';

  useEffect(() => {
    if (!isHomepage) {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      // Check if we're in the hero section (roughly first viewport height)
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Show only when scrolled less than hero section height
      setIsVisible(scrollPosition < heroHeight);
    };

    // Check initial position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const socialLinks = [
    {
      name: "Facebook",
      icon: facebook,
      url: settings?.facebook?.trim(),
    },
    {
      name: "Instagram",
      icon: instagram,
      url: settings?.instagram?.trim(),
    },
    {
      name: "Twitter",
      icon: twitter,
      url: settings?.twitter?.trim(),
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      url: settings?.linkedin?.trim(),
    },
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 md:hidden"
    >
      <div className="flex flex-col gap-2">
        {socialLinks.map((social, index) => {
          if (!social.url) return null;
          
          return (
            <motion.div
              key={social.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
            >
              <Link
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-gray-700 hover:text-[#209F00] transition-colors"
                aria-label={social.name}
              >
                <div className="w-9 h-9 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    width={20} 
                    height={20}
                  />
                </div>
                
                {/* Tooltip */}
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.name}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
