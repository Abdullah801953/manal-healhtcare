/**
 * Script to migrate existing treatments data from data.ts to MongoDB
 * Run with: npx tsx scripts/seed-treatments.ts
 */

import connectDB from '../lib/mongodb';
import Treatment from '../lib/models/Treatment';
import { treatmentsData } from '../app/treatments/data';

async function seedTreatments() {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected to MongoDB successfully!');

    // Clear existing treatments
    console.log('Clearing existing treatments...');
    await Treatment.deleteMany({});
    console.log('Existing treatments cleared.');

    // Transform and insert treatments
    console.log('Inserting treatments...');
    let insertedCount = 0;
    let errorCount = 0;

    for (const treatment of treatmentsData) {
      try {
        // Transform the treatment data to match the model
        const treatmentData = {
          slug: treatment.slug,
          title: treatment.title,
          category: treatment.category,
          description: treatment.description,
          overview: treatment.overview,
          types: treatment.types,
          purpose: treatment.purpose,
          diseasesTreated: treatment.diseasesTreated,
          risks: treatment.risks,
          gvhd: treatment.gvhd,
          gvhdSymptoms: treatment.gvhdSymptoms,
          preTransplant: treatment.preTransplant,
          autologous: treatment.autologous,
          conditioning: treatment.conditioning,
          summary: treatment.summary,
          shortDescription: treatment.shortDescription,
          // Convert image from StaticImageData to string if needed
          image: typeof treatment.image === 'string' ? treatment.image : undefined,
          duration: treatment.duration,
          price: treatment.price,
          featured: treatment.featured,
          benefits: treatment.benefits,
          procedures: treatment.procedures,
          disorders: treatment.disorders,
          oncologyTypes: treatment.oncologyTypes,
          domains: treatment.domains,
          reasons: treatment.reasons,
          cancerTypes: treatment.cancerTypes,
          conditions: treatment.conditions,
          diagnosis: treatment.diagnosis,
          functions: treatment.functions,
          specialized: treatment.specialized,
          tests: treatment.tests,
          neuroplasticity: treatment.neuroplasticity,
          areas: treatment.areas,
          causes: treatment.causes,
          tumors: treatment.tumors,
          clinical: treatment.clinical,
          surgery: treatment.surgery,
          whyIndia: treatment.whyIndia,
          status: 'active'
        };

        await Treatment.create(treatmentData);
        insertedCount++;
        console.log(`✓ Inserted: ${treatment.title}`);
      } catch (error: any) {
        errorCount++;
        console.error(`✗ Error inserting ${treatment.title}:`, error.message);
      }
    }

    console.log('\n========================================');
    console.log('Seeding completed!');
    console.log(`Total treatments processed: ${treatmentsData.length}`);
    console.log(`Successfully inserted: ${insertedCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding treatments:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedTreatments();
