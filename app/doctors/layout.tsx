import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Expert Doctors & Specialists | Manal Healthcare - Book Appointments',
  description:
    'Browse 100+ expert doctors and specialists at Manal Healthcare. Search by specialty: Cardiology, Orthopedics, Neurology, Pediatrics, and more. Book appointments with highly qualified physicians.',
  keywords: [
    'doctors',
    'medical specialists',
    'cardiologists',
    'orthopedic surgeons',
    'neurologists',
    'pediatricians',
    'expert physicians',
    'book doctor appointment',
    'manal healthcare doctors',
    'healthcare specialists',
    'medical professionals',
    'experienced doctors',
  ].join(', '),
  openGraph: {
    title: 'Expert Doctors & Specialists - Manal Healthcare',
    description:
      'Find and book appointments with 100+ expert doctors and specialists. Comprehensive medical care across all specialties.',
    type: 'website',
    images: [
      {
        url: '/doctor.png',
        width: 1200,
        height: 630,
        alt: 'Manal Healthcare Expert Doctors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expert Doctors & Specialists - Manal Healthcare',
    description:
      'Find and book appointments with 100+ expert doctors and specialists.',
    images: ['/doctor.png'],
  },
  alternates: {
    canonical: '/doctors',
  },
};

export default function DoctorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
