import mongoose from 'mongoose';
import Doctor from '../lib/models/Doctor';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || '';

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function addSlugsToExistingDoctors() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all doctors without slugs
    const doctors = await Doctor.find({});
    console.log(`Found ${doctors.length} doctors`);

    let updated = 0;
    const usedSlugs = new Set<string>();

    for (const doctor of doctors) {
      // @ts-ignore - Temporarily access slug even if it doesn't exist in old schema
      if (!doctor.slug) {
        let baseSlug = generateSlug(doctor.name);
        let slug = baseSlug;
        let counter = 1;

        // Make slug unique
        while (usedSlugs.has(slug)) {
          slug = `${baseSlug}-${counter}`;
          counter++;
        }

        usedSlugs.add(slug);

        // Update doctor with slug
        await Doctor.updateOne(
          { _id: doctor._id },
          { $set: { slug } }
        );
        
        console.log(`Updated: ${doctor.name} -> ${slug}`);
        updated++;
      }
    }

    console.log(`\n✅ Successfully updated ${updated} doctors with slugs`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addSlugsToExistingDoctors();
