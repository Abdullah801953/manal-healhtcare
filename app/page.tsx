import type { Metadata } from "next";

import { Hero } from "./components/Hero";
import { InfoCards } from "./components/InfoCards";
import { Services } from "./components/Services";
import { AboutSection } from "./components/AboutSection";
import { ServicesMarquee } from "./components/ServicesMarquee";
import { LabTestBooking } from "./components/LabTestBooking";
import { DoctorsShowcase } from "./components/DoctorsShowcase";
import { NewsletterSection } from "./components/NewsletterSection";
import { BlogSection } from "./components/BlogSection";
import { FAQSection } from "./components/FAQSection";
import { OurServices } from "./components/OurServices";
import { Testimonials } from "./components/Testimonials";
import { WhatsAppButton } from "./components/WhatsAppButton";


/* =======================
   PAGE LEVEL SEO
======================= */
export const metadata: Metadata = {
  title: "Best Medical Tourism in India | Top Hospitals & Doctors - Manal Healthcare",
  description:
    "Manal Healthcare connects you with top hospitals, experienced doctors, and affordable medical tourism services in India. Trusted by 3000+ patients. World-class healthcare at affordable prices.",
  keywords: "medical tourism India, best hospitals India, top doctors India, healthcare India, affordable medical treatment, medical travel India, international patients, healthcare services, surgery India",
  openGraph: {
    title: "Best Medical Tourism in India - Manal Healthcare",
    description: "World-class healthcare at affordable prices. Top hospitals, experienced doctors, trusted by 3000+ patients.",
    type: "website",
    url: "https://manalhealthcare.com",
    siteName: "Manal Healthcare",
    images: [{
      url: "/doctor.png",
      width: 1200,
      height: 630,
      alt: "Manal Healthcare - Medical Tourism India",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Medical Tourism in India - Manal Healthcare",
    description: "World-class healthcare at affordable prices. Trusted by 3000+ patients.",
    images: ["/doctor.png"],
  },
  alternates: {
    canonical: "https://manalhealthcare.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const Page = () => {
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Manal Healthcare",
    "description": "Leading medical tourism provider in India connecting patients with top hospitals and experienced doctors.",
    "url": "https://manalhealthcare.com",
    "logo": "https://manalhealthcare.com/logo.png",
    "telephone": "+91-8287508755",
    "email": "info@manalhealthcare.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "238 Arimantab",
      "addressLocality": "Moska",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/manalhealthcare",
      "https://www.twitter.com/manalhealthcare",
      "https://www.linkedin.com/company/manalhealthcare"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "3000"
    }
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <WhatsAppButton />


      <main id="main-content">
        {/* ✅ SINGLE H1 FOR SEO */}
        <h1 className="sr-only">
          Medical Tourism in India – Top Hospitals & Doctors | Manal Healthcare
        </h1>

        <Hero />
        <Services />
        <AboutSection />
        <OurServices />
        <ServicesMarquee />
      <Testimonials/>
        <LabTestBooking />
        <DoctorsShowcase />
        <NewsletterSection />
        <BlogSection />
         <InfoCards />
        <FAQSection />
      </main>

     
    </>
  );
};

export default Page;
