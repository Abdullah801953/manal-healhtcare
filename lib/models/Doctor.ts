import mongoose, { Schema, Model } from 'mongoose';

export interface IAchievement {
  title: string;
  file?: string;
  fileType?: string;
  fileName?: string;
}

export interface IDoctor {
  name: string;
  slug: string;
  designation: string;
  hospital: string;
  overview: string;
  overviewList?: string[];
  qualifications: string[];
  experience: string;
  experienceDetails?: string[];
  experienceYears: string;
  specialization: string[];
  clinicalFocus: string[];
  treatments?: string[];
  additionalInfo?: string[];
  whyChoose?: string[];
  researchPublications?: string[];
  achievements?: IAchievement[];
  image?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const DoctorSchema = new Schema<IDoctor>({
  name: { 
    type: String, 
    required: true 
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  designation: { 
    type: String, 
    required: true 
  },
  hospital: { 
    type: String, 
    required: true 
  },
  overview: { 
    type: String, 
    required: true 
  },
  qualifications: [{ 
    type: String 
  }],
  experience: { 
    type: String, 
    required: true 
  },
  experienceYears: { 
    type: String, 
    required: true 
  },
  specialization: [{ 
    type: String 
  }],
  clinicalFocus: [{ 
    type: String 
  }],
  treatments: [{ 
    type: String 
  }],
  overviewList: [{ 
    type: String 
  }],
  experienceDetails: [{ 
    type: String 
  }],
  additionalInfo: [{ 
    type: String 
  }],
  whyChoose: [{ 
    type: String 
  }],
  researchPublications: [{
    type: String
  }],
  achievements: [{
    title: { type: String, required: true },
    file: { type: String },
    fileType: { type: String },
    fileName: { type: String }
  }],
  image: { 
    type: String 
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Delete cached model in development to pick up schema changes
if (mongoose.models.Doctor) {
  delete mongoose.models.Doctor;
}

const Doctor: Model<IDoctor> = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
