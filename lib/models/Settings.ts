import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  available: { type: String, required: true },
});

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
    // Contact page configuration
    emergencyPhone: {
      type: String,
      default: '',
    },
    supportEmail: {
      type: String,
      default: '',
    },
    postalCode: {
      type: String,
      default: '',
    },
    workingHoursWeekday: {
      type: String,
      default: 'Mon - Fri: 8:00 AM - 8:00 PM',
    },
    workingHoursWeekend: {
      type: String,
      default: 'Sat - Sun: 9:00 AM - 5:00 PM',
    },
    departments: {
      type: [DepartmentSchema],
      default: [],
    },
    mapEmbedUrl: {
      type: String,
      default: '',
    },
    mapLatitude: {
      type: String,
      default: '',
    },
    mapLongitude: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);