import { treatmentsData } from './data';
import { Treatment } from './types';

export function getTreatmentById(id: string): Treatment | undefined {
  return treatmentsData.find((treatment) => treatment.id === id);
}

export function getRelatedTreatments(
  currentTreatmentId: string,
  category: string,
  limit: number = 3
): Treatment[] {
  return treatmentsData
    .filter(
      (treatment) =>
        treatment.id !== currentTreatmentId && treatment.category === category
    )
    .slice(0, limit);
}

export function getFeaturedTreatments(limit: number = 6): Treatment[] {
  return treatmentsData.filter((treatment) => treatment.featured).slice(0, limit);
}
