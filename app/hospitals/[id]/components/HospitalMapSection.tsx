import { Hospital } from '../../types';
import { MapPin } from 'lucide-react';

interface HospitalMapSectionProps {
  hospital: Hospital;
}

export default function HospitalMapSection({ hospital }: HospitalMapSectionProps) {
  if (!hospital.mapEmbedUrl) {
    return null; // Don't show the section if no map URL is provided
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Location & Directions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find {hospital.name} easily with our interactive map. Get directions and plan your visit.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <iframe
              src={hospital.mapEmbedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${hospital.name} Location Map`}
              className="w-full"
            />
          </div>

          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 text-[#209f00]" />
              <span className="text-sm text-gray-700">{hospital.location}, {hospital.city}, {hospital.state}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}