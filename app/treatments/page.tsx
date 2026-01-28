import { Suspense } from 'react';
import TreatmentsContent from './components/TreatmentsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Medical Treatments in India | 50+ Specialties - Manal Healthcare",
  description: "Browse 50+ medical treatments in India. Cardiac surgery, orthopedic care, cancer treatment, cosmetic procedures at 60% lower costs. Get free consultation now.",
  keywords: "medical treatments India, surgery India, healthcare procedures, cardiac surgery India, orthopedic treatment, cancer care India, cosmetic surgery India, medical procedures, affordable treatment",
  openGraph: {
    title: "50+ Medical Treatments in India - Affordable & World-Class",
    description: "Expert medical treatments at 60% lower costs. Cardiac, orthopedic, cancer care & more. Trusted by international patients.",
    type: "website",
    url: "https://www.manalhealthcare.com/treatments",
    siteName: "Manal Healthcare",
    images: [{
      url: "/doctor.png",
      width: 1200,
      height: 630,
      alt: "Medical treatments available in India through Manal Healthcare"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "50+ Medical Treatments in India - Manal Healthcare",
    description: "Expert medical treatments at 60% lower costs. Cardiac, orthopedic, cancer care & more.",
    images: ["/doctor.png"],
  },
  alternates: {
    canonical: "https://www.manalhealthcare.com/treatments"
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

export default function TreatmentsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading treatments...</p>
        </div>
      </div>
    }>
      <TreatmentsContent />
    </Suspense>
  );
}
