import { Doctor } from '../../types';
import { Briefcase, Target, Users, MapPin } from 'lucide-react';

interface DoctorInfoSectionProps {
  doctor: Doctor;
}

export function DoctorInfoSection({ doctor }: DoctorInfoSectionProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Doctor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Experience */}
        <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
          <div className="p-3 bg-green-100 rounded-lg">
            <Briefcase className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Experience</p>
            <p className="text-base font-bold text-gray-900 line-clamp-2">{doctor.experienceYears}Years</p>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
          <div className="p-3 bg-blue-100 rounded-lg">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Hospital</p>
            <p className="text-base font-bold text-gray-900 line-clamp-2">{doctor.hospital}</p>
          </div>
        </div>
      </div>

      {/* Professional Overview */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Professional Overview</h3>
        <p className="text-gray-600 leading-relaxed">
          {doctor.overview}
        </p>
        
        {/* Clinical Focus */}
        {doctor.clinicalFocus && doctor.clinicalFocus.length > 0 && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Clinical Focus</h4>
            <div className="space-y-2">
              {doctor.clinicalFocus.map((focus, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" />
                  <p className="text-gray-700">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
