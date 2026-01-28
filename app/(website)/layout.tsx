import Header from "../components/Header";
import Footer from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SEOMetaTags } from "../components/SEOMetaTags";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <SEOMetaTags />
      <WhatsAppButton />
      <Header />
      {children}
      <Footer />
    </LanguageProvider>
  );
}
