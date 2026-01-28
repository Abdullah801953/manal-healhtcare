import { Suspense } from 'react';
import DoctorsContent from './components/DoctorsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Top Doctors in India | 500+ Expert Medical Specialists",
  description: "Connect with India's leading doctors. Board-certified specialists in cardiology, orthopedics, oncology & more. 20+ years average experience. Book consultation today.",
  keywords: "top doctors India, best doctors India, medical specialists India, cardiologist India, orthopedic surgeon India, oncologist India, experienced doctors, board certified doctors, expert physicians",
  openGraph: {
    title: "500+ Top Medical Doctors in India - Expert Specialists",
    description: "Board-certified doctors with 20+ years experience. Connect with India's leading medical specialists across all specialties.",
    type: "website",
    url: "https://www.manalhealthcare.com/doctors",
    siteName: "Manal Healthcare",
    images: [{
      url: "/doctor.png",
      width: 1200,
      height: 630,
      alt: "Top medical doctors and specialists in India - Manal Healthcare"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "500+ Top Medical Doctors in India - Manal Healthcare",
    description: "Board-certified doctors with 20+ years experience. Connect with India's leading medical specialists.",
    images: ["/doctor.png"],
  },
  alternates: {
    canonical: "https://www.manalhealthcare.com/doctors"
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

export default function DoctorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    }>
      <DoctorsContent />
    </Suspense>
  );
}