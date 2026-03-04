import { Doctor } from '../../types';
import { Briefcase } from 'lucide-react';

interface DetailedExperienceSectionProps {
  doctor: Doctor;
}

export function DetailedExperienceSection({ doctor }: DetailedExperienceSectionProps) {
  if (!doctor.experience && (!doctor.experienceDetails || doctor.experienceDetails.length === 0)) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
      <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Detailed Experience</h2>

      {/* Experience Summary */}
      {doctor.experience && (
        <p className="text-sm xs:text-base text-gray-700 leading-relaxed mb-4">{doctor.experience}</p>
      )}

      {/* Experience Details */}
      {doctor.experienceDetails && doctor.experienceDetails.length > 0 && (
        <ul className="space-y-2">
          {doctor.experienceDetails.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 xs:gap-3">
              <span className="text-[#209f00] mt-0.5 text-lg shrink-0">✔</span>
              <span className="text-sm xs:text-base text-gray-700">{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
