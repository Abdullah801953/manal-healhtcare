import { Hospital } from '../../types';
import { Award, Shield } from 'lucide-react';

interface AccreditationsProps {
  hospital: Hospital;
}

export default function AccreditationsSection({ hospital }: AccreditationsProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <Award className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Accreditations & Certifications
              </h2>
              <p className="text-gray-600 mt-1">
                Recognized for excellence in healthcare quality and safety
              </p>
            </div>
          </div>

          {/* Accreditations Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {hospital.accreditations.map((accreditation, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-[#209f00]/30 transition-all hover:shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00]/10 rounded-full mb-4">
                  <Shield className="w-8 h-8 text-[#209f00]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{accreditation}</h3>
                <p className="text-sm text-gray-600">Certified Excellence</p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Quality Commitment
            </h4>
            <p className="text-gray-700 text-sm">
              Our accreditations demonstrate our commitment to providing the highest standards of patient care, safety protocols, and clinical excellence. We undergo rigorous evaluations to maintain these certifications.
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
