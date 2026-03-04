import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DoctorDetailHero } from './components/DoctorDetailHero';
import { SpecializationTreatmentsCards } from './components/SpecializationTreatmentsCards';
import { DoctorOverviewSection } from './components/DoctorOverviewSection';
import { DetailedExperienceSection } from './components/DetailedExperienceSection';
import { QualificationSection } from './components/QualificationSection';
import { ClinicalFocusSection } from './components/ClinicalFocusSection';
import { AdditionalInfoSection } from './components/AdditionalInfoSection';
import { ResearchPublicationSection } from './components/ResearchPublicationSection';
import { AchievementsSection } from './components/AchievementsSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { RelatedDoctors } from './components/RelatedDoctors';
import { Button } from '@/components/ui/button';
import { Doctor } from '../types';

interface DoctorDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Fetch doctor by slug from API
async function getDoctorBySlug(slug: string): Promise<Doctor | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/doctors/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
}

// Fetch all doctors for related section
async function getAllDoctors(): Promise<Doctor[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/doctors`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

// Get related doctors based on specialization
function getRelatedDoctors(currentDoctor: Doctor, allDoctors: Doctor[], limit: number = 3): Doctor[] {
  const currentId = currentDoctor._id || currentDoctor.id;
  return allDoctors
    .filter(d => {
      const docId = d._id || d.id;
      return docId !== currentId;
    })
    .slice(0, limit);
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  // If doctor not found, show 404
  if (!doctor) {
    notFound();
  }

  // Get related doctors
  const allDoctors = await getAllDoctors();
  const relatedDoctors = getRelatedDoctors(doctor, allDoctors, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/doctors">
            <Button variant="outline" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <DoctorDetailHero doctor={doctor} />

        {/* Content Sections */}
        <div className="space-y-8">
          {/* 1. Specialization + 2. List of Treatments */}
          <SpecializationTreatmentsCards doctor={doctor} />
          {/* 3. Overview */}
          <DoctorOverviewSection doctor={doctor} />
          {/* 4. Detailed Experience */}
          <DetailedExperienceSection doctor={doctor} />
          {/* 5. Qualification */}
          <QualificationSection doctor={doctor} />
          {/* 6. Clinical Focus */}
          <ClinicalFocusSection doctor={doctor} />
          {/* 7. Additional Information */}
          <AdditionalInfoSection doctor={doctor} />
          {/* 8. Research & Publication */}
          <ResearchPublicationSection doctor={doctor} />
          {/* 9. Award & Achievement */}
          <AchievementsSection doctor={doctor} />
          {/* 10. Why Choose This Doctor */}
          <WhyChooseSection doctor={doctor} />
        </div>

        {/* Related Doctors */}
        <RelatedDoctors doctors={relatedDoctors} />
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DoctorDetailPageProps) {
  const { slug } = await params;
  const doctor = await getDoctorBySlug(slug);

  if (!doctor) {
    return {
      title: 'Doctor Not Found',
    };
  }

  return {
    title: `${doctor.name} - ${doctor.designation} | Healthcare`,
    description: doctor.overview,
  };
}
