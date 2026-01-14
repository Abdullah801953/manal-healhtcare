import type { Metadata } from "next";
import { 
  Award, 
  CheckCircle2, 
  Shield, 
  BookOpen, 
  Users, 
  Building,
  Utensils,
  Heart,
  ClipboardCheck,
  Building2,
  Globe,
  Star,
  TrendingUp,
  FileCheck,
  UserCheck,
  Stethoscope,
  Sparkles,
  BadgeCheck,
  Scale,
  MapPin,
  Clock,
  Phone,
  Mail
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Halal Certification for Medical Tourism in India | Islamic Healthcare Standards",
  description: "Discover Halal-certified healthcare facilities in India offering medical tourism services compliant with Islamic principles. Halal food, prayer facilities, and Sharia-compliant medical care for Muslim patients worldwide.",
  keywords: [
    "halal certification healthcare",
    "halal medical tourism India",
    "islamic healthcare standards",
    "halal hospital India",
    "muslim friendly medical care",
    "sharia compliant healthcare",
    "halal food hospital",
    "islamic medical ethics",
    "halal certified doctors",
    "muslim patient care",
    "halal medical procedures",
    "islamic dietary requirements hospital",
    "prayer facilities hospital India",
    "halal pharmaceutical products",
    "muslim medical tourism"
  ],
  openGraph: {
    title: "Halal Certification for Medical Tourism in India",
    description: "Experience healthcare that respects Islamic values. Halal-certified facilities with Islamic dietary compliance, prayer spaces, and Sharia-compliant medical care.",
    type: "website",
    url: "https://manalhealthcare.com/info/halal-certification",
  },
  twitter: {
    card: "summary_large_image",
    title: "Halal Certification for Medical Tourism in India",
    description: "Halal-certified healthcare facilities offering medical tourism services compliant with Islamic principles and values.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/halal-certification",
  },
};

// TypeScript Interfaces
interface CertificationStandard {
  icon: React.ElementType;
  title: string;
  description: string;
  requirements: string[];
  importance: string;
}

interface HalalService {
  icon: React.ElementType;
  name: string;
  description: string;
  features: string[];
  availability: string;
}

interface IslamicFacility {
  icon: React.ElementType;
  facility: string;
  description: string;
  specifications: string[];
}

interface CertifiedHospital {
  name: string;
  location: string;
  certifications: string[];
  halalServices: string[];
  specialties: string[];
  rating: number;
  muslimPatients: string;
}

interface PatientTestimonial {
  name: string;
  country: string;
  treatment: string;
  testimonial: string;
  rating: number;
}

interface ComplianceArea {
  icon: React.ElementType;
  area: string;
  compliance: string;
  details: string[];
}

