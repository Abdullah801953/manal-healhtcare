import { Suspense } from 'react';
import HospitalsContent from './components/HospitalsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Best Hospitals in India | JCI Accredited Medical Centers",
  description: "Partner with India's top JCI-accredited hospitals. Apollo, Fortis, Max, Medanta & more. State-of-art facilities, international patient services. 60% cost savings.",
  keywords: "best hospitals India, top hospitals India, JCI accredited hospitals, Apollo hospital, Fortis hospital, Max hospital, Medanta hospital, international patient services, healthcare facilities India, accredited hospitals",
  openGraph: {
    title: "India's Best JCI-Accredited Hospitals for International Patients",
    description: "World-class hospitals with international standards. Partner hospitals of Manal Healthcare. Apollo, Fortis, Max, Medanta & more.",
    type: "website",
    url: "https://www.manalhealthcare.com/hospitals",
    siteName: "Manal Healthcare",
    images: [{
      url: "/doctor.png",
      width: 1200,
      height: 630,
      alt: "Best JCI-accredited hospitals in India for medical tourists"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Best JCI-Accredited Hospitals in India - Manal Healthcare",
    description: "World-class hospitals with international standards. Partner hospitals across India.",
    images: ["/doctor.png"],
  },
  alternates: {
    canonical: "https://www.manalhealthcare.com/hospitals"
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

export default function HospitalsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading hospitals...</p>
        </div>
      </div>
    }>
      <HospitalsContent />
    </Suspense>
  );
}
