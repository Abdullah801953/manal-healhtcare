import { Hospital } from '../../types';
import { Globe, CheckCircle } from 'lucide-react';

interface InternationalPatientServicesSectionProps {
  hospital: Hospital;
}

export default function InternationalPatientServicesSection({ hospital }: InternationalPatientServicesSectionProps) {
  if (!hospital.internationalPatientServices || hospital.internationalPatientServices.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Globe className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">International Patient Services</h2>
            <p className="text-gray-600 mt-1">Dedicated services for international patients</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {hospital.internationalPatientServices.map((service, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-5 bg-white rounded-xl border border-gray-100 hover:border-[#209f00]/30 transition-colors shadow-sm"
            >
              <CheckCircle className="w-5 h-5 text-[#209f00] mt-0.5 shrink-0" />
              <span className="text-gray-700 font-medium">{service}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
