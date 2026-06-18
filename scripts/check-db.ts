import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

async function check() {
  if (!MONGODB_URI) {
    console.error('No MONGODB_URI found');
    process.exit(1);
  }
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    if (!db) {
      console.error('No database connection');
      return;
    }
    
    const hospitals = await db.collection('hospitals').find({}).toArray();
    console.log('=== HOSPITALS ===');
    hospitals.forEach(h => {
      console.log(`${h.name}: ${h.image}`);
    });
    
    const testimonials = await db.collection('testimonials').find({}).toArray();
    console.log('\n=== TESTIMONIALS ===');
    testimonials.forEach(t => {
      console.log(`${t.name}: ${t.image}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

check();
