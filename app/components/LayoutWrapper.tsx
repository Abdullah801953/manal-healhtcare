"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import { Toaster } from "sonner";

// Lazy load non-critical components
const AutoTranslate = dynamic(() => import("./AutoTranslate").then(m => ({ default: m.AutoTranslate })), { ssr: false });
const SEOMetaTags = dynamic(() => import("./SEOMetaTags").then(m => ({ default: m.SEOMetaTags })), { ssr: false });

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin panel - no header, footer, or modals
    return (
      <>
        <Toaster position="top-center" richColors closeButton />
        {children}
      </>
    );
  }

  // Regular website - with header, footer, and modals
  return (
    <SettingsProvider>
      <LanguageProvider>
        <Toaster position="top-center" richColors closeButton />
        <AutoTranslate />
        <SEOMetaTags />
        <Header />
        {/* Spacer for fixed header */}
        <div className="h-16 sm:h-18 lg:h-32 xl:h-36" />
        <div className="overflow-x-clip w-full">
          {children}
          <Footer />
        </div>
      </LanguageProvider>
    </SettingsProvider>
  );
}
