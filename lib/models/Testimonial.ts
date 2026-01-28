import mongoose, { Schema, Document, Model } from 'mongoose';

// Testimonial interface
export interface ITestimonial extends Document {
  name: string;
  age: number;
  country: string;
  countryFlag: string;
  treatment: string;
  hospital: string;
  doctor: string;
  rating: number;
  date: Date;
  image?: string;
  testimonial: string;
  beforeAfterImages?: {
    before: string;
    after: string;
  };
  videoUrl?: string;
  verified: boolean;
  featured: boolean;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

// Testimonial schema
const TestimonialSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Patient age is required'],
      min: [1, 'Age must be greater than 0'],
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    countryFlag: {
      type: String,
      required: [true, 'Country flag is required'],
      trim: true,
    },
    treatment: {
      type: String,
      required: [true, 'Treatment is required'],
      trim: true,
    },
    hospital: {
      type: String,
      required: [true, 'Hospital name is required'],
      trim: true,
    },
    doctor: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    date: {
      type: Date,
      required: [true, 'Treatment date is required'],
    },
    image: {
      type: String,
      default: '',
    },
    testimonial: {
      type: String,
      required: [true, 'Testimonial text is required'],
      minlength: [50, 'Testimonial must be at least 50 characters'],
    },
    beforeAfterImages: {
      before: String,
      after: String,
    },
    videoUrl: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Cardiac Care',
        'Orthopedic',
        'Cosmetic Surgery',
        'Cancer Treatment',
        'Neurology',
        'General Surgery',
        'Dental Care',
        'Eye Care',
        'IVF Treatment',
        'Weight Loss',
        'Transplant',
      ],
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
TestimonialSchema.index({ verified: 1, featured: 1 });
TestimonialSchema.index({ status: 1 });
TestimonialSchema.index({ category: 1 });
TestimonialSchema.index({ rating: -1 });

// Export model
const Testimonial: Model<ITestimonial> =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
