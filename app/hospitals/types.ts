export interface Hospital {
  id: string;
  name: string;
  type: HospitalType;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  beds: number;
  established: number;
  image: string;
  description: string;
  shortDescription: string;
  specialties: string[];
  facilities: string[];
  accreditations: string[];
  emergency: boolean;
  parking: boolean;
  featured: boolean;
  expertise?: string[];
  infrastructure?: string[];
  departments?: string[];
  award?: string[];
  owner?: string;
  additionalInfo?: string[];
}

export type HospitalType = 
  | 'All Hospitals'
  | 'General Hospital'
  | 'Specialty Hospital'
  | 'Teaching Hospital'
  | 'Trauma Center'
  | 'Rehabilitation Center'
  | 'Multispeciality Hospital'
  | 'IVF Center'
  | 'Eye Hospital'
  | 'Dental Clinic';

export const HOSPITAL_TYPES: HospitalType[] = [
  'All Hospitals',
  'General Hospital',
  'Specialty Hospital',
  'Teaching Hospital',
  'Trauma Center',
  'Rehabilitation Center',
  'Multispeciality Hospital',
  'IVF Center',
  'Eye Hospital',
  'Dental Clinic',
];

export interface FilterOptions {
  type: HospitalType;
  emergency: boolean | null;
  parking: boolean | null;
  minBeds: number;
  minRating: number;
  city: string;
}
