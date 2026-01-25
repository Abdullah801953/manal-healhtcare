"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { QueryFormModal } from "./QueryFormModal";
import { WhatsAppButton } from "./WhatsAppButton";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SEOMetaTags } from "./SEOMetaTags";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Admin panel - no header, footer, or modals
    return <>{children}</>;
  }

  // Regular website - with header, footer, and modals
  return (
    <LanguageProvider>
      <SEOMetaTags />
      <QueryFormModal />
      <WhatsAppButton />
      <Header />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
