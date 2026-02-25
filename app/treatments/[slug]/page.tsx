import { Metadata } from 'next';
import { notFound } from 'next/navigation';
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
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface TreatmentDetailPageProps {
  params: Promise<{ slug: string }>;
}

// Fetch treatment by slug from API
async function getTreatmentBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/treatments/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching treatment:', error);
    return null;
  }
}

// Fetch all treatments for related treatments
async function getAllTreatments() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/treatments`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const data = await response.json();
    return data.success ? data.data.filter((t: any) => t.status === 'active') : [];
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: TreatmentDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);

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
          url: treatment.image || '/default-treatment.jpg',
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
      images: [
        {
          url: treatment.image || '/default-treatment.jpg',
          alt: treatment.title,
        },
      ],
      creator: '@manalhealthcare',
    },
    alternates: {
      canonical: `/treatments/${slug}`,
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
  const { slug } = await params;
  const treatment = await getTreatmentBySlug(slug);

  if (!treatment) {
    notFound();
  }

  // Get all treatments and filter for related ones
  const allTreatments = await getAllTreatments();
  const relatedTreatments = allTreatments
    .filter((t: any) => t.slug !== treatment.slug && t.category === treatment.category)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-white">
      <>
        <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
          {/* HERO SECTION */}
          <div className="bg-gradient-to-br from-[#e6f9ed] to-[#d2f5e3] rounded-3xl shadow-lg p-6 xs:p-7 sm:p-8 mb-6 xs:mb-7 sm:mb-8 flex flex-col md:flex-row items-center gap-6 xs:gap-7 sm:gap-8 border border-[#209f00]/20">
            {treatment.image && (
              <Image 
                src={treatment.image} 
                alt={treatment.title} 
                width={160}
                height={160}
                className="rounded-2xl w-40 h-40 object-cover border-4 border-white shadow-md" 
              />
            )}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="bg-[#209f00] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">{treatment.category}</span>
                {treatment.featured && <span className="bg-yellow-400 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">Featured</span>}
              </div>
              <h1 className="text-2xl xs:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{treatment.title}</h1>
              <p className="text-base xs:text-lg text-gray-700 mb-3">{treatment.shortDescription}</p>
              {treatment.duration && (
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1"><span className="font-bold">Duration:</span> {treatment.duration}</div>
                  <div className="flex items-center gap-1"><span className="font-bold">Price:</span> {treatment.price}</div>
                </div>
              )}
            </div>
          </div>

          {/* INFO CARDS */}
          {(treatment.benefits?.length > 0 || treatment.procedures?.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-6 xs:mb-7 sm:mb-8">
              {treatment.benefits?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border border-gray-100 hover:border-[#209f00]/30 transition-colors">
                  <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">Key Benefits</h2>
                  <ul className="space-y-2 xs:space-y-2.5">
                    {treatment.benefits.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-[#209f00] mt-0.5 text-lg">✔</span> <span className="text-sm xs:text-base text-gray-700">{b}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {treatment.procedures?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border border-gray-100 hover:border-[#209f00]/30 transition-colors">
                  <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">Treatment Procedures</h2>
                  <ul className="space-y-2 xs:space-y-2.5">
                    {treatment.procedures.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-[#209f00] mt-0.5 text-lg">•</span> <span className="text-sm xs:text-base text-gray-700">{p}</span></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* SECTIONED CONTENT */}
          <div className="space-y-4 xs:space-y-5 sm:space-y-6">
            {/* Overview */}
            {treatment.overviewList?.filter((o: string) => o.trim() !== "").length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Overview</h2>
                <ul className="space-y-2">
                  {treatment.overviewList.filter((o: string) => o.trim() !== "").map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-[#209f00] mt-0.5 text-lg shrink-0">✔</span>
                      <span className="text-sm xs:text-base text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* Types / Disorders / OncologyTypes / Domains / Reasons */}
            {treatment.treatmentTypes?.filter((t: string) => t.trim() !== "").length > 0 && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Types of Treatment</h2>
                <ul className="space-y-2">
                  {treatment.treatmentTypes.filter((t: string) => t.trim() !== "").map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-[#209f00] mt-0.5 text-lg shrink-0">✔</span>
                      <span className="text-sm xs:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {treatment.surgeryTypes?.filter((s: string) => s.trim() !== "").length > 0 && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Types of Surgery</h2>
                <ul className="space-y-2">
                  {treatment.surgeryTypes.filter((s: string) => s.trim() !== "").map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="text-[#209f00] mt-0.5 text-lg shrink-0">✔</span>
                      <span className="text-sm xs:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {treatment.disorders && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Disorders</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.disorders}</ReactMarkdown></div>
              </div>
            )}
            {treatment.oncologyTypes && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Types of Oncology</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.oncologyTypes}</ReactMarkdown></div>
              </div>
            )}
            {treatment.domains && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Core Domains</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.domains}</ReactMarkdown></div>
              </div>
            )}
            {treatment.reasons && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Reasons</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.reasons}</ReactMarkdown></div>
              </div>
            )}
            {/* Purpose */}
            {treatment.purpose && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Purpose</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.purpose}</ReactMarkdown></div>
              </div>
            )}
            {/* Diseases Treated / Cancer Types / Conditions / Diagnosis / Functions / Specialized / Tests / Neuroplasticity / Areas / Causes / Tumors */}
            {treatment.diseasesTreated && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Diseases Treated</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.diseasesTreated}</ReactMarkdown></div>
              </div>
            )}
            {treatment.cancerTypes && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Types of Cancer</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.cancerTypes}</ReactMarkdown></div>
              </div>
            )}
            {treatment.conditions && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Conditions Treated</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.conditions}</ReactMarkdown></div>
              </div>
            )}
            {treatment.diagnosis && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Diagnosis & Evaluation</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.diagnosis}</ReactMarkdown></div>
              </div>
            )}
            {treatment.functions && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Functions</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.functions}</ReactMarkdown></div>
              </div>
            )}
            {treatment.specialized && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Specialized Treatments</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.specialized}</ReactMarkdown></div>
              </div>
            )}
            {treatment.tests && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Medical Tests Required</h2>
                <div className="prose prose-lg text-gray-700"><ReactMarkdown>{treatment.tests}</ReactMarkdown></div>
              </div>
            )}
            {treatment.neuroplasticity && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Neuroplasticity</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.neuroplasticity}</ReactMarkdown></div>
              </div>
            )}
            {treatment.areas && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Areas of Neurology</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.areas}</ReactMarkdown></div>
              </div>
            )}
            {treatment.causes && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Causes</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.causes}</ReactMarkdown></div>
              </div>
            )}
            {treatment.tumors && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Types of Tumors</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.tumors}</ReactMarkdown></div>
              </div>
            )}
            {treatment.clinical && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Clinical Functions</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.clinical}</ReactMarkdown></div>
              </div>
            )}
            {treatment.surgery && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Surgical Treatments</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.surgery}</ReactMarkdown></div>
              </div>
            )}
            {/* Risks */}
            {treatment.risks && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Risks</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.risks}</ReactMarkdown></div>
              </div>
            )}
            {/* GVHD */}
            {treatment.gvhd && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Graft-Versus-Host Disease (GVHD)</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.gvhd}</ReactMarkdown></div>
                {treatment.gvhdSymptoms && (
                  <>
                    <h3 className="text-lg xs:text-xl font-semibold mt-5 xs:mt-6 mb-2 xs:mb-3">Symptoms of GVHD</h3>
                    <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.gvhdSymptoms}</ReactMarkdown></div>
                  </>
                )}
              </div>
            )}
            {/* Pre-Transplant Evaluation */}
            {treatment.preTransplant && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Pre-Transplant Evaluation and Clinical Procedure</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.preTransplant}</ReactMarkdown></div>
              </div>
            )}
            {/* Autologous Stem Cell Harvesting */}
            {treatment.autologous && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Autologous Stem Cell Harvesting Process</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.autologous}</ReactMarkdown></div>
              </div>
            )}
            {/* Conditioning Procedure */}
            {treatment.conditioning && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Conditioning Procedure</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.conditioning}</ReactMarkdown></div>
              </div>
            )}
            {/* Summary */}
            {treatment.summary && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Summary</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.summary}</ReactMarkdown></div>
              </div>
            )}
            {/* Why India */}
            {treatment.whyIndia && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Why Choose India?</h2>
                <div className="prose prose-sm xs:prose-base max-w-none text-gray-700"><ReactMarkdown>{treatment.whyIndia}</ReactMarkdown></div>
              </div>
            )}

            {/* Overview Points */}
            {treatment.overviewList && treatment.overviewList.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Overview Points</h2>
                <ul className="space-y-2 xs:space-y-2.5">
                  {treatment.overviewList.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-[#209f00] mt-0.5 text-lg">✔</span> <span className="text-sm xs:text-base text-gray-700">{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description Points */}
            {treatment.descriptionList && treatment.descriptionList.length > 0 && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Description Details</h2>
                <ul className="space-y-2 xs:space-y-2.5">
                  {treatment.descriptionList.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-[#209f00] mt-0.5 text-lg">•</span> <span className="text-sm xs:text-base text-gray-700">{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Signs & Symptoms */}
            {treatment.signsAndSymptoms && treatment.signsAndSymptoms.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-red-400 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Signs & Symptoms</h2>
                <ul className="space-y-2 xs:space-y-2.5">
                  {treatment.signsAndSymptoms.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-red-400 mt-0.5 text-lg">⚠</span> <span className="text-sm xs:text-base text-gray-700">{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* How It Is Done */}
            {treatment.howItIsDone && treatment.howItIsDone.length > 0 && (
              <div className="bg-gradient-to-br from-[#f6fff9] to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00]/70 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">How It Is Done</h2>
                <ol className="space-y-2 xs:space-y-2.5">
                  {treatment.howItIsDone.map((step: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3">
                      <span className="bg-[#209f00] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm xs:text-base text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Recovery */}
            {treatment.recovery && treatment.recovery.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-blue-400 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Recovery</h2>
                <ul className="space-y-2 xs:space-y-2.5">
                  {treatment.recovery.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-blue-400 mt-0.5 text-lg">💊</span> <span className="text-sm xs:text-base text-gray-700">{item}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {/* Success Rate */}
            {treatment.successRate && (
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Success Rate</h2>
                <p className="text-lg font-semibold text-[#209f00]">{treatment.successRate}</p>
              </div>
            )}

            {/* Additional Information */}
            {treatment.additionalInfo && treatment.additionalInfo.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-gray-400 hover:shadow-lg transition-shadow">
                <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Additional Information</h2>
                <ul className="space-y-2 xs:space-y-2.5">
                  {treatment.additionalInfo.map((info: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 xs:gap-3"><span className="text-[#209f00] mt-0.5 text-lg">ℹ</span> <span className="text-sm xs:text-base text-gray-700">{info}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RELATED TREATMENTS */}
          <div className="mt-8 xs:mt-10 sm:mt-12">
            <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-4 xs:mb-5 sm:mb-6">Related Treatments</h2>
            <RelatedTreatments treatments={relatedTreatments} />
          </div>
          </div>
        </section>
      </>

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
                item: `https://www.manalhealthcare.com/treatments/${treatment.slug}`,
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
