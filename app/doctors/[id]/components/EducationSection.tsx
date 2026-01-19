import { Doctor } from '../../types';
import { GraduationCap } from 'lucide-react';

interface EducationSectionProps {
  doctor: Doctor;
}

export function EducationSection({ doctor }: EducationSectionProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Qualifications</h2>
      
      <div className="space-y-4">
        {doctor.qualifications.map((qualification, index) => (
          <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#209f00] transition-colors">
            <div className="p-3 rounded-lg bg-green-50">
              <GraduationCap className="w-6 h-6 text-[#209f00]" />
            </div>
            <div className="flex-1">
              <p className="text-base text-gray-700 leading-relaxed">{qualification}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Experience Summary */}
      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Experience</h3>
        <p className="text-gray-700 leading-relaxed">{doctor.experience}</p>
      </div>
    </div>
  );
}
