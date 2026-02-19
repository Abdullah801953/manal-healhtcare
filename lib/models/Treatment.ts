import mongoose, { Schema, Model } from 'mongoose';

export interface ITreatment {
  slug: string;
  title: string;
  category: string;
  description: string;
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
  shortDescription: string;
  image?: string;
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
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const TreatmentSchema = new Schema<ITreatment>({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  types: String,
  purpose: String,
  diseasesTreated: String,
  risks: String,
  gvhd: String,
  gvhdSymptoms: String,
  preTransplant: String,
  autologous: String,
  conditioning: String,
  summary: String,
  shortDescription: {
    type: String,
    required: true
  },
  image: String,
  duration: String,
  price: String,
  featured: {
    type: Boolean,
    default: false
  },
  benefits: [{
    type: String
  }],
  procedures: [{
    type: String
  }],
  disorders: String,
  oncologyTypes: String,
  domains: String,
  reasons: String,
  cancerTypes: String,
  conditions: String,
  diagnosis: String,
  functions: String,
  specialized: String,
  tests: String,
  neuroplasticity: String,
  areas: String,
  causes: String,
  tumors: String,
  clinical: String,
  surgery: String,
  whyIndia: String,
  signsAndSymptoms: [{ type: String }],
  howItIsDone: [{ type: String }],
  recovery: [{ type: String }],
  additionalInfo: [{ type: String }],
  successRate: String,
  overviewList: [{ type: String }],
  descriptionList: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

const Treatment: Model<ITreatment> = mongoose.models.Treatment || mongoose.model<ITreatment>('Treatment', TreatmentSchema);

export default Treatment;
