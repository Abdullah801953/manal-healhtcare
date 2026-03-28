import { Hospital } from '../../types';
import { Info, CheckCircle } from 'lucide-react';

interface AdditionalInfoSectionProps {
  hospital: Hospital;
}

export default function AdditionalInfoSection({ hospital }: AdditionalInfoSectionProps) {
  if (!hospital.additionalInfo || hospital.additionalInfo.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Info className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Additional Information</h2>
            <p className="text-gray-600 mt-1">More details about {hospital.name}</p>
          </div>
        </div>

        {/* Info Items */}
        <div className="space-y-3">
          {hospital.additionalInfo.map((info, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-[#209f00]/30 transition-colors"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] mt-0.5 shrink-0" />
              <p className="text-gray-700">{info}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
