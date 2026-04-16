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
import QuoteSection from "./components/ QuoteSection";
import { Hospitals } from "./components/Hospitals";
import connectDB from "@/lib/mongodb";
import FAQ from "@/lib/models/FAQ";
import Doctor from "@/lib/models/Doctor";
import Treatment from "@/lib/models/Treatment";
import { ContactButton } from "./components/ContactButton";
/* =======================
   PAGE LEVEL SEO
======================= */
export const metadata: Metadata = {
  title: "Manal Healthcare | Best Medical Tourism in India - Top Hospitals & Expert Doctors",
  description:
    "Manal Healthcare - Your trusted partner for world-class medical tourism in India. Connect with top hospitals, experienced doctors, and affordable healthcare solutions. Trusted by 3000+ international patients. Visit manalhealthcare.com for premium medical services.",
  keywords: "Manal Healthcare, manalhealthcare, manalhealthcare.com, medical tourism India, best hospitals India, top doctors India, healthcare India, affordable medical treatment, medical travel India, international patients India, surgery India, healthcare services India, medical tourism company, India medical tourism",
  openGraph: {
    title: "Manal Healthcare - Best Medical Tourism in India | manalhealthcare.com",
    description: "Manal Healthcare: World-class medical tourism services in India. Connect with top hospitals and expert doctors at affordable prices. Trusted by 3000+ patients worldwide.",
    type: "website",
    url: "https://manalhealthcare.com",
    siteName: "Manal Healthcare",
    images: [{
      url: "https://manalhealthcare.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Manal Healthcare - Medical Tourism India",
    }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manal Healthcare - Medical Tourism in India | manalhealthcare.com",
    description: "Manal Healthcare: World-class medical tourism services. Top hospitals, expert doctors, affordable prices. Trusted by 3000+ patients.",
    images: ["https://manalhealthcare.com/og-image.jpg"],
    site: "@manalhealthcare",
    creator: "@manalhealthcare",
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

// Fetch FAQs for structured data (server-side) - direct DB query
async function getFAQs() {
  return [];
}

// Fetch doctors server-side for instant rendering
async function getDoctors() {
  try {
    await connectDB();
    const doctors = await Doctor.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .lean();
    // Serialize MongoDB documents to plain objects
    return JSON.parse(JSON.stringify(doctors));
  } catch (error) {
    console.error('Failed to fetch doctors server-side:', error);
    return [];
  }
}

// Fetch treatments server-side for instant rendering
async function getTreatments() {
  try {
    await connectDB();
    const treatments = await Treatment.find({ status: 'active' })
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(treatments));
  } catch (error) {
    console.error('Failed to fetch treatments server-side:', error);
    return [];
  }
}

const Page = async () => {
  // Structured Data for SEO (JSON-LD) - Enhanced for better Google indexing
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Manal Healthcare",
    "alternateName": ["manalhealthcare", "manalhealthcare.com"],
    "description": "Manal Healthcare is India's leading medical tourism facilitator, connecting international patients with top-tier hospitals and experienced doctors across India. We specialize in providing world-class healthcare at affordable prices.",
    "url": "https://manalhealthcare.com",
    "logo": "https://manalhealthcare.com/logo.png",
    "image": "https://manalhealthcare.com/og-image.jpg",
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
      "https://www.instagram.com/manal_healthcare",
      "https://www.linkedin.com/company/manalhealthcare"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "reviewCount": "3000"
    },
    "founder": {
      "@type": "Person",
      "name": "Manal Healthcare Team"
    },
    "foundingDate": "2010",
    "slogan": "Your Health, Our Priority"
  };

  // Website Schema with brand emphasis
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Manal Healthcare",
    "alternateName": "manalhealthcare",
    "url": "https://manalhealthcare.com",
    "description": "Best medical tourism services in India - Manal Healthcare",
    "publisher": {
      "@type": "Organization",
      "name": "Manal Healthcare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://manalhealthcare.com/logo.png"
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://manalhealthcare.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Medical Tourism Services",
    "provider": {
      "@type": "MedicalOrganization",
      "name": "Manal Healthcare"
    },
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://manalhealthcare.com",
      "servicePhone": "+91-8287508755",
      "availableLanguage": ["English", "Arabic", "Hindi", "Russian", "French", "Spanish"]
    },
    "description": "Comprehensive medical tourism services including hospital selection, doctor consultation, treatment coordination, travel assistance, and post-treatment care."
  };



  // BreadcrumbList Schema
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://manalhealthcare.com"
      }
    ]
  };

  // Fetch FAQs server-side for structured data
  const faqs = await getFAQs();
  // Fetch doctors and treatments server-side for instant rendering
  const doctors = await getDoctors();
  const treatments = await getTreatments();
  const faqData = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {/* Enhanced Structured Data for Better Google Recognition */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
      
      <WhatsAppButton />
      <ContactButton />
   

      <main id="main-content">
        {/* ✅ SINGLE H1 FOR SEO */}
        <h1 className="sr-only ">
          Medical Tourism in India – Top Hospitals & Doctors | Manal Healthcare
        </h1>

      
    
        <Hero />
       
         <Services initialTreatments={treatments} />
        <QuoteSection/>
        <DoctorsShowcase initialDoctors={doctors} />
        <Hospitals />
        <AboutSection />
        <OurServices />
        <ServicesMarquee />
      <Testimonials/>
        {/* <LabTestBooking /> */}
        <NewsletterSection />
        <BlogSection />
         {/* <InfoCards /> */}
        <FAQSection />
  
      </main>

     
    </>
  );
};

export default Page;
