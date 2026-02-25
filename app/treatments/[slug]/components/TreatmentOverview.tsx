import { Treatment } from '../../types';
import { CheckCircle2, FileText, Info } from 'lucide-react';

interface TreatmentOverviewProps {
  treatment: Treatment;
}

export default function TreatmentOverview({ treatment }: TreatmentOverviewProps) {
  const overviewPoints = treatment.overviewList?.filter(o => o.trim() !== "") ?? [];

  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <Info className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Treatment Overview</h2>
              <p className="text-gray-600 mt-1">Comprehensive information about this procedure</p>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {treatment.description}
            </p>
          </div>

          {/* Overview Points */}
          {overviewPoints.length > 0 && (
            <div className="mt-8 bg-gradient-to-br from-[#209f00]/5 to-emerald-50 rounded-2xl p-8 border border-[#209f00]/10">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-[#209f00]" />
                <h3 className="text-xl font-bold text-gray-900">Overview</h3>
              </div>
              <ul className="space-y-3">
                {overviewPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#209f00] mt-0.5 shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fallback Key Points when no overviewList */}
          {overviewPoints.length === 0 && (
            <div className="mt-8 bg-gradient-to-br from-[#209f00]/5 to-emerald-50 rounded-2xl p-8 border border-[#209f00]/10">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#209f00]" />
                <h3 className="text-xl font-bold text-gray-900">Why Choose This Treatment</h3>
              </div>
              <p className="text-gray-700">
                Our medical team utilizes state-of-the-art technology and follows international best practices to ensure optimal patient outcomes, safety, and comfort throughout the entire treatment process.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
