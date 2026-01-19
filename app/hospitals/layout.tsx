import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Hospitals & Medical Centers | Manal Healthcare - Top-Rated Facilities',
  description:
    'Discover top-rated hospitals and medical centers near you. Search by specialty, location, ratings, and amenities. Find the perfect healthcare facility with 24/7 emergency services, advanced technology, and expert medical staff.',
  keywords: [
    'hospitals near me',
    'medical centers',
    'healthcare facilities',
    'emergency hospital',
    'specialty hospitals',
    'teaching hospitals',
    'trauma centers',
    'hospital ratings',
    'hospital reviews',
    'manal healthcare',
    'best hospitals',
    'hospital finder',
    'medical facility search',
    'hospital comparison',
  ].join(', '),
  openGraph: {
    title: 'Find Hospitals & Medical Centers - Manal Healthcare',
    description:
      'Discover top-rated hospitals equipped with advanced technology, expert staff, and comprehensive healthcare services.',
    type: 'website',
    images: [
      {
        url: '/doctor.png',
        width: 1200,
        height: 630,
        alt: 'Manal Healthcare Hospitals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Hospitals & Medical Centers - Manal Healthcare',
    description:
      'Discover top-rated hospitals with advanced technology and expert medical staff.',
    images: ['/doctor.png'],
  },
};

export default function HospitalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
