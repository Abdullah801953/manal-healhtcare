import { Doctor } from '../../types';
import { DoctorCard } from '../../components/DoctorCard';

interface RelatedDoctorsProps {
  doctors: Doctor[];
}

export function RelatedDoctors({ doctors }: RelatedDoctorsProps) {
  if (doctors.length === 0) return null;

  return (
    <div className="bg-gray-50 rounded-3xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Doctors</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
