import mongoose, { Schema, Model } from 'mongoose';

export interface IHospital {
  name: string;
  slug: string;
  type: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  beds: number;
  established: number;
  image?: string;
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
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const HospitalSchema = new Schema<IHospital>(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['General Hospital', 'Specialty Hospital', 'Teaching Hospital', 'Trauma Center', 'Rehabilitation Center'],
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    beds: {
      type: Number,
      required: true,
    },
    established: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    specialties: [{
      type: String,
    }],
    facilities: [{
      type: String,
    }],
    accreditations: [{
      type: String,
    }],
    emergency: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    expertise: [{
      type: String,
    }],
    infrastructure: [{
      type: String,
    }],
    departments: [{
      type: String,
    }],
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
HospitalSchema.index({ name: 'text', city: 'text', description: 'text' });
HospitalSchema.index({ slug: 1 });
HospitalSchema.index({ city: 1 });
HospitalSchema.index({ type: 1 });
HospitalSchema.index({ featured: 1 });
HospitalSchema.index({ status: 1 });

const Hospital: Model<IHospital> =
  mongoose.models.Hospital || mongoose.model<IHospital>('Hospital', HospitalSchema);

export default Hospital;
