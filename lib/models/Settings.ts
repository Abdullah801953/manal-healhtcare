import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      required: true,
      default: 'Manal Healthcare',
    },
    siteEmail: {
      type: String,
      required: true,
    },
    sitePhone: {
      type: String,
      required: true,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    facebook: String,
    twitter: String,
    instagram: String,
    linkedin: String,
    youtube: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);