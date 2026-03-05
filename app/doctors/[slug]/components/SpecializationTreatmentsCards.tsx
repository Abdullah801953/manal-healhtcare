import { Doctor } from '../../types';

interface SpecializationTreatmentsCardsProps {
  doctor: Doctor;
}

export function SpecializationTreatmentsCards({ doctor }: SpecializationTreatmentsCardsProps) {
  const hasSpecializations = doctor.specialization && doctor.specialization.length > 0;
  const hasTreatments = doctor.treatments && doctor.treatments.length > 0;

  if (!hasSpecializations && !hasTreatments) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 mb-6 xs:mb-7 sm:mb-8">
      {/* Treatments Card — LEFT */}
      {hasTreatments && (
        <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border border-gray-100 hover:border-[#209f00]/30 transition-colors">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">List of Treatments</h2>
          <ul className="space-y-2 xs:space-y-2.5">
            {doctor.treatments!.map((treatment, index) => (
              <li key={index} className="flex items-start gap-2 xs:gap-3">
                <span className="text-[#209f00] mt-0.5 text-lg">✔</span>
                <span className="text-sm xs:text-base text-gray-700">{treatment}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specialization Card — RIGHT */}
      {hasSpecializations && (
        <div className="bg-white rounded-2xl shadow-md p-5 xs:p-6 border border-gray-100 hover:border-[#209f00]/30 transition-colors">
          <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4">Specializations</h2>
          <ul className="space-y-2 xs:space-y-2.5">
            {doctor.specialization.map((item, index) => (
              <li key={index} className="flex items-start gap-2 xs:gap-3">
                <span className="text-[#209f00] mt-0.5 text-lg">✔</span>
                <span className="text-sm xs:text-base text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
