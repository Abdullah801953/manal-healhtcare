import type { Metadata } from "next";
import { 
  FileSearch, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle2,
  Star,
  TrendingUp,
  Award,
  Globe,
  Heart,
  Brain,
  FileText,
  UserCheck,
  Stethoscope,
  ClipboardCheck,
  MessageSquare,
  Video,
  Mail,
  Phone,
  DollarSign,
  AlertCircle,
  Target,
  Zap,
  BookOpen,
  Upload
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Medical Second Opinion Services India | Expert Medical Review",
  description: "Get professional medical second opinions from India's top specialists. Expert review of diagnosis, treatment plans, and surgical recommendations. Fast, affordable, and confidential second opinion consultations.",
  keywords: [
    "medical second opinion",
    "second opinion India",
    "expert medical review",
    "diagnosis verification",
    "treatment plan review",
    "surgical second opinion",
    "cancer second opinion",
    "cardiology second opinion",
    "orthopedic second opinion",
    "online medical consultation",
    "medical expert opinion",
    "virtual medical consultation",
    "international second opinion",
    "specialist review India",
    "medical case review"
  ],
  openGraph: {
    title: "Medical Second Opinion Services India | Expert Medical Review",
    description: "Get expert medical second opinions from India's leading specialists. Comprehensive review of diagnosis and treatment plans within 48-72 hours.",
    type: "website",
    url: "https://manalhealthcare.com/info/second-opinion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Second Opinion Services India",
    description: "Expert medical second opinions from top Indian specialists. Fast, affordable, and confidential consultations.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/second-opinion",
  },
};

// TypeScript Interfaces
interface BenefitItem {
  icon: React.ElementType;
  title: string;
  description: string;
  impact: string;
}

interface ProcessStep {
  step: number;
  icon: React.ElementType;
  title: string;
  description: string;
  timeframe: string;
  details: string[];
}

interface Specialty {
  icon: React.ElementType;
  name: string;
  description: string;
  commonCases: string[];
  expertiseLevel: string;
  averageTime: string;
}

interface WhySecondOpinion {
  icon: React.ElementType;
  reason: string;
  explanation: string;
  statistics: string;
}

interface ConsultationType {
  type: string;
  icon: React.ElementType;
  description: string;
  features: string[];
  turnaroundTime: string;
  pricing: string;
}

interface SuccessStory {
  patientName: string;
  country: string;
  initialDiagnosis: string;
  secondOpinion: string;
  outcome: string;
  testimonial: string;
  savings?: string;
}

interface DocumentRequired {
  category: string;
  icon: React.ElementType;
  documents: string[];
  optional: string[];
}

// Reusable Components
const BenefitCard = ({ benefit }: { benefit: BenefitItem }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow h-full">
    <div className="flex flex-col h-full">
      <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
        <benefit.icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-600 mb-4 flex-1">{benefit.description}</p>
      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Impact:</span> {benefit.impact}
        </p>
      </div>
    </div>
  </Card>
);

