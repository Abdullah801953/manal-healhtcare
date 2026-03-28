import { Hospital } from '../../types';
import { Trophy, CheckCircle } from 'lucide-react';

interface AwardsSectionProps {
  hospital: Hospital;
}

export default function AwardsSection({ hospital }: AwardsSectionProps) {
  if (!hospital.award || hospital.award.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="mx-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Trophy className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Awards</h2>
            <p className="text-gray-600 mt-1">Awards and recognitions</p>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {hospital.award.map((a, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-5 bg-linear-to-br from-yellow-50 to-white rounded-xl border border-yellow-100 hover:shadow-md transition-all"
            >
              <Trophy className="w-5 h-5 text-yellow-500 mt-0.5 shrink-0" />
              <p className="text-gray-700 font-medium">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
