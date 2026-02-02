import { Treatment } from '../../types';
import { Heart, CheckCircle } from 'lucide-react';

interface BenefitsSectionProps {
  treatment: Treatment;
}

export default function BenefitsSection({ treatment }: BenefitsSectionProps) {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <Heart className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Key Benefits</h2>
              <p className="text-gray-600 mt-1">What you can expect from this treatment</p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {treatment.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 mt-1">
                  <CheckCircle className="w-6 h-6 text-[#209f00]" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Important Note
            </h4>
            <p className="text-gray-700 text-sm">
              Individual results may vary based on patient condition, overall health, and adherence to post-treatment care instructions. Our medical team will provide personalized guidance throughout your treatment journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
