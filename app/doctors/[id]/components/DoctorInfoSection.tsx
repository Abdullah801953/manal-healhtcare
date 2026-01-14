import { GraduationCap, Award, Clock, Users } from 'lucide-react';

interface DoctorInfoSectionProps {
  specialty: string;
}

export function DoctorInfoSection({ specialty }: DoctorInfoSectionProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">About the Doctor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Experience */}
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Award className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Experience</p>
            <p className="text-lg font-bold text-gray-900">15+ Years</p>
          </div>
        </div>

        {/* Specialty */}
        <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-xl">
          <div className="p-3 bg-teal-100 rounded-lg">
            <GraduationCap className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Specialty</p>
            <p className="text-lg font-bold text-gray-900">{specialty}</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Patients</p>
            <p className="text-lg font-bold text-gray-900">2000+</p>
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Available</p>
            <p className="text-lg font-bold text-gray-900">Mon - Fri</p>
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Professional Summary</h3>
        <p className="text-gray-600 leading-relaxed">
          A highly skilled and dedicated {specialty.toLowerCase()} with over 15 years of experience 
          in diagnosing and treating complex medical conditions. Known for providing compassionate, 
          patient-centered care and utilizing the latest medical technologies and treatment methodologies.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Committed to continuous learning and professional development, staying current with the 
          latest advancements in medical science to provide the best possible care for patients.
        </p>
      </div>
    </div>
  );
}
