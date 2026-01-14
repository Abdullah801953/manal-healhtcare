import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { doctorsData } from '../data';
import { getDoctorById, getRelatedDoctors } from '../utils';
import { DoctorDetailHero } from './components/DoctorDetailHero';
import { DoctorInfoSection } from './components/DoctorInfoSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { EducationSection } from './components/EducationSection';
import { RelatedDoctors } from './components/RelatedDoctors';
import { Button } from '@/components/ui/button';

interface DoctorDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DoctorDetailPage({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = getDoctorById(id, doctorsData);

  // If doctor not found, show 404
  if (!doctor) {
    notFound();
  }

  // Get related doctors
  const relatedDoctors = getRelatedDoctors(doctor, doctorsData, 3);

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
            <DoctorInfoSection specialty={doctor.specialty} />
            <ExpertiseSection />
            <EducationSection />
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

// Generate static params for all doctors
export async function generateStaticParams() {
  return doctorsData.map((doctor) => ({
    id: doctor.id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: DoctorDetailPageProps) {
  const { id } = await params;
  const doctor = getDoctorById(id, doctorsData);

  if (!doctor) {
    return {
      title: 'Doctor Not Found',
    };
  }

  return {
    title: `${doctor.name} - ${doctor.specialty} | Healthcare`,
    description: doctor.bio,
  };
}
