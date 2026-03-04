import { Hospital } from '../../types';
import { Stethoscope, CheckCircle } from 'lucide-react';

interface SpecialitiesSectionProps {
  hospital: Hospital;
}

export default function SpecialitiesSection({ hospital }: SpecialitiesSectionProps) {
  if (!hospital.specialties || hospital.specialties.length === 0) return null;

  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Stethoscope className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Specialities</h2>
            <p className="text-gray-600 mt-1">Medical specialties available at {hospital.name}</p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {hospital.specialties.map((specialty, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
              <span className="text-gray-700 font-medium">{specialty}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
