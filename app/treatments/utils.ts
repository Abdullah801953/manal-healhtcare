import { treatmentsData } from './data';
import { Treatment } from './types';

export function getTreatmentBySlug(slug: string): Treatment | undefined {
  return treatmentsData.find((treatment) => treatment.slug === slug);
}

// Keep the old function for backward compatibility if needed
export function getTreatmentById(id: string): Treatment | undefined {
  return treatmentsData.find((treatment) => treatment.id === id);
}

export function getRelatedTreatments(
  currentTreatmentSlug: string,
  category: string,
  limit: number = 3
): Treatment[] {
  return treatmentsData
    .filter(
      (treatment) =>
        treatment.slug !== currentTreatmentSlug && treatment.category === category
    )
    .slice(0, limit);
}

export function getFeaturedTreatments(limit: number = 6): Treatment[] {
  return treatmentsData.filter((treatment) => treatment.featured).slice(0, limit);
}
