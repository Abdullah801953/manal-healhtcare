import { Doctor } from '../../types';
import { Info } from 'lucide-react';

interface AdditionalInfoSectionProps {
  doctor: Doctor;
}

export function AdditionalInfoSection({ doctor }: AdditionalInfoSectionProps) {
  if (!doctor.additionalInfo || doctor.additionalInfo.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
      
      <div className="space-y-3">
        {doctor.additionalInfo.map((info, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-400 transition-colors"
          >
            <div className="p-3 rounded-lg bg-blue-50">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-base text-gray-700 leading-relaxed">{info}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
