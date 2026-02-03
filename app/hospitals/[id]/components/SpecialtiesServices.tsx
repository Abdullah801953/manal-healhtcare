import { Hospital } from '../../types';
import { Stethoscope, CheckCircle, Award, Building2 } from 'lucide-react';

interface SpecialtiesServicesProps {
  hospital: Hospital;
}

export default function SpecialtiesServices({ hospital }: SpecialtiesServicesProps) {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00]/10 rounded-2xl mb-4">
              <Stethoscope className="w-8 h-8 text-[#209f00]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Medical Specialties & Services
            </h2>
            <p className="text-gray-600 text-lg">
              Comprehensive healthcare services delivered by expert specialists
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Specialties */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Medical Specialties
              </h3>
              <div className="space-y-3">
                {hospital.specialties.map((specialty, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
                    <span className="text-gray-700 font-medium">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Facilities & Equipment
              </h3>
              <div className="space-y-3">
                {hospital.facilities.map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
                    <span className="text-gray-700 font-medium">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expertise Section - Only show if hospital has expertise */}
          {hospital.expertise && hospital.expertise.length > 0 && (
            <div className="mt-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-6 h-6 text-[#209f00]" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Areas of Expertise
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hospital.expertise.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Infrastructure Section - Only show if hospital has infrastructure */}
          {hospital.infrastructure && hospital.infrastructure.length > 0 && (
            <div className="mt-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-[#209f00]" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Infrastructure
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {hospital.infrastructure.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
    </section>
        );
}
