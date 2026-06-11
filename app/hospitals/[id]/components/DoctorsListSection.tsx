import { Hospital } from '../../types';
import { Users, CheckCircle } from 'lucide-react';

interface DoctorsListSectionProps {
  hospital: Hospital;
}

export default function DoctorsListSection({ hospital }: DoctorsListSectionProps) {
  if (!hospital.doctors || hospital.doctors.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="mx-5 lg:mx-24">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Users className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Doctor&apos;s List</h2>
            <p className="text-gray-600 mt-1">Our team of expert medical professionals</p>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hospital.doctors.map((doctor, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
              <span className="text-gray-700 font-medium">{doctor}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
