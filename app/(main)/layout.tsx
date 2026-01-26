import Header from "../components/Header";
import Footer from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SettingsProvider } from "../contexts/SettingsContext";
import { SEOMetaTags } from "../components/SEOMetaTags";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <SEOMetaTags />
        <WhatsAppButton />
        <Header />
        {children}
        <Footer />
      </SettingsProvider>
    </LanguageProvider>
  );
}
