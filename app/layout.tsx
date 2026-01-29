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
        url: "/og-image.jpg", // put this in public folder
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
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
