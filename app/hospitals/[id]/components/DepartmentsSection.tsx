import { Hospital } from '../../types';
import { Stethoscope } from 'lucide-react';

interface DepartmentsSectionProps {
  hospital: Hospital;
}

export default function DepartmentsSection({ hospital }: DepartmentsSectionProps) {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00]/10 rounded-2xl mb-4">
              <Stethoscope className="w-8 h-8 text-[#209f00]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Departments & Services
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive medical departments and specialized services
            </p>
          </div>

          {/* Specialties */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Medical Specialties</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospital.specialties.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-full bg-[#209f00]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#209f00] font-bold">{index + 1}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Departments */}
          {hospital.departments && hospital.departments.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Clinical Departments</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {hospital.departments.map((dept, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <svg
                    className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium text-gray-800">{dept}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}
