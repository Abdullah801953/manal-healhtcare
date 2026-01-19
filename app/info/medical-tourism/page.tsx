import type { Metadata } from "next";
import {
  Globe,
  Heart,
  TrendingUp,
  Shield,
  DollarSign,
  Users,
  Plane,
  Star,
  Award,
  CheckCircle2,
  Clock,
  Target,
  Zap,
  Brain,
  Stethoscope,
  Building2,
  MapPin,
  BarChart,
  Sparkles,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  FileText
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Medical Tourism | Global Healthcare Travel & Treatment Abroad",
  description: "Comprehensive guide to medical tourism: affordable, high-quality healthcare worldwide. Learn about medical travel benefits, destinations, procedures, costs, and how to plan your healthcare journey abroad.",
  keywords: [
    "medical tourism",
    "healthcare tourism",
    "medical travel abroad",
    "international healthcare",
    "affordable medical treatment",
    "treatment abroad",
    "medical tourism destinations",
    "healthcare travel",
    "medical procedures abroad",
    "global healthcare",
    "health tourism",
    "medical vacation",
    "surgical tourism",
    "wellness tourism",
    "international medical care"
  ],
  openGraph: {
    title: "Medical Tourism | Global Healthcare Travel & Treatment Abroad",
    description: "Discover world-class healthcare at affordable prices. Comprehensive medical tourism guide for international patients seeking quality treatment abroad.",
    type: "website",
    url: "https://manalhealthcare.com/info/medical-tourism",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Tourism | Global Healthcare Travel",
    description: "Access world-class healthcare worldwide at affordable prices. Your complete guide to medical tourism.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/medical-tourism",
  },
};

// TypeScript Interfaces
interface Statistic {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  examples: string[];
}

interface Destination {
  country: string;
  flag: string;
  specialties: string[];
  costSavings: string;
  popularFor: string[];
  qualityRating: number;
}

interface PopularProcedure {
  icon: React.ElementType;
  procedure: string;
  description: string;
  averageCost: string;
  savingsPercent: string;
  duration: string;
}

interface TrendFactor {
  icon: React.ElementType;
  factor: string;
  description: string;
  impact: string;
}

interface ConsiderationPoint {
  icon: React.ElementType;
  consideration: string;
  description: string;
  tips: string[];
}

// Reusable Components
const StatCard = ({ stat }: { stat: Statistic }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow text-center">
    <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
      <stat.icon className="w-10 h-10 text-blue-600" />
    </div>
    <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
    <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
    <p className="text-sm text-gray-600">{stat.description}</p>
  </Card>
);

const BenefitCard = ({ benefit }: { benefit: Benefit }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
    <div className="flex flex-col h-full">
      <div className="p-3 bg-emerald-100 rounded-lg w-fit mb-4">
        <benefit.icon className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{benefit.description}</p>
      <div className="space-y-2">
        {benefit.examples.map((example, index) => (
          <div key={index} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-600">{example}</span>
          </div>
        ))}
      </div>
    </div>
  </Card>
);

