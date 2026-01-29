import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

async function seedAdmin() {
  // Dynamic imports after dotenv is loaded
  const connectDB = (await import('../lib/mongodb')).default;
  const Admin = (await import('../lib/models/Admin')).default;
  const bcrypt = await import('bcryptjs');
  try {
    console.log('🌱 Starting admin seed...');
    
    // Connect to database
    await connectDB();
    console.log('✅ Connected to database');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@manalhealthcare.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Skipping seed.');
      console.log('📧 Email:', existingAdmin.email);
      console.log('👤 Name:', existingAdmin.name);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await Admin.create({
      email: 'admin@manalhealthcare.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔐 Password: admin123');
    console.log('\n🚀 You can now login at: http://localhost:3000/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
