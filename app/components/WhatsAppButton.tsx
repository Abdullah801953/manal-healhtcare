"use client";

import whatsapp from "@/public/whatsapp.svg";                  
import { motion } from "framer-motion";
import Image from "next/image";
import { useSettings } from "../contexts/SettingsContext";

export function WhatsAppButton() {
  const { settings } = useSettings();

  const handleClick = () => {
    // Use WhatsApp number from settings
    const phoneNumber = settings?.whatsappNumber?.replace(/\D/g, '') || "918287508755";
    const message = "Hello! I'm interested in your healthcare services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
      aria-label="Contact us on WhatsApp"
    >
     <Image src={whatsapp} alt="WhatsApp" width={32} height={32} />      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us on WhatsApp
      </span>

      {/* Ripple effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
    </motion.button>
  );
}
