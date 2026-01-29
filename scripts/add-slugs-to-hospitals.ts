import connectDB from '../lib/mongodb';
import Hospital from '../lib/models/Hospital';

// Generate slug from hospital name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

async function addSlugsToHospitals() {
  try {
    await connectDB();
    console.log('Connected to database');

    // Find all hospitals without slugs
    const hospitals = await Hospital.find({ $or: [{ slug: { $exists: false } }, { slug: '' }] });
    
    console.log(`Found ${hospitals.length} hospitals without slugs`);

    for (const hospital of hospitals) {
      const slug = generateSlug(hospital.name);
      
      // Check if slug already exists
      const existingHospital = await Hospital.findOne({ slug, _id: { $ne: hospital._id } });
      
      if (existingHospital) {
        // If slug exists, add a number suffix
        let counter = 1;
        let uniqueSlug = `${slug}-${counter}`;
        
        while (await Hospital.findOne({ slug: uniqueSlug })) {
          counter++;
          uniqueSlug = `${slug}-${counter}`;
        }
        
        hospital.slug = uniqueSlug;
        console.log(`Adding slug: ${uniqueSlug} to hospital: ${hospital.name}`);
      } else {
        hospital.slug = slug;
        console.log(`Adding slug: ${slug} to hospital: ${hospital.name}`);
      }
      
      await hospital.save();
    }

    console.log('✓ Successfully added slugs to all hospitals');
    process.exit(0);
  } catch (error) {
    console.error('Error adding slugs to hospitals:', error);
    process.exit(1);
  }
}

addSlugsToHospitals();
