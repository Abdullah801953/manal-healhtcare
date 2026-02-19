import { Doctor } from '../../types';
import { Stethoscope } from 'lucide-react';

interface TreatmentsSectionProps {
  doctor: Doctor;
}

export function TreatmentsSection({ doctor }: TreatmentsSectionProps) {
  if (!doctor.treatments || doctor.treatments.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Treatments</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {doctor.treatments.map((treatment, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100 hover:border-[#209f00] transition-colors"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Stethoscope className="w-5 h-5 text-[#209f00]" />
            </div>
            <p className="text-gray-800 font-medium">{treatment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
