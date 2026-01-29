import mongoose, { Schema, Document, Model } from 'mongoose';

// Blog interface
export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  content2?: string;
  content3?: string;
  image: string;
  category: string;
  author: string;
  date: Date;
  bullets: string[];
  subheading?: string;
  extraImages: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  views: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Blog schema
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt is required'],
      trim: true,
      maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Blog content is required'],
    },
    content2: {
      type: String,
      default: '',
    },
    content3: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: [true, 'Blog image is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Skincare',
        'Cardiology',
        'Orthopedics',
        'Neurology',
        'Oncology',
        'Pediatrics',
        'Gynecology',
        'Dental',
        'Eye Care',
        'Mental Health',
        'Nutrition',
        'Fitness',
        'General Health',
        'Medical Tourism',
        'Technology',
      ],
    },
    author: {
      type: String,
      required: [true, 'Author name is required'],
      default: 'Admin',
    },
    date: {
      type: Date,
      required: [true, 'Publication date is required'],
      default: Date.now,
    },
    bullets: {
      type: [String],
      default: [],
    },
    subheading: {
      type: String,
      default: '',
    },
    extraImages: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    seoTitle: {
      type: String,
      default: '',
    },
    seoDescription: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ featured: 1 });
BlogSchema.index({ date: -1 });

// Export model
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
