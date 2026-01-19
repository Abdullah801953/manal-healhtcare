import { Doctor } from '../../types';
import { CheckCircle } from 'lucide-react';

interface ExpertiseSectionProps {
  doctor: Doctor;
}

export function ExpertiseSection({ doctor }: ExpertiseSectionProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Specialization</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctor.specialization.map((area, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
            <CheckCircle className="w-6 h-6 text-[#209f00] shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
