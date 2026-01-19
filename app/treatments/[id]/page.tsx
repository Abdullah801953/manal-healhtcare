import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTreatmentById, getRelatedTreatments } from '../utils';
import { treatmentsData } from '../data';
import TreatmentDetailHero from './components/TreatmentDetailHero';
import TreatmentOverview from './components/TreatmentOverview';
import BenefitsSection from './components/BenefitsSection';
import ProcedureSteps from './components/ProcedureSteps';
import PreparationGuide from './components/PreparationGuide';
import RecoveryTimeline from './components/RecoveryTimeline';
import PatientTestimonials from './components/PatientTestimonials';
import CostInsuranceInfo from './components/CostInsuranceInfo';
import WhyChooseSection from './components/WhyChooseSection';
import TreatmentFAQ from './components/TreatmentFAQ';
import RelatedTreatments from './components/RelatedTreatments';
import SEOContent from './components/SEOContent';

interface TreatmentDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate static paths for all treatments
export async function generateStaticParams() {
  return treatmentsData.map((treatment) => ({
    id: treatment.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TreatmentDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const treatment = getTreatmentById(id);

  if (!treatment) {
    return {
      title: 'Treatment Not Found | Manal Healthcare',
    };
  }

  return {
    title: `${treatment.title} | Manal Healthcare - Advanced Medical Treatments`,
    description: `${treatment.description.substring(0, 155)}... Learn about ${treatment.title} procedure, benefits, recovery, costs, and insurance coverage at Manal Healthcare.`,
    keywords: [
      treatment.title,
      treatment.category,
      'medical treatment',
      'healthcare services',
      'manal healthcare',
      'advanced procedures',
      'medical procedure cost',
      'treatment recovery',
      'patient testimonials',
      'insurance coverage',
      'hospital treatment',
      `${treatment.title} benefits`,
      `${treatment.title} procedure`,
      `${treatment.title} cost`,
      ...treatment.benefits.slice(0, 3),
    ].join(', '),
    authors: [{ name: 'Manal Healthcare Medical Team' }],
    openGraph: {
      title: `${treatment.title} - Manal Healthcare`,
      description: treatment.shortDescription,
      type: 'article',
      siteName: 'Manal Healthcare',
      locale: 'en_US',
      images: [
        {
          url: treatment.image,
          width: 1200,
          height: 630,
          alt: treatment.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${treatment.title} - Manal Healthcare`,
      description: treatment.shortDescription,
      images: [treatment.image],
      creator: '@manalhealthcare',
    },
    alternates: {
      canonical: `/treatments/${id}`,
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

export default async function TreatmentDetailPage({
  params,
}: TreatmentDetailPageProps) {
  const { id } = await params;
  const treatment = getTreatmentById(id);

  if (!treatment) {
    notFound();
  }

  // Get related treatments in the same category
  const relatedTreatments = getRelatedTreatments(
    treatment.id,
    treatment.category,
    3
  );

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <TreatmentDetailHero treatment={treatment} />

      {/* Treatment Overview */}
      <TreatmentOverview treatment={treatment} />

      {/* Benefits Section */}
      <BenefitsSection treatment={treatment} />

      {/* Procedure Steps */}
      <ProcedureSteps treatment={treatment} />

      {/* Preparation Guide */}
      <PreparationGuide />

      {/* Recovery Timeline */}
      <RecoveryTimeline />

      {/* Why Choose Us */}
      <WhyChooseSection />

      {/* Patient Testimonials */}
      <PatientTestimonials />

      {/* Cost & Insurance */}
      <CostInsuranceInfo />

      {/* FAQ Section */}
      <TreatmentFAQ />

      {/* SEO Content */}
      <SEOContent treatment={treatment} />

      {/* Related Treatments */}
      <RelatedTreatments treatments={relatedTreatments} />

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalProcedure',
            name: treatment.title,
            description: treatment.description,
            procedureType: treatment.category,
            availableService: {
              '@type': 'MedicalProcedure',
              name: treatment.title,
            },
            offers: {
              '@type': 'Offer',
              priceRange: treatment.price,
            },
            provider: {
              '@type': 'MedicalOrganization',
              name: 'Manal Healthcare',
              url: 'https://www.manalhealthcare.com',
              telephone: '+1-234-567-890',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'City',
                addressRegion: 'State',
                postalCode: '12345',
                addressCountry: 'US',
              },
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '847',
              bestRating: '5',
              worstRating: '1',
            },
            medicalSpecialty: treatment.category,
            bodyLocation: 'Various',
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
                name: 'Treatments',
                item: 'https://www.manalhealthcare.com/treatments',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: treatment.title,
                item: `https://www.manalhealthcare.com/treatments/${treatment.id}`,
              },
            ],
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I prepare for this treatment?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Your doctor will provide specific pre-treatment instructions, which may include fasting, medication adjustments, and arranging transportation.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this treatment covered by insurance?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most major insurance plans cover medically necessary procedures. Our billing team will verify your coverage before scheduling.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the recovery time?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Recovery varies by individual and treatment complexity. Your physician will provide a detailed recovery timeline tailored to your needs.',
                },
              },
            ],
          }),
        }}
      />
    </main>
  );
}
