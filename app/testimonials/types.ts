// Testimonial types and interfaces

export interface Testimonial {
  id: string;
  name: string;
  age: number;
  country: string;
  countryFlag: string;
  treatment: string;
  hospital: string;
  doctor: string;
  rating: number;
  date: string; // ISO date format
  image: string;
  testimonial: string;
  beforeAfterImages?: {
    before: string;
    after: string;
  };
  videoUrl?: string;
  verified: boolean;
  featured: boolean;
  category: TestimonialCategory;
}

export type TestimonialCategory =
  | 'All'
  | 'Cardiac Care'
  | 'Orthopedic'
  | 'Cosmetic Surgery'
  | 'Cancer Treatment'
  | 'Neurology'
  | 'General Surgery'
  | 'Dental Care'
  | 'Eye Care';

export interface TestimonialFilters {
  category: TestimonialCategory;
  rating: number | null;
  country: string;
  search: string;
}

export const testimonialCategories: TestimonialCategory[] = [
  'All',
  'Cardiac Care',
  'Orthopedic',
  'Cosmetic Surgery',
  'Cancer Treatment',
  'Neurology',
  'General Surgery',
  'Dental Care',
  'Eye Care',
];

export const countries = [
  'All Countries',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Saudi Arabia',
  'UAE',
  'Nigeria',
  'Bangladesh',
  'Kenya',
];
