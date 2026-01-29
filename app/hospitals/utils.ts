import { hospitalsData } from './data';
import { Hospital } from './types';

export function getHospitalById(id: string): Hospital | undefined {
  return hospitalsData.find((hospital) => hospital.id === id);
}

export function getRelatedHospitals(
  currentHospitalId: string,
  type: string,
  limit: number = 3
): Hospital[] {
  return hospitalsData
    .filter(
      (hospital) =>
        hospital.id !== currentHospitalId && hospital.type === type
    )
    .slice(0, limit);
}

export function getFeaturedHospitals(limit: number = 6): Hospital[] {
  return hospitalsData.filter((hospital) => hospital.featured).slice(0, limit);
}
