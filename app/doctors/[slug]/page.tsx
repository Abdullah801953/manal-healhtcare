import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { DoctorDetailHero } from './components/DoctorDetailHero';
import { DoctorInfoSection } from './components/DoctorInfoSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { EducationSection } from './components/EducationSection';
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
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DoctorInfoSection doctor={doctor} />
            <ExpertiseSection doctor={doctor} />
            <EducationSection doctor={doctor} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Appointment Card */}
            <div className="bg-white rounded-3xl shadow-sm p-6 mb-8 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book an Appointment</h3>
              <p className="text-gray-600 mb-6">
                Schedule your consultation with {doctor.name.split(' ')[1]} today.
              </p>
              
              <div className="space-y-3">
                <Button className="w-full bg-[#209f00] hover:bg-green-600 text-white rounded-full py-6">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full rounded-full py-6">
                  Contact Info
                </Button>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-500">Consultation Fee</p>
                    <p className="font-semibold text-gray-900">$150 - $200</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Available Hours</p>
                    <p className="font-semibold text-gray-900">Mon - Fri, 9AM - 5PM</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Response Time</p>
                    <p className="font-semibold text-gray-900">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
