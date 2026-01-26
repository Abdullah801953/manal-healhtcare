const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manal-healthcare';

// Testimonial schema (matching the model)
const TestimonialSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    country: String,
    countryFlag: String,
    treatment: String,
    hospital: String,
    doctor: String,
    rating: Number,
    date: Date,
    image: String,
    testimonial: String,
    videoUrl: String,
    verified: Boolean,
    featured: Boolean,
    category: String,
    status: String,
  },
  { timestamps: true }
);

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

// Sample testimonials data
const testimonialsData = [
  {
    name: 'John Smith',
    age: 58,
    country: 'United States',
    countryFlag: '🇺🇸',
    treatment: 'Cardiac Bypass Surgery',
    hospital: 'Manal Heart Institute',
    doctor: 'Dr. Rajesh Kumar',
    rating: 5,
    date: new Date('2025-12-15'),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    testimonial: 'My experience at Manal Healthcare was exceptional. The cardiac surgery team was highly professional, and Dr. Kumar explained every step of the procedure. The post-operative care was outstanding, and I recovered faster than expected. The facility was world-class, and the staff was incredibly caring. I highly recommend Manal Healthcare to anyone seeking quality medical care at affordable prices.',
    verified: true,
    featured: true,
    category: 'Cardiac Care',
    status: 'approved',
  },
  {
    name: 'Sarah Johnson',
    age: 45,
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    treatment: 'Knee Replacement Surgery',
    hospital: 'Manal Orthopedic Center',
    doctor: 'Dr. Priya Sharma',
    rating: 5,
    date: new Date('2025-11-28'),
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    testimonial: 'After years of knee pain, I decided to have my surgery at Manal Healthcare. The entire process from consultation to post-surgery rehabilitation was smooth and professional. Dr. Sharma is an excellent surgeon, and the physiotherapy team helped me regain mobility quickly. The cost was significantly lower than in the UK, and the quality was even better.',
    verified: true,
    featured: true,
    category: 'Orthopedic',
    status: 'approved',
  },
  {
    name: 'Mohammed Al-Faisal',
    age: 42,
    country: 'Saudi Arabia',
    countryFlag: '🇸🇦',
    treatment: 'Cosmetic Rhinoplasty',
    hospital: 'Manal Cosmetic Surgery Center',
    doctor: 'Dr. Anjali Mehta',
    rating: 5,
    date: new Date('2025-11-10'),
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    testimonial: 'I traveled from Saudi Arabia for cosmetic surgery, and it was the best decision. Dr. Mehta is highly skilled and understood exactly what I wanted. The results are natural and exceed my expectations. The hospital facilities rival any luxury medical center in the world. Thank you, Manal Healthcare!',
    verified: true,
    featured: true,
    category: 'Cosmetic Surgery',
    status: 'approved',
  },
  {
    name: 'Emily Chen',
    age: 52,
    country: 'Canada',
    countryFlag: '🇨🇦',
    treatment: 'Breast Cancer Treatment',
    hospital: 'Manal Cancer Care Institute',
    doctor: 'Dr. Vikram Singh',
    rating: 5,
    date: new Date('2025-10-22'),
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    testimonial: 'Fighting cancer is difficult, but Manal Healthcare made the journey bearable. The oncology team, led by Dr. Singh, provided comprehensive treatment with compassion and expertise. The advanced radiation therapy and personalized care plan helped me beat cancer. I am now cancer-free and eternally grateful.',
    verified: true,
    featured: true,
    category: 'Cancer Treatment',
    status: 'approved',
  },
  {
    name: 'David Williams',
    age: 38,
    country: 'Australia',
    countryFlag: '🇦🇺',
    treatment: 'Spinal Surgery',
    hospital: 'Manal Neuroscience Institute',
    doctor: 'Dr. Suresh Patel',
    rating: 5,
    date: new Date('2025-10-05'),
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    testimonial: 'I had chronic back pain for years and was hesitant about spinal surgery. Dr. Patel and his team at Manal Healthcare performed a minimally invasive procedure that changed my life. I can now walk without pain and have returned to my active lifestyle. The technology and expertise here are world-class.',
    verified: true,
    featured: false,
    category: 'Neurology',
    status: 'approved',
  },
  {
    name: 'Maria Rodriguez',
    age: 35,
    country: 'Germany',
    countryFlag: '🇩🇪',
    treatment: 'IVF Treatment',
    hospital: 'Manal Fertility Center',
    doctor: 'Dr. Kavita Reddy',
    rating: 5,
    date: new Date('2025-09-18'),
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    testimonial: 'After years of trying to conceive, we came to Manal Healthcare for IVF treatment. Dr. Reddy and her team were compassionate, understanding, and highly professional. The success rate was impressive, and now we are blessed with a beautiful baby. Thank you for making our dreams come true!',
    verified: true,
    featured: true,
    category: 'IVF Treatment',
    status: 'approved',
  },
  {
    name: 'Ahmed Hassan',
    age: 48,
    country: 'Egypt',
    countryFlag: '🇪🇬',
    treatment: 'Liver Transplant',
    hospital: 'Manal Multi-Specialty Hospital',
    doctor: 'Dr. Ravi Gupta',
    rating: 5,
    date: new Date('2025-08-30'),
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    testimonial: 'I received a life-saving liver transplant at Manal Healthcare. The transplant surgery was performed flawlessly, and the post-operative care was exceptional. Dr. Gupta is a world-class surgeon, and the entire medical team supported me throughout the recovery. I am grateful to be alive and healthy today.',
    verified: true,
    featured: false,
    category: 'Transplant',
    status: 'approved',
  },
  {
    name: 'Lisa Anderson',
    age: 33,
    country: 'Sweden',
    countryFlag: '🇸🇪',
    treatment: 'Dental Implants',
    hospital: 'Manal Dental Care',
    doctor: 'Dr. Nitin Joshi',
    rating: 5,
    date: new Date('2025-08-12'),
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    testimonial: 'I came to India for full mouth dental implants and was amazed by the quality of care at Manal Dental Care. Dr. Joshi is an excellent dentist, and the results are stunning. My smile has been completely transformed, and the cost was a fraction of what it would have been in Sweden. Highly recommend!',
    verified: true,
    featured: false,
    category: 'Dental Care',
    status: 'approved',
  },
  {
    name: 'Robert Thompson',
    age: 55,
    country: 'New Zealand',
    countryFlag: '🇳🇿',
    treatment: 'Cataract Surgery',
    hospital: 'Manal Eye Hospital',
    doctor: 'Dr. Sunita Kapoor',
    rating: 5,
    date: new Date('2025-07-25'),
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    testimonial: 'My vision was deteriorating due to cataracts, and I chose Manal Eye Hospital for surgery. Dr. Kapoor performed the procedure with precision, and my vision is now crystal clear. The hospital uses the latest technology, and the staff was wonderful. I can see the world clearly again!',
    verified: true,
    featured: false,
    category: 'Eye Care',
    status: 'approved',
  },
  {
    name: 'Fatima Al-Mansoori',
    age: 40,
    country: 'United Arab Emirates',
    countryFlag: '🇦🇪',
    treatment: 'Bariatric Surgery',
    hospital: 'Manal Weight Loss Center',
    doctor: 'Dr. Amit Sharma',
    rating: 5,
    date: new Date('2025-07-08'),
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400',
    testimonial: 'I struggled with obesity for years and decided to undergo bariatric surgery at Manal Healthcare. Dr. Sharma and his team provided excellent care, and the surgery was successful. I have lost significant weight and feel healthier than ever. The support and follow-up care have been outstanding.',
    verified: true,
    featured: true,
    category: 'Weight Loss',
    status: 'approved',
  },
];

async function seedTestimonials() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing testimonials');

    // Insert sample testimonials
    const result = await Testimonial.insertMany(testimonialsData);
    console.log(`✅ Inserted ${result.length} testimonials`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   Total: ${result.length}`);
    console.log(`   Approved: ${result.filter(t => t.status === 'approved').length}`);
    console.log(`   Featured: ${result.filter(t => t.featured).length}`);
    console.log(`   Verified: ${result.filter(t => t.verified).length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();
