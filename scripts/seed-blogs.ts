const mongoose = require('mongoose');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/manal-healthcare';

// Blog schema (matching the model)
const BlogSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    excerpt: String,
    content: String,
    content2: String,
    content3: String,
    image: String,
    category: String,
    author: String,
    date: Date,
    bullets: [String],
    subheading: String,
    extraImages: [String],
    status: String,
    featured: Boolean,
    views: Number,
    tags: [String],
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

// Sample blogs data
const blogsData = [
  {
    title: "Selecting the Best Sunscreen for Your Skin Type",
    slug: "selecting-best-sunscreen-for-skin-type",
    excerpt: "Learn how to choose the right sunscreen for your skin to protect against harmful UV rays and maintain healthy skin.",
    content: "Sunscreen is one of the most important skincare products you can use daily. Whether you have oily, dry, combination, or sensitive skin, selecting the right sunscreen can protect you from harmful UV rays while complementing your skin's unique needs. In this comprehensive guide, we'll explore everything you need to know about choosing the perfect sunscreen for your skin type, understanding SPF ratings, and identifying key ingredients that make a difference.",
    content2: "The importance of daily sunscreen use cannot be overstated. UV radiation from the sun can cause premature aging, dark spots, and increase your risk of skin cancer. Many people make the mistake of only applying sunscreen on sunny days or during beach trips, but dermatologists recommend wearing it every single day, regardless of the weather. Even on cloudy days, up to 80% of UV rays can penetrate through clouds and affect your skin.",
    content3: "When shopping for sunscreen, you'll encounter various formulations including lotions, creams, gels, sprays, and sticks. Each has its advantages depending on your lifestyle and preferences. For facial use, many people prefer lightweight, non-greasy formulas that won't clog pores or interfere with makeup application. Body sunscreens, on the other hand, may be more moisturizing and come in larger, more economical sizes.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
    category: "Skincare",
    author: "Dr. Sarah Johnson",
    date: new Date('2025-01-10'),
    bullets: [
      "Understand your specific skin type and its unique characteristics",
      "Choose the appropriate SPF level - minimum SPF 30 for daily use",
      "Check for broad-spectrum protection against both UVA and UVB rays",
      "Look for non-comedogenic formulas if you have acne-prone skin",
      "Consider water-resistant options for active lifestyles",
    ],
    subheading: "Why Two Approach: Choosing Traditional Therapy vs Modern Treatment Plans is Essential for Next Gen Skin Health",
    extraImages: [],
    status: "published",
    featured: true,
    views: 1234,
    tags: ["skincare", "sunscreen", "skin protection", "dermatology"],
    seoTitle: "Best Sunscreen Guide 2025 - Choose Right SPF for Your Skin",
    seoDescription: "Complete guide to selecting the perfect sunscreen for your skin type. Learn about SPF, UVA/UVB protection, and best ingredients.",
  },
  {
    title: "Understanding Heart Disease Prevention: A Comprehensive Guide",
    slug: "understanding-heart-disease-prevention",
    excerpt: "Discover essential strategies to prevent heart disease and maintain cardiovascular health throughout your life.",
    content: "Heart disease remains the leading cause of death worldwide, but the good news is that many cases are preventable through lifestyle modifications and early detection. Understanding the risk factors and implementing preventive strategies can significantly reduce your chances of developing cardiovascular problems. This comprehensive guide will walk you through everything you need to know about heart disease prevention.",
    content2: "The foundation of heart disease prevention lies in understanding and managing your risk factors. Some factors like age, family history, and genetics cannot be changed, but many others are within your control. Regular exercise, a heart-healthy diet, stress management, and avoiding tobacco are among the most powerful tools you have to protect your cardiovascular system.",
    content3: "Regular health screenings play a crucial role in prevention. Blood pressure monitoring, cholesterol checks, and diabetes screening can catch potential problems before they become serious. Your doctor may recommend additional tests based on your individual risk factors. Remember, prevention is always easier and more effective than treatment.",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800",
    category: "Cardiology",
    author: "Dr. Rajesh Kumar",
    date: new Date('2025-01-08'),
    bullets: [
      "Maintain a healthy weight through balanced diet and regular exercise",
      "Monitor blood pressure and cholesterol levels regularly",
      "Quit smoking and limit alcohol consumption",
      "Manage stress through meditation and relaxation techniques",
      "Get adequate sleep - aim for 7-9 hours per night",
    ],
    subheading: "Your Heart Health is in Your Hands: Simple Steps for a Stronger Cardiovascular System",
    extraImages: [],
    status: "published",
    featured: true,
    views: 892,
    tags: ["cardiology", "heart health", "prevention", "cardiovascular"],
    seoTitle: "Heart Disease Prevention Guide 2025 - Protect Your Heart",
    seoDescription: "Learn proven strategies to prevent heart disease. Expert advice on diet, exercise, and lifestyle changes for better heart health.",
  },
  {
    title: "Latest Advances in Joint Replacement Surgery",
    slug: "latest-advances-joint-replacement-surgery",
    excerpt: "Explore cutting-edge techniques and technologies revolutionizing joint replacement procedures for better outcomes.",
    content: "Joint replacement surgery has evolved dramatically over the past decade, offering patients more options, faster recovery times, and improved long-term outcomes. Modern orthopedic techniques now allow for minimally invasive procedures, computer-assisted surgery, and customized implants tailored to each patient's anatomy. These advances are transforming the lives of millions suffering from debilitating joint pain.",
    content2: "One of the most significant developments is the shift towards outpatient joint replacement procedures. What once required a week-long hospital stay can now be performed with same-day discharge in carefully selected patients. This approach reduces infection risks, accelerates recovery, and allows patients to recuperate in the comfort of their homes. Improved pain management protocols and enhanced surgical techniques make this possible.",
    content3: "The future of joint replacement looks even more promising with the integration of robotic-assisted surgery and 3D-printed custom implants. These technologies allow surgeons to achieve unprecedented precision in implant positioning, which directly translates to better function and longer implant survival. Patients can expect continued improvements in outcomes and quality of life.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800",
    category: "Orthopedics",
    author: "Dr. Priya Sharma",
    date: new Date('2025-01-05'),
    bullets: [
      "Minimally invasive techniques reduce tissue damage and speed recovery",
      "Computer-assisted navigation improves surgical precision",
      "Custom 3D-printed implants match individual patient anatomy",
      "Enhanced materials extend implant longevity",
      "Outpatient procedures available for suitable candidates",
    ],
    subheading: "Revolutionary Orthopedic Innovations: From Traditional Surgery to Precision Medicine",
    extraImages: [],
    status: "published",
    featured: false,
    views: 567,
    tags: ["orthopedics", "joint replacement", "surgery", "innovation"],
    seoTitle: "Joint Replacement Surgery 2025 - Latest Advances & Techniques",
    seoDescription: "Discover the latest advances in joint replacement surgery including minimally invasive techniques and robotic-assisted procedures.",
  },
  {
    title: "Mental Health in the Digital Age: Finding Balance",
    slug: "mental-health-digital-age-finding-balance",
    excerpt: "Navigate the challenges of modern technology while maintaining your mental wellbeing and emotional health.",
    content: "In our hyper-connected world, technology has become both a blessing and a curse for mental health. While digital tools offer unprecedented access to information, support, and communication, they also contribute to anxiety, sleep disruption, and social comparison. Understanding how to harness technology's benefits while minimizing its negative impacts is crucial for mental wellbeing in the 21st century.",
    content2: "The constant connectivity of smartphones and social media has created an always-on culture that can be overwhelming. Research shows that excessive screen time, particularly before bed, disrupts sleep patterns and contributes to anxiety and depression. Setting boundaries with technology, such as designated phone-free times and spaces, can significantly improve mental health outcomes.",
    content3: "However, technology also offers powerful tools for mental health support. Teletherapy platforms make professional help more accessible, meditation apps guide stress reduction, and online communities provide valuable peer support. The key is using these tools mindfully and in balance with real-world connections and activities.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    category: "Mental Health",
    author: "Dr. Michael Chen",
    date: new Date('2025-01-03'),
    bullets: [
      "Set clear boundaries for technology use, especially before bedtime",
      "Practice mindful social media consumption",
      "Utilize digital wellness tools and apps for meditation",
      "Schedule regular digital detox periods",
      "Prioritize face-to-face interactions alongside virtual connections",
    ],
    subheading: "Thriving in a Connected World: Strategies for Digital Wellness",
    extraImages: [],
    status: "published",
    featured: true,
    views: 1089,
    tags: ["mental health", "digital wellness", "technology", "balance"],
    seoTitle: "Mental Health in Digital Age 2025 - Finding Balance",
    seoDescription: "Learn how to maintain mental wellbeing while navigating technology. Expert tips for digital wellness and healthy tech habits.",
  },
  {
    title: "Nutrition for Optimal Brain Health and Cognitive Function",
    slug: "nutrition-optimal-brain-health-cognitive-function",
    excerpt: "Discover the foods and nutrients that support brain health, memory, and mental clarity at every age.",
    content: "What you eat has a profound impact on your brain health and cognitive function. The brain, though only 2% of body weight, uses 20% of the body's energy and requires specific nutrients to function optimally. A diet rich in certain foods can enhance memory, improve concentration, and protect against cognitive decline as we age. This guide explores the science-backed connection between nutrition and brain health.",
    content2: "The Mediterranean diet has consistently shown the strongest evidence for supporting brain health. Rich in omega-3 fatty acids from fish, antioxidants from fruits and vegetables, and healthy fats from olive oil and nuts, this dietary pattern reduces inflammation and oxidative stress that can damage brain cells. Studies show it may reduce the risk of Alzheimer's disease and slow cognitive decline.",
    content3: "Specific nutrients play crucial roles in brain function. Omega-3 fatty acids, particularly DHA, are essential for brain structure and communication between neurons. B vitamins support neurotransmitter production and protect against brain shrinkage. Antioxidants like vitamins C and E combat free radical damage. Ensuring adequate intake of these nutrients through diet or supplementation is key to maintaining cognitive health.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    category: "Nutrition",
    author: "Dr. Emily Rodriguez",
    date: new Date('2024-12-28'),
    bullets: [
      "Include fatty fish like salmon twice weekly for omega-3s",
      "Eat a rainbow of fruits and vegetables for antioxidants",
      "Choose whole grains over refined carbohydrates",
      "Include nuts, seeds, and olive oil for healthy fats",
      "Stay hydrated - dehydration impairs cognitive function",
    ],
    subheading: "Feed Your Mind: The Ultimate Guide to Brain-Boosting Nutrition",
    extraImages: [],
    status: "published",
    featured: false,
    views: 745,
    tags: ["nutrition", "brain health", "cognitive function", "diet"],
    seoTitle: "Brain Health Nutrition Guide 2025 - Foods for Memory & Focus",
    seoDescription: "Discover which foods boost brain health and cognitive function. Science-backed nutrition tips for optimal mental performance.",
  },
];

async function seedBlogs() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing blogs');

    // Insert sample blogs
    const result = await Blog.insertMany(blogsData);
    console.log(`✅ Inserted ${result.length} blogs`);

    console.log('\n📊 Seeding Summary:');
    console.log(`   Total: ${result.length}`);
    console.log(`   Published: ${result.filter(b => b.status === 'published').length}`);
    console.log(`   Featured: ${result.filter(b => b.featured).length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    process.exit(1);
  }
}

seedBlogs();