const DestinationCard = ({ destination }: { destination: Destination }) => (
  <Card className="p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{destination.flag}</span>
        <h3 className="text-2xl font-bold text-gray-900">{destination.country}</h3>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < destination.qualityRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Medical Specialties:</h4>
        <div className="flex flex-wrap gap-2">
          {destination.specialties.map((specialty, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {specialty}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Popular Treatments:</h4>
        <ul className="space-y-1">
          {destination.popularFor.map((treatment, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {treatment}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Average Savings:</span>
          <span className="text-lg font-bold text-emerald-600">{destination.costSavings}</span>
        </div>
      </div>
    </div>
  </Card>
);

const ProcedureCard = ({ procedure }: { procedure: PopularProcedure }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-indigo-100 rounded-lg">
        <procedure.icon className="w-8 h-8 text-indigo-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{procedure.procedure}</h3>
        <p className="text-gray-600 text-sm">{procedure.description}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
      <div>
        <p className="text-xs text-gray-500 mb-1">Avg Cost Abroad</p>
        <p className="font-semibold text-indigo-600">{procedure.averageCost}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Savings</p>
        <p className="font-semibold text-emerald-600">{procedure.savingsPercent}</p>
      </div>
      <div>
        <p className="text-xs text-gray-500 mb-1">Stay Duration</p>
        <p className="font-semibold text-gray-900">{procedure.duration}</p>
      </div>
    </div>
  </Card>
);

// Data Arrays
const statistics: Statistic[] = [
  {
    icon: Users,
    value: "14M+",
    label: "Global Patients Annually",
    description: "People travel internationally for medical care each year"
  },
  {
    icon: Globe,
    value: "50+",
    label: "Destination Countries",
    description: "Countries actively promoting medical tourism"
  },
  {
    icon: DollarSign,
    value: "$100B+",
    label: "Industry Value",
    description: "Global medical tourism market size and growing"
  },
  {
    icon: TrendingUp,
    value: "25%",
    label: "Annual Growth",
    description: "Year-over-year industry growth rate"
  }
];

const benefits: Benefit[] = [
  {
    icon: DollarSign,
    title: "Significant Cost Savings",
    description: "Medical procedures abroad cost 40-90% less than in developed countries",
    examples: [
      "Heart surgery: Save $50,000-$150,000",
      "Hip replacement: Save $30,000-$40,000",
      "Dental implants: Save $15,000-$25,000"
    ]
  },
  {
    icon: Shield,
    title: "High-Quality Care",
    description: "Access to internationally accredited hospitals with experienced specialists",
    examples: [
      "JCI accredited facilities worldwide",
      "Doctors trained at top global institutions",
      "Latest medical technology and equipment"
    ]
  },
  {
    icon: Clock,
    title: "Reduced Wait Times",
    description: "Avoid long waiting lists common in public healthcare systems",
    examples: [
      "Immediate scheduling for most procedures",
      "No months-long waiting periods",
      "Expedited treatment for urgent cases"
    ]
  },
  {
    icon: Target,
    title: "Access to Specialists",
    description: "Connect with world-renowned specialists not available locally",
    examples: [
      "Rare disease specialists",
      "Advanced surgical techniques",
      "Cutting-edge treatments and trials"
    ]
  },
  {
    icon: Plane,
    title: "Combined Tourism",
    description: "Combine medical treatment with vacation and cultural experiences",
    examples: [
      "Recover in beautiful destinations",
      "Family can enjoy tourism",
      "Unique cultural experiences"
    ]
  },
  {
    icon: Sparkles,
    title: "Privacy & Discretion",
    description: "Maintain complete privacy for sensitive procedures",
    examples: [
      "Cosmetic surgery privacy",
      "Fertility treatment discretion",
      "Away from local community"
    ]
  }
];

const destinations: Destination[] = [
  {
    country: "India",
    flag: "🇮🇳",
    specialties: ["Cardiac", "Orthopedic", "Oncology", "IVF"],
    costSavings: "65-90%",
    popularFor: [
      "Heart surgery and cardiac care",
      "Joint replacements",
      "Cancer treatment",
      "Cosmetic surgery"
    ],
    qualityRating: 5
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    specialties: ["Cosmetic", "Dental", "Cardiac", "IVF"],
    costSavings: "50-70%",
    popularFor: [
      "Cosmetic and plastic surgery",
      "Dental procedures",
      "Gender reassignment surgery",
      "Wellness and spa treatments"
    ],
    qualityRating: 5
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    specialties: ["Hair Transplant", "Dental", "Eye", "Cosmetic"],
    costSavings: "60-80%",
    popularFor: [
      "Hair transplantation",
      "Dental implants and veneers",
      "LASIK eye surgery",
      "Cosmetic procedures"
    ],
    qualityRating: 5
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    specialties: ["Dental", "Bariatric", "Cosmetic", "Orthopedic"],
    costSavings: "40-65%",
    popularFor: [
      "Dental care and implants",
      "Bariatric surgery",
      "Cosmetic dentistry",
      "Weight loss procedures"
    ],
    qualityRating: 4
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    specialties: ["Cardiac", "Oncology", "Neurology", "Stem Cell"],
    costSavings: "25-40%",
    popularFor: [
      "Advanced cardiac procedures",
      "Cancer treatment",
      "Neurological surgery",
      "Stem cell therapy"
    ],
    qualityRating: 5
  },
  {
    country: "Costa Rica",
    flag: "🇨🇷",
    specialties: ["Dental", "Cosmetic", "Orthopedic", "IVF"],
    costSavings: "45-70%",
    popularFor: [
      "Dental tourism",
      "Cosmetic surgery",
      "Joint replacements",
      "Fertility treatments"
    ],
    qualityRating: 4
  }
];

const popularProcedures: PopularProcedure[] = [
  {
    icon: Heart,
    procedure: "Cardiac Surgery",
    description: "Heart bypass, valve replacement, angioplasty",
    averageCost: "$8,000-$15,000",
    savingsPercent: "80-85%",
    duration: "2-3 weeks"
  },
  {
    icon: Brain,
    procedure: "Orthopedic Surgery",
    description: "Hip/knee replacement, spine surgery",
    averageCost: "$6,000-$12,000",
    savingsPercent: "70-80%",
    duration: "2-3 weeks"
  },
  {
    icon: Sparkles,
    procedure: "Cosmetic Surgery",
    description: "Facelifts, rhinoplasty, breast augmentation",
    averageCost: "$3,000-$8,000",
    savingsPercent: "60-75%",
    duration: "1-2 weeks"
  },
  {
    icon: Users,
    procedure: "Dental Procedures",
    description: "Implants, veneers, crowns, full restoration",
    averageCost: "$800-$3,000",
    savingsPercent: "50-70%",
    duration: "5-10 days"
  },
  {
    icon: Heart,
    procedure: "IVF Treatment",
    description: "In-vitro fertilization and fertility treatments",
    averageCost: "$3,000-$5,000",
    savingsPercent: "65-75%",
    duration: "2-4 weeks"
  },
  {
    icon: Target,
    procedure: "Bariatric Surgery",
    description: "Gastric bypass, sleeve gastrectomy",
    averageCost: "$7,000-$12,000",
    savingsPercent: "70-80%",
    duration: "1-2 weeks"
  }
];

const growthFactors: TrendFactor[] = [
  {
    icon: DollarSign,
    factor: "Rising Healthcare Costs",
    description: "Escalating medical costs in developed countries drive patients to seek affordable alternatives abroad",
    impact: "Primary driver of medical tourism growth"
  },
  {
    icon: Globe,
    factor: "Globalization",
    description: "Increased international connectivity, easier travel, and information sharing make medical tourism accessible",
    impact: "Breaking down geographical barriers to healthcare"
  },
  {
    icon: Award,
    factor: "Quality Improvements",
    description: "International accreditation and quality standards ensure high-quality care in developing countries",
    impact: "Building patient confidence in foreign healthcare"
  },
  {
    icon: Zap,
    factor: "Technology Advancement",
    description: "Telemedicine, virtual consultations, and digital health records simplify international treatment",
    impact: "Enabling seamless cross-border healthcare"
  }
];

const considerations: ConsiderationPoint[] = [
  {
    icon: Shield,
    consideration: "Hospital Accreditation",
    description: "Verify international quality certifications",
    tips: [
      "Look for JCI (Joint Commission International) accreditation",
      "Check local equivalent accreditations (NABH in India)",
      "Research hospital's international patient experience",
      "Verify doctor qualifications and training"
    ]
  },
  {
    icon: FileText,
    consideration: "Treatment Planning",
    description: "Comprehensive preparation before travel",
    tips: [
      "Get detailed treatment plan and cost estimate",
      "Understand what's included in quoted price",
      "Plan for recovery time and follow-up care",
      "Arrange medical records and test results"
    ]
  },
  {
    icon: Plane,
    consideration: "Travel & Logistics",
    description: "Organize travel details carefully",
    tips: [
      "Apply for medical visa well in advance",
      "Book refundable/flexible flight tickets",
      "Arrange accommodation near hospital",
      "Consider medical travel insurance"
    ]
  },
  {
    icon: Users,
    consideration: "Communication",
    description: "Ensure clear communication throughout",
    tips: [
      "Confirm language capabilities of medical staff",
      "Get interpreter if needed",
      "Have clear communication channels established",
      "Get written documentation of everything"
    ]
  },
  {
    icon: BookOpen,
    consideration: "Legal & Insurance",
    description: "Understand legal protections and coverage",
    tips: [
      "Review malpractice laws in destination country",
      "Check if insurance covers treatment abroad",
      "Understand legal recourse options",
      "Get comprehensive travel insurance"
    ]
  },
  {
    icon: Heart,
    consideration: "Follow-up Care",
    description: "Plan for post-treatment support",
    tips: [
      "Arrange follow-up with home doctor",
      "Get detailed medical reports for home care",
      "Understand emergency contact procedures",
      "Clarify post-treatment support availability"
    ]
  }
];

export default function MedicalTourismPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Manal Healthcare - Medical Tourism Services",
            "description": "Comprehensive medical tourism services connecting patients with world-class healthcare worldwide",
            "url": "https://manalhealthcare.com/info/medical-tourism",
            "medicalSpecialty": [
              "Cardiology",
              "Orthopedics",
              "Oncology",
              "Cosmetic Surgery",
              "Dental Care"
            ]
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
              <Globe className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Medical Tourism: Your Gateway to Global Healthcare
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access world-class medical care at affordable prices. Discover how medical tourism combines 
              high-quality treatment, significant savings, and unique travel experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Mail className="w-5 h-5 mr-2" />
                Get Free Consultation
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {statistics.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* What is Medical Tourism */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What is Medical Tourism?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the global phenomenon of healthcare travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Medical tourism refers to traveling outside your home country to receive medical care. 
                This growing global phenomenon allows patients to access high-quality healthcare at more 
                affordable prices while often experiencing shorter wait times than in their home countries.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Modern medical tourism encompasses everything from routine dental procedures to complex 
                surgeries like cardiac operations, orthopedic procedures, cancer treatment, and cosmetic surgery.
              </p>
              <p className="text-lg text-gray-600">
                With over 14 million people traveling internationally for medical care each year, medical 
                tourism has become a $100+ billion industry, growing at 25% annually.
              </p>
            </div>
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Drivers</h3>
              <div className="space-y-4">
                {[
                  { icon: DollarSign, text: "Cost savings of 40-90%" },
                  { icon: Shield, text: "High-quality international standards" },
                  { icon: Clock, text: "No waiting lists" },
                  { icon: Target, text: "Access to specialized treatments" },
                  { icon: Plane, text: "Combine with vacation" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Medical Tourism?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the compelling advantages of seeking medical care abroad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leading Medical Tourism Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore top countries offering world-class medical care at competitive prices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination, index) => (
              <DestinationCard key={index} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Procedures */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Most Popular Medical Tourism Procedures
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Common treatments that medical tourists seek abroad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProcedures.map((procedure, index) => (
              <ProcedureCard key={index} procedure={procedure} />
            ))}
          </div>
        </div>
      </section>

      {/* Growth Factors */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Medical Tourism is Growing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors driving the rapid expansion of global healthcare travel
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {growthFactors.map((factor, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <factor.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{factor.factor}</h3>
                    <p className="text-gray-600 mb-3">{factor.description}</p>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Impact:</span> {factor.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Considerations */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Important Considerations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key factors to evaluate when planning medical treatment abroad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {considerations.map((consideration, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <consideration.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {consideration.consideration}
                    </h3>
                    <p className="text-sm text-gray-600">{consideration.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {consideration.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              How Manal Healthcare Facilitates Your Medical Journey
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Comprehensive support from consultation to recovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Medical Consultation",
                description: "Expert review of your case and treatment planning"
              },
              {
                icon: Building2,
                title: "Hospital Selection",
                description: "Match with accredited hospitals and specialists"
              },
              {
                icon: Plane,
                title: "Travel Coordination",
                description: "Visa assistance, flights, and accommodation"
              },
              {
                icon: Users,
                title: "Personal Coordinator",
                description: "24/7 support throughout your journey"
              },
              {
                icon: Stethoscope,
                title: "Treatment Support",
                description: "Coordination during hospitalization and recovery"
              },
              {
                icon: Heart,
                title: "Follow-up Care",
                description: "Post-treatment support and virtual consultations"
              }
            ].map((service, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="opacity-90">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
            <Globe className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Medical Tourism Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get expert guidance and personalized support for world-class healthcare at affordable prices. 
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Phone className="w-5 h-5 mr-2" />
              Call: +91-XXX-XXX-XXXX
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Mail className="w-5 h-5 mr-2" />
              Email: info@manalhealthcare.com
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Article */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>The Comprehensive Guide to Medical Tourism</h2>
          
          <p>
            Medical tourism has transformed from a niche phenomenon into a global healthcare revolution, 
            offering patients worldwide access to high-quality medical care at significantly lower costs 
            than in their home countries. This comprehensive guide explores everything you need to know 
            about medical tourism, from its origins to practical planning tips.
          </p>

          <h3>The Evolution of Medical Tourism</h3>
          
          <p>
            While people have traveled for health benefits since ancient times—think of Roman thermal baths 
            or healing pilgrimages—modern medical tourism began in the 1980s when patients from developed 
            countries started seeking elective procedures in countries like Thailand and India. Today, the 
            industry has matured into a sophisticated global healthcare network connecting patients with 
            world-class medical facilities worldwide.
          </p>

          <h3>Why Medical Tourism Makes Sense</h3>
          
          <p>
            The primary driver of medical tourism remains cost. Healthcare costs in the United States, for 
            example, can be prohibitively expensive even with insurance. A heart bypass surgery costing 
            $150,000 in the US might cost just $10,000 in India—same quality, 90% savings. Hip replacements, 
            dental procedures, cosmetic surgery, and fertility treatments all follow similar patterns.
          </p>

          <p>
            But cost isn't the only factor. Many patients face long waiting lists for non-emergency procedures 
            in countries with public healthcare systems. Medical tourism offers immediate access to treatment 
            without months of waiting. Others seek specialized procedures or treatments not available in their 
            home countries, while some prioritize privacy for sensitive procedures.
          </p>

          <h3>Quality Assurance in Medical Tourism</h3>
          
          <p>
            One common concern about medical tourism is quality. However, leading medical tourism destinations 
            have invested heavily in achieving international quality standards. Organizations like the Joint 
            Commission International (JCI) accredit hospitals worldwide, ensuring they meet the same rigorous 
            standards as top US hospitals. Many doctors in medical tourism destinations trained at prestigious 
            Western institutions and bring decades of experience.
          </p>

          <p>
            Countries like India, Thailand, Singapore, and Turkey have developed specialized medical tourism 
            infrastructure with dedicated international patient departments, multilingual staff, and services 
            tailored to foreign patients' needs. The technology and equipment in these hospitals often match 
            or exceed what's available in Western countries, with many facilities featuring the latest medical 
            innovations.
          </p>

          <h3>Planning Your Medical Tourism Journey</h3>
          
          <p>
            Successful medical tourism requires careful planning. Start by researching your destination and 
            hospital options, focusing on accredited facilities with strong international patient programs. 
            Request detailed treatment plans and cost estimates, ensuring you understand exactly what's included. 
            Consider the total cost including travel, accommodation, and post-treatment care, not just the 
            procedure itself.
          </p>

          <p>
            Working with a reputable medical tourism facilitator can streamline the process significantly. 
            These companies coordinate all aspects of your journey—from initial medical consultation to 
            hospital selection, travel arrangements, and follow-up care. They serve as your advocate, ensuring 
            quality care and smooth communication throughout the process.
          </p>

          <h3>The Role of Technology</h3>
          
          <p>
            Technology has made medical tourism more accessible and safer. Virtual consultations allow you to 
            meet with doctors before traveling, reviewing your case and establishing rapport. Digital medical 
            records transfer seamlessly across borders, ensuring your new medical team has complete information. 
            Telemedicine enables comprehensive follow-up care after you return home, with specialists monitoring 
            your recovery virtually.
          </p>

          <h3>The Future of Medical Tourism</h3>
          
          <p>
            Medical tourism continues evolving rapidly. Emerging destinations in Latin America, Eastern Europe, 
            and Africa are developing medical tourism capabilities. Specialized medical tourism insurance products 
            are becoming available, providing comprehensive coverage for treatment abroad. Some employers and 
            insurance companies now actively promote medical tourism as a cost-saving measure, offering incentives 
            for employees to seek treatment in select international facilities.
          </p>

          <p>
            The COVID-19 pandemic temporarily disrupted medical tourism but also accelerated adoption of virtual 
            consultations and digital health technologies that will permanently enhance the medical tourism 
            experience. As global healthcare integration continues, medical tourism will likely become increasingly 
            normalized as simply one option within a broader healthcare landscape.
          </p>

          <h3>Making the Decision</h3>
          
          <p>
            Medical tourism isn't right for every patient or every situation, but for many, it offers an excellent 
            solution to healthcare access and affordability challenges. The key is thorough research, realistic 
            expectations, and working with reputable healthcare providers and facilitators. With proper planning 
            and support, medical tourism can provide high-quality care, significant cost savings, and even a 
            unique cultural experience—all while addressing your healthcare needs effectively.
          </p>
        </div>
      </section>
    </div>
  );
}
