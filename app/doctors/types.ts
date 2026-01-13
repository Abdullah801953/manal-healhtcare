export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  bio: string;
  category: DoctorCategory;
}

export type DoctorCategory = 
  | 'All Doctors'
  | 'Orthopedic'
  | 'Cardiologist'
  | 'Neurologist'
  | 'Urologist';

export const DOCTOR_CATEGORIES: DoctorCategory[] = [
  'All Doctors',
  'Orthopedic',
  'Cardiologist',
  'Neurologist',
  'Urologist',
];
