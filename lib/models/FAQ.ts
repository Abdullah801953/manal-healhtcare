import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['general', 'medical', 'billing', 'appointments', 'other'],
      default: 'general',
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
FAQSchema.index({ category: 1 });
FAQSchema.index({ isActive: 1 });
FAQSchema.index({ order: 1 });

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);