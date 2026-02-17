import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "./components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =======================
   SEO METADATA (GLOBAL)
======================= */

export const metadata: Metadata = {
  title: {
    default: "Manal Healthcare | Medical Tourism in India - manalhealthcare.com",
    template: "%s | Manal Healthcare",
  },
  description:
    "Manal Healthcare (manalhealthcare.com) - Your trusted partner for medical tourism in India. World-class hospitals, expert doctors, and affordable healthcare solutions. Serving 3000+ international patients with excellence.",

  keywords: [
    "Manal Healthcare",
    "manalhealthcare",
    "manalhealthcare.com",
    "medical tourism india",
    "medical tourism company india",
    "best hospitals in india",
    "top doctors in india",
    "affordable healthcare india",
    "international patient services",
    "india medical travel",
    "healthcare tourism india",
  ],

  authors: [{ name: "Manal Healthcare" }],
  creator: "Manal Healthcare",
  publisher: "Manal Healthcare",

  metadataBase: new URL("https://manalhealthcare.com"),

  openGraph: {
    title: "Manal Healthcare - Medical Tourism in India | manalhealthcare.com",
    description:
      "Manal Healthcare: Leading medical tourism facilitator in India. Find top hospitals, expert doctors, and affordable treatments. Trusted by 3000+ international patients.",
    url: "https://manalhealthcare.com",
    siteName: "Manal Healthcare",
    images: [
      {
        url: "https://manalhealthcare.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manal Healthcare - Medical Tourism in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manal Healthcare - Medical Tourism India | manalhealthcare.com",
    description:
      "Manal Healthcare: Your trusted partner for medical tourism in India. Top hospitals, expert doctors, affordable prices.",
    images: ["https://manalhealthcare.com/og-image.jpg"],
    creator: "@manalhealthcare",
    site: "@manalhealthcare",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://manalhealthcare.com",
  },
  
  verification: {
    // Add your Google Search Console verification code here
    // Get it from: https://search.google.com/search-console
    // After adding your site, Google will provide a verification code
    google: "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
  },
  
  other: {
    "google-site-verification": "REPLACE_WITH_YOUR_GOOGLE_VERIFICATION_CODE",
    "msvalidate.01": "REPLACE_WITH_BING_VERIFICATION_CODE", // Optional: Bing Webmaster
    "brand": "Manal Healthcare",
    "company": "manalhealthcare",
  },
  
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Enhanced Structured Data for SEO (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Manal Healthcare",
    "alternateName": ["manalhealthcare", "manalhealthcare.com"],
    "legalName": "Manal Healthcare",
    "url": "https://manalhealthcare.com",
    "logo": "https://manalhealthcare.com/logo.png",
    "image": "https://manalhealthcare.com/og-image.jpg",
    "description": "Manal Healthcare is a premier medical tourism facilitator in India, connecting international patients with world-class hospitals, experienced doctors, and affordable healthcare solutions. Trust manalhealthcare.com for your medical journey.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8287508755",
      "contactType": "Customer Service",
      "email": "info@manalhealthcare.com",
      "availableLanguage": ["English", "Arabic", "Hindi", "Russian", "French", "Spanish", "Bengali"]
    },
    "sameAs": [
      "https://www.facebook.com/manalhealthcare",
      "https://www.instagram.com/manal_healthcare",
      "https://www.twitter.com/manalhealthcare",
      "https://www.linkedin.com/company/manalhealthcare"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "ratingCount": "3000",
      "reviewCount": "3000"
    },
    "knowsAbout": ["Medical Tourism", "Healthcare Services", "Hospital Coordination", "International Patient Care"],
    "slogan": "Your Health, Our Priority"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Manal Healthcare",
    "alternateName": ["manalhealthcare", "manalhealthcare.com"],
    "url": "https://manalhealthcare.com",
    "description": "Best medical tourism services in India - Manal Healthcare connects you with top hospitals and expert doctors",
    "inLanguage": ["en", "ar", "hi", "ru", "fr", "es", "bn"],
    "publisher": {
      "@type": "Organization",
      "name": "Manal Healthcare",
      "logo": {
        "@type": "ImageObject",
        "url": "https://manalhealthcare.com/logo.png",
        "width": "192",
        "height": "192"
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

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