// Reusable Components
const CertificationCard = ({ standard }: { standard: CertificationStandard }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-emerald-100 rounded-lg">
        <standard.icon className="w-8 h-8 text-emerald-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{standard.title}</h3>
        <p className="text-gray-600 mb-4">{standard.description}</p>
        
        <div className="space-y-2 mb-4">
          <h4 className="font-medium text-gray-900">Requirements:</h4>
          <ul className="space-y-2">
            {standard.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-4 bg-emerald-50 rounded-lg">
          <p className="text-sm text-emerald-800">
            <span className="font-semibold">Importance:</span> {standard.importance}
          </p>
        </div>
      </div>
    </div>
  </Card>
);

const ServiceCard = ({ service }: { service: HalalService }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
    <div className="flex flex-col h-full">
      <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
        <service.icon className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      
      <div className="space-y-2 mb-4 flex-1">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            <Star className="w-4 h-4 text-green-600 flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-600">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-green-600">{service.availability}</span>
      </div>
    </div>
  </Card>
);

const FacilityCard = ({ facility }: { facility: IslamicFacility }) => (
  <Card className="p-6 hover:shadow-lg transition-all hover:border-emerald-200">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-emerald-100 rounded-lg">
        <facility.icon className="w-6 h-6 text-emerald-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900 mb-2">{facility.facility}</h4>
        <p className="text-gray-600 mb-3">{facility.description}</p>
        <ul className="space-y-1">
          {facility.specifications.map((spec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);

const HospitalCard = ({ hospital }: { hospital: CertifiedHospital }) => (
  <Card className="p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.name}</h3>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{hospital.location}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < hospital.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <BadgeCheck className="w-5 h-5 text-emerald-600" />
          Certifications
        </h4>
        <div className="flex flex-wrap gap-2">
          {hospital.certifications.map((cert, index) => (
            <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
              {cert}
            </span>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Utensils className="w-5 h-5 text-green-600" />
          Halal Services
        </h4>
        <ul className="space-y-1">
          {hospital.halalServices.map((service, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              {service}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-blue-600" />
          Specialties
        </h4>
        <div className="flex flex-wrap gap-2">
          {hospital.specialties.map((specialty, index) => (
            <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
              {specialty}
            </span>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Annual Muslim Patients:</span> {hospital.muslimPatients}
        </p>
      </div>
    </div>
  </Card>
);

// Data Arrays
const certificationStandards: CertificationStandard[] = [
  {
    icon: Utensils,
    title: "Halal Food & Nutrition",
    description: "Complete Islamic dietary compliance ensuring all food served meets strict Halal standards",
    requirements: [
      "100% Halal-certified ingredients from verified suppliers",
      "Separate Halal kitchen with dedicated equipment and utensils",
      "No cross-contamination with non-Halal food items",
      "Halal-certified nutritional supplements and dietary products",
      "Muslim chefs trained in Islamic dietary laws"
    ],
    importance: "Ensures patients maintain their religious dietary obligations during treatment and recovery"
  },
  {
    icon: Scale,
    title: "Sharia-Compliant Medical Procedures",
    description: "Medical treatments and procedures conducted in accordance with Islamic law and ethics",
    requirements: [
      "Same-gender healthcare providers when possible",
      "Islamic bioethics consultation available",
      "Halal medicines and pharmaceutical products",
      "Avoidance of pork-derived medications",
      "Respect for modesty and privacy requirements"
    ],
    importance: "Allows Muslim patients to receive medical care without compromising their religious beliefs"
  },
  {
    icon: Building,
    title: "Islamic Prayer Facilities",
    description: "Dedicated spaces and facilities for performing daily Islamic prayers",
    requirements: [
      "Prayer rooms with Qibla direction indicated",
      "Separate prayer spaces for men and women",
      "Wudu (ablution) facilities near prayer areas",
      "Prayer mats, Quran, and prayer times available",
      "Quiet, clean environment conducive to prayer"
    ],
    importance: "Enables patients and families to maintain their five daily prayers during medical care"
  },
  {
    icon: BookOpen,
    title: "Islamic Counseling & Support",
    description: "Spiritual and emotional support grounded in Islamic principles",
    requirements: [
      "Access to Islamic chaplains and scholars",
      "Quranic recitation services for patients",
      "Islamic end-of-life care and support",
      "Halal-certified psychological counseling",
      "Religious guidance for medical decisions"
    ],
    importance: "Provides comprehensive care addressing spiritual needs alongside physical health"
  },
  {
    icon: FileCheck,
    title: "Halal Certification Documentation",
    description: "Proper certification and documentation from recognized Islamic authorities",
    requirements: [
      "Certification from recognized Halal authorities",
      "Regular audits and compliance checks",
      "Transparent documentation of all Halal processes",
      "Staff training certificates in Islamic requirements",
      "Ongoing certification renewal and updates"
    ],
    importance: "Ensures accountability and maintains trust with Muslim patients worldwide"
  },
  {
    icon: Users,
    title: "Muslim-Friendly Staff Training",
    description: "Comprehensive training for healthcare staff on Islamic customs and requirements",
    requirements: [
      "Cultural sensitivity training on Islamic practices",
      "Understanding of Muslim patient needs",
      "Training on Islamic medical ethics",
      "Language support for Arabic-speaking patients",
      "Knowledge of Islamic holidays and customs"
    ],
    importance: "Creates a respectful and understanding environment for Muslim patients"
  }
];

const halalServices: HalalService[] = [
  {
    icon: Utensils,
    name: "Halal Meal Service",
    description: "Comprehensive Halal meal programs with diverse menu options",
    features: [
      "Daily fresh Halal meals prepared by Muslim chefs",
      "Customized meal plans for specific medical conditions",
      "Cultural cuisine options (Arab, South Asian, etc.)",
      "Special dietary requirements accommodated",
      "Room service available 24/7"
    ],
    availability: "Available for all inpatients and outpatients"
  },
  {
    icon: Building,
    name: "Prayer Facilities",
    description: "Dedicated Islamic prayer spaces throughout the facility",
    features: [
      "Multiple prayer rooms on different floors",
      "Qibla direction clearly marked",
      "Prayer times displayed and announced",
      "Wudu facilities with proper plumbing",
      "Wheelchair accessible prayer areas"
    ],
    availability: "Open 24/7 for patients and families"
  },
  {
    icon: Shield,
    name: "Gender-Specific Care",
    description: "Medical care respecting Islamic modesty requirements",
    features: [
      "Female doctors for female patients when requested",
      "Male doctors for male patients when requested",
      "Gender-specific nursing staff available",
      "Private examination rooms",
      "Chaperoning services provided"
    ],
    availability: "Available upon request during admission"
  },
  {
    icon: Heart,
    name: "Halal Pharmaceuticals",
    description: "Medications and products compliant with Islamic law",
    features: [
      "Halal-certified medicines and supplements",
      "Alcohol-free formulations available",
      "Pork-free gelatin capsules",
      "Halal vaccination options",
      "Islamic scholar consultation for medications"
    ],
    availability: "Standard in all prescriptions"
  },
  {
    icon: BookOpen,
    name: "Islamic Counseling",
    description: "Spiritual guidance and support during medical treatment",
    features: [
      "On-call Islamic chaplains",
      "Quranic recitation services",
      "Religious consultation for medical decisions",
      "End-of-life Islamic guidance",
      "Family support and counseling"
    ],
    availability: "Available on request 24/7"
  },
  {
    icon: UserCheck,
    name: "Cultural Liaison Services",
    description: "Dedicated support for understanding and navigating healthcare",
    features: [
      "Arabic and other language interpreters",
      "Cultural mediation services",
      "Explanation of procedures in Islamic context",
      "Assistance with religious requirements",
      "Family accommodation coordination"
    ],
    availability: "Provided from admission to discharge"
  }
];

const islamicFacilities: IslamicFacility[] = [
  {
    icon: Building,
    facility: "Prayer Rooms (Musallah)",
    description: "Spacious, clean prayer spaces designed according to Islamic requirements",
    specifications: [
      "Minimum 500 sq ft per prayer room",
      "Qibla direction indicated with compass and wall marking",
      "Prayer mats and Qurans available",
      "Air-conditioned and well-ventilated",
      "Audio system for Adhan (call to prayer)"
    ]
  },
  {
    icon: Utensils,
    facility: "Halal Kitchen & Dining",
    description: "Fully certified Halal kitchen with separate preparation areas",
    specifications: [
      "Halal certification from recognized Islamic authority",
      "No cross-contamination with non-Halal items",
      "Muslim chefs with Halal training",
      "Separate storage for Halal ingredients",
      "Regular audits and inspections"
    ]
  },
  {
    icon: Users,
    facility: "Family Prayer & Rest Areas",
    description: "Comfortable spaces for families to pray and rest during visits",
    specifications: [
      "Separate areas for men and women",
      "Comfortable seating arrangements",
      "Ablution facilities nearby",
      "Privacy screens and partitions",
      "24/7 access for patient families"
    ]
  },
  {
    icon: Building2,
    facility: "Halal Pharmacy",
    description: "Pharmacy stocking Halal-certified medications and products",
    specifications: [
      "Halal medicines and supplements",
      "Alcohol-free formulations",
      "Pork-free gelatin alternatives",
      "Halal vitamins and nutritional products",
      "Islamic scholar approval documentation"
    ]
  }
];

const certifiedHospitals: CertifiedHospital[] = [
  {
    name: "Apollo Hospitals",
    location: "Multiple locations across India",
    certifications: ["Halal Certified", "JCI Accredited", "NABH Accredited"],
    halalServices: [
      "Dedicated Halal kitchen",
      "Prayer rooms on all floors",
      "Gender-specific care teams",
      "Halal pharmaceuticals"
    ],
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology"],
    rating: 5,
    muslimPatients: "10,000+"
  },
  {
    name: "Fortis Healthcare",
    location: "Delhi, Mumbai, Bangalore",
    certifications: ["Halal Food Certified", "JCI Accredited", "ISO 9001"],
    halalServices: [
      "100% Halal meal service",
      "Islamic counseling available",
      "Separate prayer facilities",
      "Arabic-speaking staff"
    ],
    specialties: ["Transplant", "Cancer Care", "Cardiac Surgery", "Neurosurgery"],
    rating: 5,
    muslimPatients: "8,500+"
  },
  {
    name: "Max Healthcare",
    location: "Delhi NCR",
    certifications: ["Halal Certified Facility", "NABH", "NABL"],
    halalServices: [
      "Halal dietary options",
      "Prayer room facilities",
      "Muslim-friendly care protocols",
      "Sharia-compliant procedures"
    ],
    specialties: ["Orthopedics", "Gastroenterology", "Urology", "Gynecology"],
    rating: 4,
    muslimPatients: "6,000+"
  },
  {
    name: "Manipal Hospitals",
    location: "Bangalore, Jaipur, Delhi",
    certifications: ["Halal Kitchen Certified", "JCI", "Green OT Certification"],
    halalServices: [
      "Certified Halal kitchen",
      "Multi-faith prayer room",
      "Gender-specific nursing",
      "Halal medicines available"
    ],
    specialties: ["Pediatrics", "IVF", "Oncology", "Bariatric Surgery"],
    rating: 4,
    muslimPatients: "7,200+"
  }
];

const complianceAreas: ComplianceArea[] = [
  {
    icon: Utensils,
    area: "Food & Nutrition",
    compliance: "100% Halal Compliant",
    details: [
      "All meat from Halal-certified suppliers",
      "Zabihah method followed for all poultry and meat",
      "No pork or pork-derived products",
      "Alcohol-free food preparation",
      "Separate Halal kitchen operations"
    ]
  },
  {
    icon: Shield,
    area: "Medical Procedures",
    compliance: "Sharia-Compliant Options Available",
    details: [
      "Same-gender healthcare providers when requested",
      "Halal medicines prioritized",
      "Islamic bioethics consultation",
      "Modesty and privacy respected",
      "Religious exemptions honored"
    ]
  },
  {
    icon: Heart,
    area: "Pharmaceuticals",
    compliance: "Halal Alternatives Provided",
    details: [
      "Pork-free gelatin capsules",
      "Alcohol-free formulations",
      "Halal vaccines available",
      "Plant-based alternatives",
      "Islamic scholar verification"
    ]
  },
  {
    icon: Users,
    area: "Patient Care",
    compliance: "Culturally Sensitive Service",
    details: [
      "Staff trained in Islamic customs",
      "Language interpretation available",
      "Family involvement encouraged",
      "Religious practices accommodated",
      "Cultural liaison support"
    ]
  }
];

const patientTestimonials: PatientTestimonial[] = [
  {
    name: "Ahmed Al-Mansouri",
    country: "United Arab Emirates",
    treatment: "Cardiac Surgery",
    testimonial: "The Halal certification gave me complete peace of mind during my treatment. The staff understood my religious requirements perfectly, and the prayer facilities were excellent. I could focus entirely on my recovery knowing my faith was being respected.",
    rating: 5
  },
  {
    name: "Fatima Hassan",
    country: "Saudi Arabia",
    treatment: "Orthopedic Surgery",
    testimonial: "As a Muslim woman, I appreciated the female doctors and nurses who treated me. The Halal food was delicious and reminded me of home. The prayer room was always clean and accessible. Truly a Muslim-friendly healthcare experience.",
    rating: 5
  },
  {
    name: "Ibrahim Khan",
    country: "Malaysia",
    treatment: "Cancer Treatment",
    testimonial: "During my cancer treatment, the Islamic counseling services provided immense spiritual support. All medications were Halal-certified, and the hospital made sure I could pray five times a day despite my condition. Exceptional care!",
    rating: 5
  },
  {
    name: "Aisha Abdullah",
    country: "Nigeria",
    treatment: "IVF Treatment",
    testimonial: "The hospital's understanding of Islamic medical ethics was impressive. They consulted with Islamic scholars about our treatment options and ensured everything was Sharia-compliant. We were treated with dignity and respect throughout.",
    rating: 5
  }
];

export default function HalalCertificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Manal Healthcare - Halal Certified Medical Tourism",
            "description": "Halal-certified healthcare facilities in India offering medical tourism services compliant with Islamic principles",
            "url": "https://manalhealthcare.com/info/halal-certification",
            "medicalSpecialty": [
              "Cardiology",
              "Oncology",
              "Orthopedics",
              "Neurology"
            ],
            "availableService": [
              {
                "@type": "MedicalProcedure",
                "name": "Halal-Compliant Medical Care"
              },
              {
                "@type": "Service",
                "name": "Islamic Prayer Facilities"
              },
              {
                "@type": "Service",
                "name": "Halal Food Service"
              }
            ]
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-emerald-100 rounded-full mb-6">
              <Award className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Halal-Certified Healthcare in India
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience world-class medical care that respects and honors Islamic principles. 
              Our certified facilities ensure complete compliance with Halal standards for Muslim patients worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                <Mail className="w-5 h-5 mr-2" />
                Get Information
              </Button>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Building2, value: "50+", label: "Halal-Certified Hospitals" },
              { icon: Globe, value: "75+", label: "Countries Served" },
              { icon: Users, value: "100,000+", label: "Muslim Patients Annually" },
              { icon: Star, value: "98%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Standards */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Halal Certification Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive certification ensures every aspect of your healthcare experience meets strict Islamic requirements
            </p>
          </div>

          <div className="space-y-6">
            {certificationStandards.map((standard, index) => (
              <CertificationCard key={index} standard={standard} />
            ))}
          </div>
        </div>
      </section>

      {/* Halal Services */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Halal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every service designed with Islamic principles and Muslim patient comfort in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {halalServices.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Facilities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Islamic Facilities & Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built facilities ensuring comfort and religious observance during your medical journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {islamicFacilities.map((facility, index) => (
              <FacilityCard key={index} facility={facility} />
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sharia Compliance Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive compliance ensuring your medical care aligns with Islamic law
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complianceAreas.map((area, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <area.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{area.area}</h3>
                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-3">
                      {area.compliance}
                    </div>
                    <ul className="space-y-2">
                      {area.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certified Hospitals */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Halal-Certified Hospitals in India
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading healthcare institutions with verified Halal certification and Muslim-friendly services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifiedHospitals.map((hospital, index) => (
              <HospitalCard key={index} hospital={hospital} />
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Muslim Patient Testimonials
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from Muslim patients who received Halal-compliant healthcare in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patientTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.testimonial}&rdquo;</p>
                <div className="flex items-start justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">{testimonial.treatment}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Halal-Certified Care */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Halal-Certified Healthcare?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Experience the peace of mind that comes with healthcare that respects your faith
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Religious Compliance",
                description: "Every aspect of your care from meals to medications meets Islamic requirements"
              },
              {
                icon: Shield,
                title: "Peace of Mind",
                description: "Focus on recovery knowing your faith and values are being respected and honored"
              },
              {
                icon: Heart,
                title: "Holistic Care",
                description: "Physical, emotional, and spiritual wellness integrated into your treatment plan"
              },
              {
                icon: Users,
                title: "Cultural Understanding",
                description: "Staff trained to understand and accommodate Islamic customs and practices"
              },
              {
                icon: TrendingUp,
                title: "Quality Healthcare",
                description: "World-class medical treatment without compromising religious principles"
              },
              {
                icon: Globe,
                title: "Global Standards",
                description: "Certification from internationally recognized Islamic authorities"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-block p-4 bg-white/10 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="opacity-90">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about Halal certification in healthcare
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What does Halal certification mean for a hospital?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Halal certification for a hospital means that the facility has been audited and verified by recognized Islamic authorities to ensure compliance with Islamic law. This includes Halal food preparation, Sharia-compliant medical procedures, prayer facilities, and culturally sensitive care practices. The certification is regularly renewed through audits.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Are all medications provided Halal-certified?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Certified hospitals prioritize Halal medications whenever possible. This includes alcohol-free formulations, pork-free gelatin capsules, and plant-based alternatives. When Halal alternatives are not medically available, Islamic scholars are consulted to provide guidance based on the principle of necessity (dharura) in Islamic law.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I request same-gender healthcare providers?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, absolutely. Halal-certified hospitals understand the importance of modesty in Islam and make every effort to provide same-gender healthcare providers when requested. This is particularly accommodated for examinations and procedures. However, in emergency situations, the priority is always saving life, which takes precedence in Islamic law.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Are prayer facilities available 24/7?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, prayer facilities are available 24/7 for patients and their families. Prayer rooms are equipped with prayer mats, Qurans, and clearly marked Qibla direction. Wudu (ablution) facilities are located nearby. Prayer times are displayed and some facilities also announce Adhan (call to prayer). The spaces are maintained clean and accessible at all times.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How can I verify a hospital's Halal certification?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can verify Halal certification by requesting to see the official certification documents from recognized Islamic authorities. Certifications should be current and include details about what aspects are certified. You can also contact the certifying Islamic authority directly. We provide complete transparency with all our certification documentation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Is the Halal food prepared fresh daily?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, Halal meals are prepared fresh daily in dedicated Halal kitchens by Muslim chefs trained in Islamic dietary laws. The kitchens use 100% Halal-certified ingredients from verified suppliers. There is zero cross-contamination with non-Halal items as completely separate equipment, utensils, and storage areas are used.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Are Islamic counseling services available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, Islamic counseling services are available through qualified Islamic chaplains and scholars. They can provide spiritual support, Quranic recitation, guidance on medical decisions from an Islamic perspective, and end-of-life care according to Islamic principles. These services are available on request and can be accessed 24/7 in most certified facilities.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What about burial arrangements if needed?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Halal-certified hospitals work with local Islamic communities and organizations to facilitate proper Islamic burial arrangements if needed. This includes Ghusl (ritual washing), Kafan (shrouding), and Janazah (funeral prayer) according to Islamic requirements. The hospital can also assist with repatriation arrangements if the family wishes to have burial in their home country.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can family members stay with Muslim patients?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, certified hospitals understand the importance of family in Muslim culture and encourage family involvement in patient care. Most facilities provide comfortable accommodation for family members to stay with patients. Family members also have access to prayer facilities, Halal food services, and cultural liaison support during their stay.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How much more expensive is Halal-certified healthcare?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Halal-certified healthcare in India typically does not cost significantly more than regular healthcare services. The medical procedures themselves cost the same, with only minimal additional charges (usually 5-10%) for specialized Halal food services and cultural liaison support. Overall, it remains 60-80% cheaper than healthcare in Western countries while maintaining full Halal compliance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-emerald-100 rounded-full mb-6">
            <Award className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience Halal-Certified Healthcare?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact us today to learn more about our Halal-certified facilities and start planning your medical journey with complete peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Article */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Understanding Halal Certification in Medical Tourism</h2>
          
          <p>
            Halal certification in healthcare represents a comprehensive approach to medical care that respects and honors Islamic principles and values. For Muslim patients seeking medical treatment abroad, understanding what Halal certification means and how it impacts their healthcare experience is crucial for making informed decisions about their medical journey.
          </p>

          <h3>The Importance of Halal Healthcare for Muslim Patients</h3>
          
          <p>
            For practicing Muslims, maintaining religious observance even during medical treatment is not just a preference—it&apos;s an integral part of their faith and identity. Halal certification in healthcare facilities ensures that Muslim patients can receive world-class medical treatment without compromising their religious beliefs or practices. This certification covers multiple aspects of patient care, from the food served to the medications prescribed, from the availability of prayer facilities to the cultural sensitivity of medical staff.
          </p>

          <p>
            India has emerged as a leading destination for Halal-certified medical tourism, with numerous hospitals and healthcare facilities obtaining official Halal certification from recognized Islamic authorities. This certification process involves rigorous audits and ongoing compliance monitoring to ensure that all aspects of healthcare delivery meet Islamic requirements.
          </p>

          <h3>Comprehensive Halal Standards in Indian Hospitals</h3>
          
          <p>
            Halal-certified hospitals in India follow comprehensive standards that address every aspect of patient care. The food service department operates a completely separate Halal kitchen with dedicated equipment, utensils, and storage areas to prevent any cross-contamination with non-Halal items. All meat products are sourced from Halal-certified suppliers who follow the Zabihah method of slaughter, and Muslim chefs trained in Islamic dietary laws prepare all meals.
          </p>

          <p>
            Beyond food, these hospitals ensure that medications and pharmaceutical products are Halal-compliant whenever possible. This includes using pork-free gelatin capsules, alcohol-free formulations, and plant-based alternatives. When Halal alternatives are not medically available, hospitals consult with Islamic scholars to provide guidance based on Islamic principles of necessity (dharura).
          </p>

          <h3>Islamic Facilities and Cultural Accommodation</h3>
          
          <p>
            Prayer facilities are a cornerstone of Halal-certified healthcare. These hospitals provide dedicated prayer rooms (Musallah) on multiple floors, complete with prayer mats, Qurans, and clearly marked Qibla direction. Wudu (ablution) facilities are conveniently located near prayer areas, and prayer times are displayed throughout the facility. Some hospitals even announce the Adhan (call to prayer) to remind patients and families of prayer times.
          </p>

          <p>
            Gender-specific care is another critical component of Halal healthcare. Understanding Islamic modesty requirements, these facilities make every effort to provide same-gender healthcare providers when requested. Female doctors and nurses are available for female patients, and male doctors and nurses for male patients. Private examination rooms with proper chaperoning services ensure that modesty and privacy are maintained throughout the treatment process.
          </p>

          <h3>The Certification Process and Verification</h3>
          
          <p>
            Obtaining Halal certification for a healthcare facility is a thorough process that involves multiple stages of assessment and verification. Recognized Islamic certification bodies conduct comprehensive audits of all hospital operations, from food preparation and storage to medical procedures and pharmaceutical practices. The certification body examines the supply chain, staff training programs, facility design, and patient care protocols.
          </p>

          <p>
            Once certified, hospitals undergo regular audits to ensure ongoing compliance with Halal standards. These periodic reviews verify that the facility continues to meet all requirements and address any areas that need improvement. Patients can request to see certification documents and verify their authenticity with the certifying authority, ensuring complete transparency and accountability.
          </p>

          <h3>Medical Procedures and Islamic Bioethics</h3>
          
          <p>
            Halal-certified hospitals in India have expertise in navigating the intersection of modern medical procedures and Islamic bioethics. Islamic scholars and medical ethicists are available for consultation when patients face complex medical decisions. These consultations ensure that treatment options are evaluated not just from a medical perspective but also from an Islamic ethical standpoint.
          </p>

          <p>
            Procedures involving organ transplantation, fertility treatments, cosmetic surgery, and end-of-life care are all handled with careful consideration of Islamic principles. The hospitals work closely with patients and their families to ensure that medical decisions align with both health needs and religious values.
          </p>

          <h3>Cultural Sensitivity and Language Support</h3>
          
          <p>
            Beyond physical facilities and procedures, Halal-certified hospitals invest heavily in cultural sensitivity training for their staff. Healthcare providers receive education on Islamic customs, practices, and values to ensure respectful and understanding interactions with Muslim patients. This training covers everything from greeting protocols to understanding dietary restrictions, from respecting prayer times to accommodating family involvement in care decisions.
          </p>

          <p>
            Language support is another critical service, with many hospitals employing Arabic-speaking staff and interpreters. Cultural liaison officers help bridge any communication gaps and ensure that patients and families fully understand medical procedures, treatment options, and recovery protocols in the context of their cultural and religious framework.
          </p>

          <h3>Family Accommodation and Support Services</h3>
          
          <p>
            Recognizing the importance of family in Muslim culture, Halal-certified hospitals provide comprehensive family accommodation and support services. Family members can stay with patients, access prayer facilities, receive Halal meals, and participate actively in care decisions. Separate family areas provide comfortable spaces for rest and prayer during long hospital visits.
          </p>

          <p>
            Islamic counseling services offer spiritual support for both patients and families during challenging medical journeys. Qualified Islamic chaplains provide Quranic recitation, spiritual guidance, and emotional support throughout the treatment and recovery process.
          </p>

          <h3>Cost Considerations and Value Proposition</h3>
          
          <p>
            One of the most compelling aspects of Halal-certified healthcare in India is its cost-effectiveness. Despite the additional services and specialized facilities, Halal-certified medical care in India typically costs only 5-10% more than standard healthcare services for the Halal-specific amenities. The medical procedures themselves—which represent the major cost component—are priced the same whether or not the patient chooses Halal-certified care.
          </p>

          <p>
            When compared to healthcare costs in Western countries or the Middle East, Indian hospitals offer savings of 60-80% even with full Halal certification. This makes India an exceptionally attractive destination for Muslim patients seeking both affordability and religious compliance in their healthcare.
          </p>

          <h3>Success Stories from Muslim Patients</h3>
          
          <p>
            Thousands of Muslim patients from around the world have successfully received treatment at Halal-certified hospitals in India. Patients from the Middle East, Southeast Asia, Africa, and beyond have shared testimonials praising not just the quality of medical care but also the respect shown for their religious practices and cultural values.
          </p>

          <p>
            Many patients express that the availability of Halal-certified healthcare allowed them to focus entirely on their recovery without the added stress of compromising their religious obligations. The peace of mind that comes from knowing that every aspect of their care—from meals to medications to medical procedures—is compliant with Islamic law has proven to be an invaluable component of the healing process.
          </p>

          <h3>The Future of Halal Healthcare Tourism</h3>
          
          <p>
            The demand for Halal-certified healthcare continues to grow as the global Muslim population increases and becomes more mobile. India is well-positioned to meet this demand, with an expanding network of certified hospitals, improved certification standards, and increasing awareness among healthcare providers about the importance of religiously and culturally sensitive care.
          </p>

          <p>
            New technologies are being integrated to enhance Halal healthcare services, from apps that help patients find Qibla direction and prayer times to digital systems that flag medications containing non-Halal ingredients. Healthcare facilities are also exploring partnerships with Islamic organizations worldwide to strengthen certification processes and increase patient confidence.
          </p>

          <h3>Making Your Decision</h3>
          
          <p>
            Choosing Halal-certified healthcare in India means choosing medical excellence without religious compromise. It means access to world-class doctors, cutting-edge technology, and proven treatment protocols—all within a framework that respects and honors Islamic principles. For Muslim patients facing medical challenges, this combination of clinical excellence and religious accommodation provides the foundation for a successful healing journey.
          </p>

          <p>
            As you consider your medical tourism options, take time to research the specific Halal certifications held by prospective hospitals, speak with Islamic advisors about your particular situation, and connect with past patients to learn about their experiences. With proper planning and the right certified facility, you can receive the medical care you need while maintaining the religious practices that are central to your life and faith.
          </p>
        </div>
      </section>
    </div>
  );
}
