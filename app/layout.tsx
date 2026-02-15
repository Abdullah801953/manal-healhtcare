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
    default: "Manal Healthcare | Best Medical Tourism in India",
    template: "%s | Manal Healthcare",
  },
  description:
    "Manal Healthcare offers world-class hospitals, top doctors, and affordable medical tourism services in India. Trusted by thousands of patients.",

  keywords: [
    "medical tourism india",
    "best hospitals in india",
    "top doctors in india",
    "affordable healthcare india",
    "manal healthcare",
  ],

  authors: [{ name: "Manal Healthcare" }],
  creator: "Manal Healthcare",
  publisher: "Manal Healthcare",

  metadataBase: new URL("https://manalhealthcare.com"),

  openGraph: {
    title: "Manal Healthcare | Best Medical Tourism in India",
    description:
      "Find top hospitals, expert doctors, and affordable medical treatments in India with Manal Healthcare.",
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
    title: "Manal Healthcare | Medical Tourism in India",
    description:
      "Trusted platform for top hospitals, doctors, and affordable medical tourism in India.",
    images: ["https://manalhealthcare.com/og-image.jpg"],
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
    google: "",
  },
  
  other: {
    "google-site-verification": "", // Alternative method for Google verification
  },
  
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data for SEO (JSON-LD)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Manal Healthcare",
    "url": "https://manalhealthcare.com",
    "logo": "https://manalhealthcare.com/logo.png",
    "description": "Manal Healthcare offers world-class hospitals, top doctors, and affordable medical tourism services in India. Trusted by thousands of patients worldwide.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.facebook.com/manalhealthcare",
      "https://www.instagram.com/manalhealthcare",
      "https://www.twitter.com/manalhealthcare",
      "https://www.linkedin.com/company/manalhealthcare"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "3000"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Manal Healthcare",
    "url": "https://manalhealthcare.com",
    "description": "Best Medical Tourism in India - World-class healthcare at affordable prices",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://manalhealthcare.com/search?q={search_term_string}",
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