const ProcessStepCard = ({ process }: { process: ProcessStep }) => (
  <Card className="p-6 hover:shadow-lg transition-all">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
          {process.step}
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <process.icon className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-900">{process.title}</h3>
        </div>
        <p className="text-gray-600 mb-4">{process.description}</p>
        <ul className="space-y-2 mb-4">
          {process.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          <Clock className="w-3 h-3 inline mr-1" />
          {process.timeframe}
        </div>
      </div>
    </div>
  </Card>
);

const SpecialtyCard = ({ specialty }: { specialty: Specialty }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-indigo-100 rounded-lg">
        <specialty.icon className="w-8 h-8 text-indigo-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{specialty.name}</h3>
        <p className="text-gray-600 mb-4">{specialty.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Common Cases:</h4>
            <div className="flex flex-wrap gap-2">
              {specialty.commonCases.map((case_, index) => (
                <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-sm">
                  {case_}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-gray-600">{specialty.expertiseLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="text-sm text-gray-600">{specialty.averageTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

const ConsultationTypeCard = ({ consultation }: { consultation: ConsultationType }) => (
  <Card className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-blue-200">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <consultation.icon className="w-8 h-8 text-blue-600" />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{consultation.type}</h3>
        <p className="text-gray-600">{consultation.description}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
        <ul className="space-y-2">
          {consultation.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-600">
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500 mb-1">Turnaround Time</p>
          <p className="font-semibold text-gray-900">{consultation.turnaroundTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Starting From</p>
          <p className="font-semibold text-blue-600">{consultation.pricing}</p>
        </div>
      </div>
    </div>
  </Card>
);

// Data Arrays
const benefits: BenefitItem[] = [
  {
    icon: Shield,
    title: "Confirmation of Diagnosis",
    description: "Verify the accuracy of your initial diagnosis through expert review by leading specialists",
    impact: "Reduces misdiagnosis risk by 30% and provides peace of mind about your condition"
  },
  {
    icon: Target,
    title: "Treatment Options Review",
    description: "Explore alternative treatment approaches and understand all available options for your condition",
    impact: "Helps you make informed decisions with complete knowledge of treatment alternatives"
  },
  {
    icon: Zap,
    title: "Avoid Unnecessary Surgery",
    description: "Determine if surgery is truly necessary or if less invasive treatments could be effective",
    impact: "Studies show 30-40% of surgeries may be unnecessary or avoidable with alternatives"
  },
  {
    icon: DollarSign,
    title: "Cost-Effective Care",
    description: "Identify more affordable treatment options without compromising on quality of care",
    impact: "Can save thousands of dollars by finding equally effective but less expensive treatments"
  },
  {
    icon: Brain,
    title: "Access to Expertise",
    description: "Connect with world-renowned specialists who may have more experience with your specific condition",
    impact: "Gain insights from doctors who have treated hundreds of similar cases"
  },
  {
    icon: Heart,
    title: "Peace of Mind",
    description: "Gain confidence in your treatment plan and reduce anxiety about medical decisions",
    impact: "Psychological benefit of knowing you've explored all options before proceeding"
  }
];

const processSteps: ProcessStep[] = [
  {
    step: 1,
    icon: Upload,
    title: "Submit Your Medical Records",
    description: "Upload your medical documents, test results, and imaging studies through our secure portal",
    timeframe: "15-30 minutes",
    details: [
      "Complete our simple online form with your medical history",
      "Upload diagnostic reports, lab results, and imaging (X-rays, CT, MRI)",
      "Provide current treatment plan and medications",
      "All documents are securely encrypted and HIPAA compliant"
    ]
  },
  {
    step: 2,
    icon: UserCheck,
    title: "Expert Assignment",
    description: "We match your case with the most qualified specialist based on your condition",
    timeframe: "2-4 hours",
    details: [
      "Our medical coordinator reviews your case details",
      "Specialist is selected based on expertise and experience",
      "You receive confirmation with doctor's credentials",
      "Option to request a specific specialist if preferred"
    ]
  },
  {
    step: 3,
    icon: FileSearch,
    title: "Comprehensive Review",
    description: "The specialist conducts a thorough analysis of your medical records and condition",
    timeframe: "24-48 hours",
    details: [
      "In-depth review of all medical documents and imaging",
      "Analysis of diagnosis accuracy and treatment plan",
      "Research of latest treatment protocols for your condition",
      "Consultation with multidisciplinary team if needed"
    ]
  },
  {
    step: 4,
    icon: FileText,
    title: "Detailed Report",
    description: "Receive a comprehensive written report with the specialist's findings and recommendations",
    timeframe: "48-72 hours",
    details: [
      "Detailed second opinion document (5-10 pages)",
      "Confirmation or alternative diagnosis",
      "Treatment recommendations with rationale",
      "Additional tests or evaluations suggested if needed"
    ]
  },
  {
    step: 5,
    icon: Video,
    title: "Video Consultation (Optional)",
    description: "Schedule a virtual meeting with the specialist to discuss the findings in detail",
    timeframe: "Flexible scheduling",
    details: [
      "30-45 minute video call with the specialist",
      "Ask questions and clarify recommendations",
      "Discuss concerns and treatment preferences",
      "Receive additional guidance on next steps"
    ]
  },
  {
    step: 6,
    icon: MessageSquare,
    title: "Follow-up Support",
    description: "Ongoing support to help you implement the recommendations and answer questions",
    timeframe: "30 days included",
    details: [
      "Email and phone support from medical coordinators",
      "Help with treatment planning and hospital selection",
      "Assistance with travel arrangements if needed",
      "Connection to specialists for treatment if desired"
    ]
  }
];

const specialties: Specialty[] = [
  {
    icon: Heart,
    name: "Cardiology",
    description: "Expert review of heart conditions, cardiac procedures, and treatment plans",
    commonCases: ["Coronary Disease", "Heart Valve Issues", "Arrhythmias", "Heart Failure"],
    expertiseLevel: "25+ Top Cardiologists",
    averageTime: "48 hours"
  },
  {
    icon: Brain,
    name: "Oncology",
    description: "Comprehensive cancer diagnosis verification and treatment protocol review",
    commonCases: ["Breast Cancer", "Lung Cancer", "Colorectal Cancer", "Lymphoma"],
    expertiseLevel: "30+ Oncology Specialists",
    averageTime: "72 hours"
  },
  {
    icon: Stethoscope,
    name: "Orthopedics",
    description: "Second opinions on joint replacements, spine surgery, and orthopedic treatments",
    commonCases: ["Knee Replacement", "Hip Replacement", "Spine Surgery", "Sports Injuries"],
    expertiseLevel: "20+ Orthopedic Surgeons",
    averageTime: "48 hours"
  },
  {
    icon: Brain,
    name: "Neurology & Neurosurgery",
    description: "Expert review of neurological conditions and surgical recommendations",
    commonCases: ["Brain Tumors", "Spine Disorders", "Stroke", "Epilepsy"],
    expertiseLevel: "15+ Neurosurgeons",
    averageTime: "72 hours"
  },
  {
    icon: Users,
    name: "Gastroenterology",
    description: "Digestive system conditions and treatment alternatives evaluation",
    commonCases: ["IBD", "Liver Disease", "GI Cancers", "Pancreatic Disorders"],
    expertiseLevel: "18+ GI Specialists",
    averageTime: "48 hours"
  },
  {
    icon: Heart,
    name: "Transplant Surgery",
    description: "Second opinions on organ transplant necessity and donor matching",
    commonCases: ["Kidney Transplant", "Liver Transplant", "Heart Transplant"],
    expertiseLevel: "12+ Transplant Surgeons",
    averageTime: "72 hours"
  }
];

const whySecondOpinion: WhySecondOpinion[] = [
  {
    icon: AlertCircle,
    reason: "Misdiagnosis Concerns",
    explanation: "Medical errors in diagnosis are more common than most realize. A second opinion can catch potential mistakes.",
    statistics: "12 million Americans are misdiagnosed annually (BMJ Quality & Safety study)"
  },
  {
    icon: Target,
    reason: "Complex or Rare Conditions",
    explanation: "Rare diseases require specialized expertise. Getting opinions from experts who have seen similar cases is crucial.",
    statistics: "80% of rare disease patients receive at least one incorrect diagnosis"
  },
  {
    icon: TrendingUp,
    reason: "Major Surgery Recommended",
    explanation: "Before undergoing major surgery, it's wise to confirm it's necessary and explore all alternatives.",
    statistics: "30-40% of certain surgeries may be unnecessary or avoidable"
  },
  {
    icon: DollarSign,
    reason: "High Treatment Costs",
    explanation: "Expensive treatment plans warrant verification. Sometimes equally effective but more affordable options exist.",
    statistics: "Second opinions can identify cost savings of 30-60% on average"
  }
];

const consultationTypes: ConsultationType[] = [
  {
    type: "Written Second Opinion",
    icon: FileText,
    description: "Comprehensive written report from specialist reviewing your case",
    features: [
      "Detailed analysis of medical records and imaging",
      "Confirmation or alternative diagnosis",
      "Treatment recommendations with evidence-based rationale",
      "List of additional tests if needed",
      "References to medical literature supporting recommendations"
    ],
    turnaroundTime: "48-72 hours",
    pricing: "$299"
  },
  {
    type: "Video Consultation",
    icon: Video,
    description: "Live virtual meeting with specialist to discuss your case in detail",
    features: [
      "30-45 minute one-on-one video call",
      "Real-time discussion of your condition",
      "Ability to ask questions and get immediate answers",
      "Personalized treatment guidance",
      "Includes written summary after consultation"
    ],
    turnaroundTime: "3-5 days to schedule",
    pricing: "$499"
  },
  {
    type: "Comprehensive Package",
    icon: Award,
    description: "Complete second opinion with both written report and video consultation",
    features: [
      "Full written second opinion report",
      "45-60 minute video consultation",
      "Multidisciplinary team review if needed",
      "Priority scheduling and expedited review",
      "30 days of follow-up support included",
      "Treatment coordination assistance if desired"
    ],
    turnaroundTime: "72 hours total",
    pricing: "$699"
  }
];

const documentsRequired: DocumentRequired[] = [
  {
    category: "Medical History",
    icon: ClipboardCheck,
    documents: [
      "Current diagnosis and medical summary",
      "Complete medical history",
      "List of current medications",
      "Previous surgical history"
    ],
    optional: [
      "Family medical history",
      "Vaccination records"
    ]
  },
  {
    category: "Diagnostic Reports",
    icon: FileSearch,
    documents: [
      "Recent lab test results",
      "Pathology reports (if applicable)",
      "Biopsy results",
      "Blood work and other tests"
    ],
    optional: [
      "Genetic testing results",
      "Specialized diagnostic tests"
    ]
  },
  {
    category: "Imaging Studies",
    icon: Brain,
    documents: [
      "X-rays (digital format)",
      "CT scan images and reports",
      "MRI scans and reports",
      "Ultrasound images"
    ],
    optional: [
      "PET scans",
      "Angiography results"
    ]
  },
  {
    category: "Treatment Information",
    icon: Heart,
    documents: [
      "Current treatment plan",
      "Proposed surgery or procedure details",
      "Treatment history and outcomes",
      "Doctor's recommendations"
    ],
    optional: [
      "Alternative treatments considered",
      "Rehabilitation plans"
    ]
  }
];

const successStories: SuccessStory[] = [
  {
    patientName: "James Miller",
    country: "United States",
    initialDiagnosis: "Recommended immediate spinal fusion surgery for chronic back pain",
    secondOpinion: "Conservative treatment with physical therapy and pain management recommended",
    outcome: "Avoided surgery completely. Pain reduced by 80% with non-surgical treatment over 6 months.",
    testimonial: "The second opinion saved me from unnecessary surgery. After following the new treatment plan, my back pain is almost gone. I'm grateful I sought another perspective.",
    savings: "$85,000"
  },
  {
    patientName: "Sarah Johnson",
    country: "United Kingdom",
    initialDiagnosis: "Stage 3 cancer requiring aggressive chemotherapy",
    secondOpinion: "Re-evaluation suggested Stage 2 cancer with less aggressive treatment protocol possible",
    outcome: "Successfully treated with modified protocol, fewer side effects, excellent prognosis.",
    testimonial: "Getting a second opinion gave me a less aggressive but equally effective treatment plan. The difference in quality of life during treatment was significant.",
    savings: "Not applicable"
  },
  {
    patientName: "Mohammed Al-Rashid",
    country: "Saudi Arabia",
    initialDiagnosis: "Complete knee replacement surgery recommended for arthritis",
    secondOpinion: "Partial knee replacement with shorter recovery would be sufficient",
    outcome: "Underwent partial replacement, recovered in 3 weeks vs. 3 months, excellent mobility restored.",
    testimonial: "The second opinion identified a better surgical approach. My recovery was much faster than expected, and I'm back to all my normal activities.",
    savings: "$42,000"
  },
  {
    patientName: "Linda Chen",
    country: "Australia",
    initialDiagnosis: "Hysterectomy recommended for uterine fibroids",
    secondOpinion: "Minimally invasive fibroid embolization suggested as alternative",
    outcome: "Underwent non-surgical procedure, preserved fertility, symptom-free after treatment.",
    testimonial: "I almost underwent major surgery that would have ended my chance of having children. The second opinion showed me there was a better way.",
    savings: "$38,000"
  }
];

export default function SecondOpinionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "Manal Healthcare - Medical Second Opinion Services",
            "description": "Professional medical second opinion services from India's top specialists",
            "url": "https://manalhealthcare.com/info/second-opinion",
            "medicalSpecialty": [
              "Cardiology",
              "Oncology",
              "Orthopedics",
              "Neurology",
              "Gastroenterology"
            ],
            "availableService": [
              {
                "@type": "MedicalProcedure",
                "name": "Medical Second Opinion"
              },
              {
                "@type": "Service",
                "name": "Virtual Medical Consultation"
              }
            ],
            "priceRange": "$299-$699"
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
              <FileSearch className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Expert Medical Second Opinion Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get peace of mind with expert review from India's leading specialists. 
              Comprehensive second opinions delivered within 48-72 hours—accurate, affordable, and confidential.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-5 h-5 mr-2" />
                Request Second Opinion
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Video className="w-5 h-5 mr-2" />
                Schedule Video Consultation
              </Button>
            </div>
          </div>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: Users, value: "500+", label: "Expert Specialists" },
              { icon: Globe, value: "120+", label: "Countries Served" },
              { icon: Star, value: "15,000+", label: "Second Opinions Provided" },
              { icon: Clock, value: "48-72h", label: "Average Turnaround" }
            ].map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Get a Medical Second Opinion?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A second opinion can be life-changing, providing clarity and confidence in your medical decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Get Second Opinion */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              When Should You Seek a Second Opinion?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These situations warrant expert review of your diagnosis and treatment plan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whySecondOpinion.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <item.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.reason}</h3>
                    <p className="text-gray-600 mb-4">{item.explanation}</p>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Research:</span> {item.statistics}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our Second Opinion Process Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, streamlined process to get expert medical review within days
            </p>
          </div>

          <div className="space-y-6">
            {processSteps.map((process, index) => (
              <ProcessStepCard key={index} process={process} />
            ))}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Medical Specialties Covered
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert second opinions across all major medical specialties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialties.map((specialty, index) => (
              <SpecialtyCard key={index} specialty={specialty} />
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Consultation Type
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible options to meet your needs and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {consultationTypes.map((consultation, index) => (
              <ConsultationTypeCard key={index} consultation={consultation} />
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 px-4 bg-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Documents You'll Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prepare these documents for a comprehensive second opinion review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentsRequired.map((doc, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <doc.icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{doc.category}</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                    <ul className="space-y-2">
                      {doc.documents.map((document, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span>{document}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {doc.optional.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Optional but Helpful:</h4>
                      <ul className="space-y-2">
                        {doc.optional.map((document, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-500">
                            <div className="w-5 h-5 border-2 border-gray-300 rounded flex-shrink-0 mt-0.5" />
                            <span>{document}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Stories, Real Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How second opinions changed the course of treatment for real patients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{story.patientName}</h3>
                      {story.savings && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Saved {story.savings}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{story.country}</p>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Initial Diagnosis:</p>
                      <p className="text-sm text-gray-600">{story.initialDiagnosis}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Second Opinion:</p>
                      <p className="text-sm text-blue-600">{story.secondOpinion}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Outcome:</p>
                      <p className="text-sm text-green-600">{story.outcome}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-gray-600 italic">&ldquo;{story.testimonial}&rdquo;</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common questions about our second opinion services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                How long does it take to get a second opinion?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Most second opinions are completed within 48-72 hours of receiving all necessary medical documents. Complex cases requiring multidisciplinary review may take up to 5-7 days. We offer expedited services for urgent cases that can provide opinions within 24 hours.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What qualifications do your specialists have?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                All our specialists are board-certified physicians with extensive experience in their fields. They work at top-tier hospitals in India accredited by JCI (Joint Commission International) and have treated thousands of international patients. Many have trained at prestigious institutions worldwide and published research in leading medical journals.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Is my medical information kept confidential?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely. We follow strict HIPAA compliance standards and use encrypted systems for all document transmission. Your medical records are only shared with the reviewing specialist and our medical coordinators. We never share your information with third parties without your explicit consent.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I choose which specialist reviews my case?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes! While we automatically match you with the most qualified specialist for your condition, you can request a specific doctor if you prefer. We provide profiles of available specialists including their credentials, areas of expertise, and patient reviews to help you make an informed choice.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What if the second opinion differs from my current diagnosis?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                If there's a significant difference, we recommend discussing both opinions with your current physician. We provide detailed explanations for any alternative diagnoses or treatment recommendations, including supporting medical literature. You can also schedule a video consultation with our specialist to discuss the differences and decide on the best path forward.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Do you accept insurance for second opinion services?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Many insurance companies cover second opinions, especially for major surgeries or serious conditions. We provide detailed receipts and medical documentation that you can submit to your insurance company for reimbursement. We also offer flexible payment plans to make our services accessible.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can I get a second opinion before traveling to India for treatment?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, this is highly recommended! Getting a second opinion before traveling helps you confirm your diagnosis, understand treatment options, and plan your medical journey effectively. If you decide to proceed with treatment in India, we can coordinate directly with the specialist who provided your second opinion.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What happens after I receive the second opinion?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                After receiving your second opinion, you have 30 days of follow-up support included. You can ask questions via email or phone, request clarification on recommendations, and get assistance with next steps. If you decide to pursue treatment in India, we help coordinate appointments, hospital selection, and travel arrangements.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Do you provide second opinions for children?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Yes, we have pediatric specialists who provide second opinions for children's medical conditions. Our pediatric team includes experts in various subspecialties including pediatric oncology, cardiology, neurology, and surgery. The same confidential, thorough review process applies to pediatric cases.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can family members participate in the video consultation?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely! We encourage family involvement in the consultation process. Multiple family members can join the video call, and we welcome questions from everyone. This helps ensure that all decision-makers understand the medical situation and recommendations fully.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-6">
            <FileSearch className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Get Your Expert Second Opinion Today
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Make confident medical decisions with expert review from India's leading specialists. 
            Fast, affordable, and completely confidential.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91-XXX-XXX-XXXX
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-5 h-5 mr-2" />
              Email: info@manalhealthcare.com
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Article */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>The Importance of Medical Second Opinions in Healthcare</h2>
          
          <p>
            In today's complex medical landscape, seeking a second opinion has become not just advisable but often essential for making informed healthcare decisions. Medical second opinions provide patients with additional perspectives on their diagnosis, treatment options, and prognosis, empowering them to make choices that best align with their health goals and personal circumstances.
          </p>

          <h3>Understanding Medical Second Opinions</h3>
          
          <p>
            A medical second opinion is an evaluation of your medical condition by a healthcare professional other than the one who provided your initial diagnosis. This independent review examines your medical records, diagnostic test results, imaging studies, and current treatment plan to either confirm or suggest alternatives to your initial diagnosis and proposed treatment.
          </p>

          <p>
            The value of second opinions has been well-documented in medical literature. Studies show that second opinions lead to changes in diagnosis in 10-30% of cases, and treatment recommendations are altered in up to 40% of cases. These statistics underscore the reality that even experienced physicians can have differing interpretations of complex medical situations.
          </p>

          <h3>When Second Opinions Are Most Critical</h3>
          
          <p>
            While second opinions can be valuable for any medical condition, they become particularly crucial in certain situations. Major surgical procedures, especially elective surgeries, warrant second opinions because they carry significant risks and have lasting impacts on your health and quality of life. Before committing to surgery, understanding all alternatives and confirming that surgery is truly necessary can prevent unnecessary procedures and complications.
          </p>

          <p>
            Cancer diagnoses represent another critical area where second opinions are invaluable. The complexity of cancer staging, the rapid evolution of treatment protocols, and the availability of clinical trials mean that different oncologists may recommend varying approaches. A second opinion can ensure you're receiving the most current, evidence-based treatment for your specific cancer type and stage.
          </p>

          <h3>The Role of Specialized Expertise</h3>
          
          <p>
            Rare or complex conditions often benefit tremendously from second opinions by specialists with specific expertise. General practitioners and even specialists see a wide range of conditions, but those with concentrated experience in particular diseases bring insights that come from treating hundreds or thousands of similar cases. This depth of experience can be especially valuable for conditions that require specialized knowledge or novel treatment approaches.
          </p>

          <p>
            India has emerged as a global hub for medical second opinions, offering access to highly trained specialists with extensive international experience. Many Indian physicians have trained at prestigious institutions worldwide and bring both Western medical knowledge and experience with diverse patient populations. This combination of expertise and accessibility makes Indian healthcare professionals particularly valuable for second opinion consultations.
          </p>

          <h3>The Second Opinion Process</h3>
          
          <p>
            The modern second opinion process has been streamlined through technology, making it more accessible than ever. Patients can now submit their medical records electronically through secure portals, eliminating geographical barriers and reducing wait times. The reviewing specialist conducts a comprehensive analysis of all provided information, often consulting medical literature and collaborating with colleagues when appropriate.
          </p>

          <p>
            A quality second opinion report goes beyond simply confirming or disagreeing with the initial diagnosis. It should provide detailed explanations of the reasoning behind any alternative recommendations, cite relevant medical research, suggest additional diagnostic tests if needed, and outline various treatment pathways with their respective risks and benefits. This comprehensive approach empowers patients to engage in meaningful discussions with their primary physicians about the best course of action.
          </p>

          <h3>Financial Considerations</h3>
          
          <p>
            The cost of second opinions varies widely depending on the complexity of the case and the method of consultation. While some patients worry about the expense, studies consistently show that second opinions can result in significant cost savings by identifying less expensive but equally effective treatments or avoiding unnecessary procedures. Insurance companies increasingly recognize this value, with many now covering second opinion services, especially for major surgeries or serious conditions.
          </p>

          <p>
            Indian healthcare providers offer particularly cost-effective second opinion services compared to Western countries, typically charging 60-80% less while maintaining high quality standards. This affordability, combined with rapid turnaround times, makes obtaining a second opinion from India an attractive option for patients worldwide.
          </p>

          <h3>Emotional and Psychological Benefits</h3>
          
          <p>
            Beyond the clinical value, second opinions provide significant emotional and psychological benefits. Facing a serious diagnosis or major surgery naturally generates anxiety and uncertainty. Having another expert review your case and confirm that you're on the right path—or identify better alternatives—provides peace of mind that's invaluable during a stressful time.
          </p>

          <p>
            For patients who receive differing opinions, while this may initially increase complexity, it ultimately leads to more informed decision-making. Understanding why different physicians recommend different approaches helps patients ask better questions and engage more actively in their care. This increased engagement and understanding often leads to better treatment adherence and improved outcomes.
          </p>

          <h3>Navigating Conflicting Opinions</h3>
          
          <p>
            When second opinions differ from initial diagnoses or treatment recommendations, patients may feel confused about how to proceed. The key is to view this not as a problem but as an opportunity to gather more information. Discuss both opinions with your physicians, asking them to explain their reasoning and address the points raised by the other specialist. Most physicians welcome this dialogue and respect patients' desires to explore all options.
          </p>

          <p>
            In cases of significant disagreement, a third opinion or consultation with a multidisciplinary team may be warranted. Many complex cases benefit from review by specialists from different disciplines who can provide complementary perspectives on the best treatment approach.
          </p>

          <h3>The Future of Second Opinion Services</h3>
          
          <p>
            Technology continues to transform second opinion services, making them faster, more comprehensive, and more accessible. Artificial intelligence is beginning to play a role in analyzing medical images and identifying patterns, though human expertise remains essential for integrating all aspects of a case and making nuanced recommendations. Telemedicine platforms enable real-time consultations regardless of geographical distance, bringing expert opinions to patients who might otherwise lack access to specialized care.
          </p>

          <p>
            As healthcare becomes increasingly personalized, second opinions are evolving to incorporate genetic information, biomarkers, and other individual patient characteristics that influence treatment selection. This personalized approach ensures that recommendations are tailored not just to the disease but to the specific patient.
          </p>

          <h3>Making the Decision to Seek a Second Opinion</h3>
          
          <p>
            If you're uncertain whether to seek a second opinion, consider these questions: Are you facing a major decision with significant consequences? Do you have doubts about your diagnosis or treatment plan? Does your condition seem unusually complex or difficult to treat? Would having another expert perspective give you greater confidence in moving forward?
          </p>

          <p>
            If you answered yes to any of these questions, a second opinion is likely worth pursuing. Remember that seeking additional input doesn't mean you distrust your doctor—it means you're taking an active role in your healthcare and want to make the most informed decision possible. Most physicians understand and support this approach, recognizing that second opinions ultimately lead to better patient outcomes and satisfaction.
          </p>

          <p>
            In conclusion, medical second opinions represent a valuable tool for navigating today's complex healthcare landscape. Whether you're facing a serious diagnosis, considering major surgery, or simply want confirmation that you're pursuing the best treatment path, a second opinion provides the additional information and confidence you need to make decisions that align with your health goals and values.
          </p>
        </div>
      </section>
    </div>
  );
}
