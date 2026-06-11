import { Doctor } from '../../types';
import { BookOpen } from 'lucide-react';

interface ResearchPublicationSectionProps {
  doctor: Doctor;
}

export function ResearchPublicationSection({ doctor }: ResearchPublicationSectionProps) {
  if (!doctor.researchPublications || doctor.researchPublications.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border-l-4 border-[#209f00] hover:shadow-lg transition-shadow">
      <h2 className="text-xl xs:text-2xl font-bold text-gray-900 mb-3 xs:mb-4">Research & Publications</h2>

      <ul className="space-y-2">
        {doctor.researchPublications.map((publication, index) => (
          <li key={index} className="flex items-start gap-2 xs:gap-3">
            <span className="text-[#209f00] mt-0.5 text-lg shrink-0">✔</span>
            <span className="text-sm xs:text-base text-gray-700">{publication}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
