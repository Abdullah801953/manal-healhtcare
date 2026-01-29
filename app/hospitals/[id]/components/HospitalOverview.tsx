import { Hospital } from '../../types';
import { Info } from 'lucide-react';

interface HospitalOverviewProps {
  hospital: Hospital;
}

export default function HospitalOverview({ hospital }: HospitalOverviewProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <Info className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">About {hospital.name}</h2>
              <p className="text-gray-600 mt-1">Learn more about our facility and services</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              {hospital.description}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-[#209f00] mb-2">
                {hospital.beds}+
              </div>
              <div className="text-gray-700 font-medium">Hospital Beds</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-[#209f00] mb-2">
                {hospital.specialties.length}+
              </div>
              <div className="text-gray-700 font-medium">Specialties</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl font-bold text-[#209f00] mb-2">
                {new Date().getFullYear() - hospital.established}+
              </div>
              <div className="text-gray-700 font-medium">Years of Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
