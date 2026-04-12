export interface Achievement {
  title: string;
  file?: string;
  fileType?: string;
  fileName?: string;
}

export interface Doctor {
  _id?: string;
  id: string;
  slug: string;
  name: string;
  designation: string;
  hospital: string;
  overview: string;
  overviewList?: string[];
  qualifications: string[];
  experience: string;
  experienceDetails?: string[];
  experienceYears: string;
  specialization: string[];
  clinicalFocus: string[];
  treatments?: string[];
  additionalInfo?: string[];
  whyChoose?: string[];
  researchPublications?: string[];
  achievements?: Achievement[];
  status?: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
  
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
  | 'Neurosurgeon'
  | 'Gynecologist'
  | 'Oncologist'
  | 'Gastroenterologist'
  | 'Pulmonologist'
  | 'Ophthalmologist'
  | 'Dermatologist'
  | 'Pediatrician'
  | 'Nephrologist'
  | 'Endocrinologist'
  | 'Rheumatologist'
  | 'ENT Specialist'
  | 'Plastic Surgeon'
  | 'Spine Surgeon'
  | 'Vascular Surgeon'
  | 'Transplant Surgeon'
  | 'Hematologist'
  | 'Interventional Cardiologist'
  | 'Radiologist';

export const DOCTOR_CATEGORIES: DoctorCategory[] = [
  'All Doctors',
  'Orthopedic',
  'Cardiologist',
  'Interventional Cardiologist',
  'Neurologist',
  'Neurosurgeon',
  'Urologist',
  'Medical Oncologist',
  'Oncologist',
  'Gynecologist',
  'Gastroenterologist',
  'Pulmonologist',
  'Ophthalmologist',
  'Dermatologist',
  'Pediatrician',
  'Nephrologist',
  'Endocrinologist',
  'Rheumatologist',
  'ENT Specialist',
  'Plastic Surgeon',
  'Spine Surgeon',
  'Vascular Surgeon',
  'Transplant Surgeon',
  'Hematologist',
  'Radiologist',
];
