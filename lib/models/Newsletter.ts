import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'active',
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
// Note: email index is already created by unique: true on the field
NewsletterSchema.index({ status: 1 });
NewsletterSchema.index({ createdAt: -1 });

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);