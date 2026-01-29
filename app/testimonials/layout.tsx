import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patient Testimonials - Real Success Stories | Manal Healthcare',
  description: 'Read authentic patient testimonials and success stories from international patients who received world-class medical treatment at Manal Healthcare. 500+ verified reviews from 50+ countries with 98% patient satisfaction rate.',
  keywords: [
    'patient testimonials',
    'medical tourism reviews',
    'manal healthcare reviews',
    'india medical tourism testimonials',
    'patient success stories',
    'verified patient reviews',
    'international patient experiences',
    'healthcare testimonials india',
    'medical treatment reviews',
    'patient satisfaction',
    'cardiac surgery testimonials',
    'orthopedic surgery reviews',
    'cancer treatment success stories',
  ].join(', '),
  authors: [{ name: 'Manal Healthcare Network' }],
  openGraph: {
    title: 'Patient Testimonials - Real Success Stories | Manal Healthcare',
    description: '500+ verified patient testimonials from international patients. Read real success stories and experiences.',
    type: 'website',
    siteName: 'Manal Healthcare',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patient Testimonials | Manal Healthcare',
    description: 'Read authentic patient testimonials and success stories from around the world.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://manalhealthcare.com/testimonials',
  },
};

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
