import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HospitalDetailHero from './components/HospitalDetailHero';
import FullDescriptionSection from './components/FullDescriptionSection';
import AdditionalInfoSection from './components/AdditionalInfoSection';
import SpecialitiesSection from './components/SpecialitiesSection';
import DoctorsListSection from './components/DoctorsListSection';
import FacilitiesSection from './components/FacilitiesSection';
import InternationalPatientServicesSection from './components/InternationalPatientServicesSection';
import AccreditationsSection from './components/AccreditationsSection';
import ExpertiseSection from './components/ExpertiseSection';
import InfrastructureSection from './components/InfrastructureSection';
import AwardsSection from './components/AwardsSection';
import HospitalSEOContent from './components/HospitalSEOContent';
import RelatedHospitals from './components/RelatedHospitals';
import HospitalMapSection from './components/HospitalMapSection';
import HospitalDoctorsSection from './components/HospitalDoctorsSection';

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

// Fetch doctors associated with this hospital
async function getHospitalDoctors(hospitalName: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(
      `${baseUrl}/api/doctors?hospital=${encodeURIComponent(hospitalName)}`,
      { cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    if (data.success) {
      return data.data.filter((d: any) => d.status === 'active');
    }
    return [];
  } catch (error) {
    console.error('Error fetching hospital doctors:', error);
    return [];
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
    description: `${(Array.isArray(hospital.description) ? hospital.description.join(' ') : hospital.description).substring(0, 155)}... ${hospital.beds} beds, ${hospital.specialties.length}+ specialties, rated ${hospital.rating}/5 stars.`,
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
  const [relatedHospitals, hospitalDoctors] = await Promise.all([
    getRelatedHospitals(hospital.type, hospital._id),
    getHospitalDoctors(hospital.name),
  ]);
  const hospitalSlug = hospital.slug || hospital._id;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HospitalDetailHero hospital={hospital} />

      {/* 1. Full Description */}
      <FullDescriptionSection hospital={hospital} />

      {/* 2. Additional Information (Optional) */}
      <AdditionalInfoSection hospital={hospital} />

      {/* 3. Specialities */}
      <SpecialitiesSection hospital={hospital} />

      {/* 4. Doctor's List */}
      <DoctorsListSection hospital={hospital} />

      {/* 5. Facilities */}
      <FacilitiesSection hospital={hospital} />

      {/* 5.5. Location Map */}
      <HospitalMapSection hospital={hospital} />

      {/* 6. International Patient Services */}
      <InternationalPatientServicesSection hospital={hospital} />

      {/* 7. Accreditation */}
      <AccreditationsSection hospital={hospital} />

      {/* 8. Area of Expertise */}
      <ExpertiseSection hospital={hospital} />

      {/* 9. Infrastructure Details */}
      <InfrastructureSection hospital={hospital} />

      {/* 10. Awards */}
      <AwardsSection hospital={hospital} />

      {/* SEO Content */}
      <HospitalSEOContent hospital={hospital} />

      {/* Doctors at this hospital */}
      <HospitalDoctorsSection doctors={hospitalDoctors} />

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
            description: Array.isArray(hospital.description) ? hospital.description.join(' ') : hospital.description,
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
            availableService: hospital.facilities.map((facility: string) => ({
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
