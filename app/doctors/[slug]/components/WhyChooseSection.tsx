import { Doctor } from '../../types';
import { CheckCircle } from 'lucide-react';

interface WhyChooseSectionProps {
  doctor: Doctor;
}

export function WhyChooseSection({ doctor }: WhyChooseSectionProps) {
  if (!doctor.whyChoose || doctor.whyChoose.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose {doctor.name.split(' ')[0]}?</h2>
      
      <div className="space-y-3">
        {doctor.whyChoose.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#209f00] transition-colors"
          >
            <div className="p-3 rounded-lg bg-green-50">
              <CheckCircle className="w-6 h-6 text-[#209f00]" />
            </div>
            <div className="flex-1">
              <p className="text-base text-gray-700 leading-relaxed">{reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
