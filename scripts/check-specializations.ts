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
    
    const doctors = await db.collection('doctors').find({}).toArray();
    const specs = new Set<string>();
    doctors.forEach(d => {
      if (d.specialization && Array.isArray(d.specialization)) {
        d.specialization.forEach((s: string) => specs.add(s));
      } else if (typeof d.specialization === 'string') {
        specs.add(d.specialization);
      }
    });
    
    console.log('=== UNIQUE SPECIALIZATIONS ===');
    console.log(Array.from(specs));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

check();
