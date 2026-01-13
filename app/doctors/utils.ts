import { Doctor } from '../types';

// Helper function to get doctor by ID
export function getDoctorById(id: string, doctors: Doctor[]): Doctor | undefined {
  return doctors.find((doctor) => doctor.id === id);
}

// Helper function to get related doctors (same specialty, excluding current)
export function getRelatedDoctors(currentDoctor: Doctor, doctors: Doctor[], limit: number = 3): Doctor[] {
  return doctors
    .filter((doctor) => 
      doctor.id !== currentDoctor.id && 
      doctor.category === currentDoctor.category
    )
    .slice(0, limit);
}
