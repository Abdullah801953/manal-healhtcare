"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export const ContactButton = () => {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 left-3   z-50 md:hidden"
    >
      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-red-900 to-red-500 px-4 py-3 text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <span className="text-sm font-semibold whitespace-nowrap">
          Get Free Quote
        </span>
      </div>
    </Link>
  );
};