import { Hospital } from '../../types';
import { FileText, CheckCircle } from 'lucide-react';

interface FullDescriptionSectionProps {
  hospital: Hospital;
}

export default function FullDescriptionSection({ hospital }: FullDescriptionSectionProps) {
  if (!hospital.description || hospital.description.length === 0) return null;

  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <FileText className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Full Description</h2>
            <p className="text-gray-600 mt-1">About {hospital.name}</p>
          </div>
        </div>

        {/* Description Items */}
        <div className="space-y-4">
          {(Array.isArray(hospital.description) ? hospital.description : [hospital.description]).map((desc, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#209f00]/30 transition-colors"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] mt-0.5 shrink-0" />
              <p className="text-gray-700 leading-relaxed text-lg">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
