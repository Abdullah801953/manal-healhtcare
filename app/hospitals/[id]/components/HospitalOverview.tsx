import { Hospital } from '../../types';
import { Info, Award, User, FileText } from 'lucide-react';

interface HospitalOverviewProps {
  hospital: Hospital;
}

export default function HospitalOverview({ hospital }: HospitalOverviewProps) {
  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
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

          {/* Owner */}
          {hospital.owner && (
            <div className="flex items-center gap-3 mt-6 p-4 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-[#209f00]" />
              <span className="text-gray-600 font-medium">Owner:</span>
              <span className="text-gray-900 font-semibold">{hospital.owner}</span>
            </div>
          )}

          {/* Awards */}
          {hospital.award && hospital.award.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-[#209f00]" />
                <h3 className="text-xl font-bold text-gray-900">Awards & Recognitions</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {hospital.award.map((a, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-br from-yellow-50 to-white rounded-xl border border-yellow-100">
                    <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {hospital.additionalInfo && hospital.additionalInfo.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#209f00]" />
                <h3 className="text-xl font-bold text-gray-900">Additional Information</h3>
              </div>
              <div className="space-y-3">
                {hospital.additionalInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-[#209f00]/30 transition-colors">
                    <Info className="w-5 h-5 text-[#209f00] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{info}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
    </section>
  );
}
