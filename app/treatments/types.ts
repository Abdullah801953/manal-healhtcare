export interface Treatment {
  id: string;
  title: string;
  category: TreatmentCategory;
  description: string;
  shortDescription: string;
  image: string;
  duration: string;
  price: string;
  featured: boolean;
  benefits: string[];
  procedures: string[];
}

export type TreatmentCategory = 
  | 'All Treatments'
  | 'Cardiology'
  | 'Orthopedics'
  | 'Neurology'
  | 'Urology'
  | 'General Surgery';

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  'All Treatments',
  'Cardiology',
  'Orthopedics',
  'Neurology',
  'Urology',
  'General Surgery',
];
