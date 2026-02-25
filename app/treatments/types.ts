import { StaticImageData } from "next/image";

export interface Treatment {
  slug: any;
  id: string;
  title: string;
  overview: string;
  types?: string;
  purpose?: string;
  diseasesTreated?: string;
  risks?: string;
  gvhd?: string;
  gvhdSymptoms?: string;
  preTransplant?: string;
  autologous?: string;
  conditioning?: string;
  summary?: string;
  category: TreatmentCategory;
  description: string;
  shortDescription: string;
  image: StaticImageData | string;
  duration?: string;
  price?: string;
  featured: boolean;
  benefits: string[];
  procedures: string[];
  // Additional fields for various treatment types
  disorders?: string;
  oncologyTypes?: string;
  domains?: string;
  reasons?: string;
  cancerTypes?: string;
  conditions?: string;
  diagnosis?: string;
  functions?: string;
  specialized?: string;
  tests?: string;
  neuroplasticity?: string;
  areas?: string;
  causes?: string;
  tumors?: string;
  clinical?: string;
  surgery?: string;
  whyIndia?: string;
  signsAndSymptoms?: string[];
  howItIsDone?: string[];
  recovery?: string[];
  additionalInfo?: string[];
  successRate?: string;
  overviewList?: string[];
  descriptionList?: string[];
  treatmentTypes?: string[];
  surgeryTypes?: string[];
}

export type TreatmentCategory = string;

// This will be populated from treatment titles dynamically
export const TREATMENT_CATEGORIES: TreatmentCategory[] = [];

// Helper function to get all treatment categories from titles
export function getTreatmentCategories(treatments: Treatment[]): string[] {
  const categories = ['All Treatments', ...treatments.map(t => t.title)];
  return categories;
}
