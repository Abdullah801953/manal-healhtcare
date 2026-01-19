export interface Doctor {
  id: string;
  name: string;
  designation: string;
  hospital: string;
  overview: string;
  qualifications: string[];
  experience: string;
  experienceYears: string;
  specialization: string[];
  clinicalFocus: string[];
  
  // Optional legacy fields for backward compatibility
  specialty?: string;
  rating?: number;
  image?: string;
  bio?: string;
  category?: DoctorCategory;
}

export type DoctorCategory = 
  | 'All Doctors'
  | 'Orthopedic'
  | 'Cardiologist'
  | 'Neurologist'
  | 'Urologist'
  | 'Medical Oncologist'
  | 'Neurosurgeon';

export const DOCTOR_CATEGORIES: DoctorCategory[] = [
  'All Doctors',
  'Orthopedic',
  'Cardiologist',
  'Neurologist',
  'Urologist',
  'Medical Oncologist',
  'Neurosurgeon',
];
