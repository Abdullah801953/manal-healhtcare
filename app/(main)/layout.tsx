import Header from "../components/Header";
import Footer from "../components/Footer";
import { QueryFormModal } from "../components/QueryFormModal";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { LanguageProvider } from "../contexts/LanguageContext";
import { SEOMetaTags } from "../components/SEOMetaTags";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
