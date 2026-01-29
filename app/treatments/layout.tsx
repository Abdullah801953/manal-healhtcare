import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Medical Treatments & Procedures | Manal Healthcare - Advanced Healthcare Services',
  description:
    'Explore comprehensive medical treatments and procedures at Manal Healthcare. We offer advanced cardiology, orthopedics, neurology, urology, and general surgery services with expert physicians and cutting-edge technology.',
  keywords: [
    'medical treatments',
    'healthcare procedures',
    'cardiology treatments',
    'orthopedic surgery',
    'neurology procedures',
    'urology services',
    'general surgery',
    'manal healthcare',
    'advanced medical care',
    'hospital treatments',
    'surgical procedures',
    'minimally invasive surgery',
  ].join(', '),
  openGraph: {
    title: 'Medical Treatments & Procedures - Manal Healthcare',
    description:
      'Discover our range of specialized treatments delivered by expert physicians using cutting-edge technology and compassionate care.',
    type: 'website',
    images: [
      {
        url: '/doctor.png',
        width: 1200,
        height: 630,
        alt: 'Manal Healthcare Medical Treatments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medical Treatments & Procedures - Manal Healthcare',
    description:
      'Discover our range of specialized treatments delivered by expert physicians using cutting-edge technology.',
    images: ['/doctor.png'],
  },
};

export default function TreatmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
