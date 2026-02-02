"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import { SEOMetaTags } from "./SEOMetaTags";
import { AutoTranslate } from "./AutoTranslate";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin panel - no header, footer, or modals
    return <>{children}</>;
  }

  // Regular website - with header, footer, and modals
  return (
    <SettingsProvider>
      <LanguageProvider>
        <AutoTranslate />
        <SEOMetaTags />
        <WhatsAppButton />
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-16 sm:h-18 lg:h-28" />
        <div className="overflow-x-clip w-full">
          {children}
          <Footer />
        </div>
      </LanguageProvider>
    </SettingsProvider>
  );
}
