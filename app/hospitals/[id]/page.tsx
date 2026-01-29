import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalDetailHero from './components/HospitalDetailHero';
import HospitalOverview from './components/HospitalOverview';
import SpecialtiesServices from './components/SpecialtiesServices';
import AccreditationsSection from './components/AccreditationsSection';
import VisitingInfo from './components/VisitingInfo';
import HospitalSEOContent from './components/HospitalSEOContent';
import RelatedHospitals from './components/RelatedHospitals';

interface HospitalDetailPageProps {
  params: Promise<{ id: string }>;
}

// Fetch hospital from API (by slug or ID)
async function getHospital(slugOrId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/hospitals/${slugOrId}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching hospital:', error);
    return null;
  }
}

// Fetch related hospitals
async function getRelatedHospitals(type: string, excludeId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/hospitals?type=${encodeURIComponent(type)}&status=active`, {
      cache: 'no-store',
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    if (data.success) {
      return data.data
        .filter((h: any) => h._id !== excludeId)
        .slice(0, 3);
    }
    return [];
  } catch (error) {
    console.error('Error fetching related hospitals:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: HospitalDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const hospital = await getHospital(id);

  if (!hospital) {
    return {
      title: 'Hospital Not Found | Manal Healthcare',
    };
  }

  return {
    title: `${hospital.name} - ${hospital.city}, ${hospital.state} | Manal Healthcare`,
    description: `${hospital.description.substring(0, 155)}... ${hospital.beds} beds, ${hospital.specialties.length}+ specialties, rated ${hospital.rating}/5 stars.`,
    keywords: [
      hospital.name,
      hospital.type,
      `hospital in ${hospital.city}`,
      `${hospital.city} hospital`,
      ...hospital.specialties,
      ...hospital.facilities.slice(0, 5),
      'healthcare facility',
      'medical center',
      'hospital services',
      'emergency care',
      'accredited hospital',
    ].join(', '),
    authors: [{ name: 'Manal Healthcare Network' }],
    openGraph: {
      title: `${hospital.name} - ${hospital.city}, ${hospital.state}`,
      description: hospital.shortDescription,
      type: 'article',
      siteName: 'Manal Healthcare',
      locale: 'en_US',
      images: [
        {
          url: hospital.image || '/default-hospital.jpg',
          width: 1200,
          height: 630,
          alt: hospital.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${hospital.name} - Manal Healthcare`,
      description: hospital.shortDescription,
      images: [hospital.image || '/default-hospital.jpg'],
      creator: '@manalhealthcare',
    },
    alternates: {
      canonical: `/hospitals/${id}`,
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
}

export default async function HospitalDetailPage({
  params,
}: HospitalDetailPageProps) {
  const { id } = await params;
  const hospital = await getHospital(id);

  if (!hospital) {
    notFound();
  }

  // Get related hospitals of the same type
  const relatedHospitals = await getRelatedHospitals(hospital.type, hospital._id);
  const hospitalSlug = hospital.slug || hospital._id;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HospitalDetailHero hospital={hospital} />

      {/* Overview */}
      <HospitalOverview hospital={hospital} />

      {/* Specialties & Services */}
      <SpecialtiesServices hospital={hospital} />

      {/* Accreditations */}
      <AccreditationsSection hospital={hospital} />

      {/* Visiting Information */}
      {/* <VisitingInfo /> */}

      {/* SEO Content */}
      <HospitalSEOContent hospital={hospital} />

      {/* Related Hospitals */}
      <RelatedHospitals hospitals={relatedHospitals} />

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Hospital',
            name: hospital.name,
            description: hospital.description,
            image: hospital.image,
            address: {
              '@type': 'PostalAddress',
              streetAddress: hospital.location,
              addressLocality: hospital.city,
              addressRegion: hospital.state,
              addressCountry: 'US',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: hospital.rating.toString(),
              reviewCount: hospital.reviewCount.toString(),
              bestRating: '5',
              worstRating: '1',
            },
            medicalSpecialty: hospital.specialties,
            availableService: hospital.facilities.map((facility) => ({
              '@type': 'Service',
              name: facility,
            })),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.manalhealthcare.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Hospitals',
                item: 'https://www.manalhealthcare.com/hospitals',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: hospital.name,
                item: `https://www.manalhealthcare.com/hospitals/${hospitalSlug}`,
              },
            ],
          }),
        }}
      />
    </main>
  );
}
