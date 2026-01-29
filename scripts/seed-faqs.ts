import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-connection-string';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, enum: ['general', 'medical', 'billing', 'appointments', 'other'], default: 'general' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);

const sampleFAQs = [
  {
    question: "What is Medical Tourism in India?",
    answer: "Medical Tourism in India allows patients from around the world to access high-quality medical treatments, top hospitals, and experienced doctors at affordable costs. Manal Healthcare organizes your entire medical journey seamlessly.",
    category: "general",
    order: 1,
    active: true
  },
  {
    question: "How can I find top hospitals and doctors through Manal Healthcare?",
    answer: "Manal Healthcare connects you with certified hospitals and highly experienced doctors across India. You can browse hospitals, read patient reviews, and book appointments directly through our platform.",
    category: "general",
    order: 2,
    active: true
  },
  {
    question: "Are the medical treatments affordable?",
    answer: "Our medical tourism services are cost-effective without compromising quality. Compare treatment packages and choose one that suits your budget and needs.",
    category: "billing",
    order: 3,
    active: true
  },
  {
    question: "Does Manal Healthcare assist with travel and accommodation?",
    answer: "We provide end-to-end support including visa guidance, travel arrangements, airport transfers, and hospital stays to make your medical journey stress-free.",
    category: "general",
    order: 4,
    active: true
  },
  {
    question: "How do I get started with Manal Healthcare?",
    answer: "Contact us via our website or phone, and our team will guide you through selecting the right hospital, doctor, and treatment plan tailored to your needs.",
    category: "appointments",
    order: 5,
    active: true
  },
  {
    question: "Is it safe to travel to India for medical treatment?",
    answer: "India has internationally accredited hospitals and experienced medical staff. We provide travel safety guidelines and local assistance to ensure a safe experience.",
    category: "medical",
    order: 6,
    active: true
  },
  {
    question: "Which medical specialties does Manal Healthcare cover?",
    answer: "We cover a wide range of specialties including Cardiology, Orthopedics, Neuro Surgery, Dental Care, Ophthalmology, Prenatal Care, and more.",
    category: "medical",
    order: 7,
    active: true
  },
  {
    question: "Can I get a cost estimate before traveling?",
    answer: "Our team provides detailed treatment cost estimates, including hospital fees, doctor charges, and optional travel assistance, so you can plan your medical trip in advance.",
    category: "billing",
    order: 8,
    active: true
  },
  {
    question: "How long does it take to arrange treatment in India?",
    answer: "Depending on the procedure and hospital availability, we typically arrange appointments and travel within 1-2 weeks. Our team ensures a smooth, quick process.",
    category: "appointments",
    order: 9,
    active: true
  },
  {
    question: "Does Manal Healthcare support international patients?",
    answer: "We specialize in assisting international patients with treatment, travel, accommodation, and post-treatment follow-up. Your comfort and safety are our priority.",
    category: "general",
    order: 10,
    active: true
  },
  {
    question: "What documents do I need for medical treatment in India?",
    answer: "You'll need a valid passport, visa (we assist with medical visa), previous medical records, and any prescriptions. Our team will provide a complete checklist.",
    category: "general",
    order: 11,
    active: true
  },
  {
    question: "Do you provide interpreter services?",
    answer: "Yes, we offer interpreter services in multiple languages to ensure clear communication between you and the medical team throughout your treatment.",
    category: "general",
    order: 12,
    active: true
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept international wire transfers, credit/debit cards, and online payment gateways. Payment plans can be discussed based on your treatment package.",
    category: "billing",
    order: 13,
    active: true
  },
  {
    question: "Can family members accompany me during treatment?",
    answer: "Absolutely! We can arrange accommodation and local assistance for family members or companions traveling with you for support.",
    category: "general",
    order: 14,
    active: true
  },
  {
    question: "What happens after my treatment is complete?",
    answer: "We provide comprehensive post-treatment care including follow-up consultations, medication guidance, and virtual check-ins with your doctor after you return home.",
    category: "medical",
    order: 15,
    active: true
  }
];

async function seedFAQs() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing FAQs
    await FAQ.deleteMany({});
    console.log('Cleared existing FAQs');

    // Insert sample FAQs
    const result = await FAQ.insertMany(sampleFAQs);
    console.log(`✅ Successfully inserted ${result.length} FAQs`);

    console.log('\nSample FAQs by category:');
    const categories = ['general', 'medical', 'billing', 'appointments'];
    for (const category of categories) {
      const count = result.filter((faq: any) => faq.category === category).length;
      console.log(`  ${category}: ${count} FAQs`);
    }

    await mongoose.disconnect();
    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    process.exit(1);
  }
}

seedFAQs();
