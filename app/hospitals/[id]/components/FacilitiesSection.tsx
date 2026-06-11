import { Hospital } from '../../types';
import { Building, CheckCircle } from 'lucide-react';

interface FacilitiesSectionProps {
  hospital: Hospital;
}

export default function FacilitiesSection({ hospital }: FacilitiesSectionProps) {
  if (!hospital.facilities || hospital.facilities.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-5 lg:mx-24">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Building className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Facilities</h2>
            <p className="text-gray-600 mt-1">Modern facilities and equipment</p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {hospital.facilities.map((facility, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
              <span className="text-gray-700 font-medium">{facility}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
