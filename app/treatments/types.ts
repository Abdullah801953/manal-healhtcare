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
  | 'Brain and Spine Surgery'
  | 'Cancer Treatment'
  | 'Cardiac Surgery'
  | 'Cosmetic Surgery'
  | 'Dental Treatment'
  | 'Ear Nose Throat Surgery'
  | 'Eye Treatment'
  | 'Gastroenterology Surgery'
  | 'General Surgery'
  | 'Gynaecology Treatment'
  | 'Nephrology Treatment'
  | 'Neurology Treatment'
  | 'Organ Transplant Surgery'
  | 'Orthopedic Surgery'
  | 'Robotic Surgery'
  | 'Stem Cell Therapy'
  | 'Urology Surgery'
  | 'Weight Loss Treatment';

export const TREATMENT_CATEGORIES: TreatmentCategory[] = [
  'All Treatments',
  'Brain and Spine Surgery',
  'Cancer Treatment',
  'Cardiac Surgery',
  'Cosmetic Surgery',
  'Dental Treatment',
  'Ear Nose Throat Surgery',
  'Eye Treatment',
  'Gastroenterology Surgery',
  'General Surgery',
  'Gynaecology Treatment',
  'Nephrology Treatment',
  'Neurology Treatment',
  'Organ Transplant Surgery',
  'Orthopedic Surgery',
  'Robotic Surgery',
  'Stem Cell Therapy',
  'Urology Surgery',
  'Weight Loss Treatment',
];
