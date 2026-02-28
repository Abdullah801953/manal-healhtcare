"use client";

import Link from "next/link";
import { Phone } from "lucide-react";

export function FreeQuoteButton() {
  return (
    <div className="fixed left-4 bottom-20 z-50 md:bottom-24 md:left-8">
      <Link href="/contact">
        <button
          className="flex items-center gap-2 px-4 py-3
                     text-sm font-semibold text-white
                     bg-gradient-to-r from-red-600 via-rose-600 to-red-700
                     rounded-full shadow-lg shadow-red-500/30
                     hover:shadow-red-500/50
                     hover:scale-105
                     transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
          <span>Get Free Quote</span>
        </button>
      </Link>
    </div>
  );
}