import type { Metadata } from "next";
import { 
  HelpCircle, 
  Plane, 
  FileText, 
  CreditCard, 
  Shield, 
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  Stethoscope,
  Home,
  Utensils,
  Languages,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Banknote,
  Building2,
  MessageSquare,
  Video,
  Globe,
  Award,
  Heart
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CategoryCard } from "./components/CategoryCard";

export const metadata: Metadata = {
  title: "Patient FAQs - Medical Tourism India | Complete Guide for International Patients",
  description: "Comprehensive FAQs for international patients seeking medical treatment in India. Get answers about visa, travel, costs, hospitals, procedures, accommodation, and post-treatment care.",
  keywords: [
    "medical tourism FAQs",
    "India medical travel questions",
    "international patient guide",
    "medical visa India",
    "hospital costs India",
    "medical tourism process",
    "patient questions India",
    "treatment abroad FAQs",
    "healthcare India questions",
    "medical travel guide",
    "patient support India",
    "hospital accommodation India",
    "medical treatment costs",
    "visa for medical treatment",
    "international patient care"
  ],
  openGraph: {
    title: "Patient FAQs - Medical Tourism India | Complete Guide",
    description: "Everything international patients need to know about medical treatment in India. Comprehensive answers to visa, travel, costs, and treatment questions.",
    type: "website",
    url: "https://manalhealthcare.com/info/faqs-for-patient",
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient FAQs - Medical Tourism India",
    description: "Complete guide for international patients: visa, travel, costs, hospitals, and treatment information.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/faqs-for-patient",
  },
};

// TypeScript Interfaces
interface FAQCategory {
  category: string;
  iconName: string;
  description: string;
  color: string;
  questions: FAQ[];
}

interface FAQ {
  question: string;
  answer: string;
  helpful?: string[];
}

interface QuickFact {
  icon: React.ElementType;
  title: string;
  fact: string;
  details: string;
}

interface ProcessOverview {
  step: number;
  title: string;
  icon: React.ElementType;
  description: string;
}

// Reusable Components
const QuickFactCard = ({ fact }: { fact: QuickFact }) => (
  <Card className="p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <fact.icon className="w-8 h-8 text-blue-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{fact.title}</h4>
        <p className="text-lg text-blue-600 font-bold mb-2">{fact.fact}</p>
        <p className="text-sm text-gray-600">{fact.details}</p>
      </div>
    </div>
  </Card>
);

// Icon mapping for categories
const iconMap: Record<string, React.ElementType> = {
  "Plane": Plane,
  "CreditCard": CreditCard,
  "Building2": Building2,
  "Stethoscope": Stethoscope,
  "Home": Home,
  "MessageSquare": MessageSquare,
  "Globe": Globe,
  "Heart": Heart
};

// Data Arrays
const faqCategories: FAQCategory[] = [
  {
    category: "Travel & Visa",
    iconName: "Plane",
    description: "Questions about visas, travel arrangements, and arrival procedures",
    color: "blue",
    questions: [
      {
        question: "What type of visa do I need for medical treatment in India?",
        answer: "You need a Medical Visa (MV) for seeking medical treatment in India. The Medical Visa is issued for a maximum period of 60 days with triple entry. You can apply online through the Indian Visa Online portal or at the nearest Indian Embassy/Consulate. The application requires: a valid passport (6+ months validity), a medical letter from the hospital in India, passport-sized photographs, and the visa fee. Processing typically takes 3-5 business days.",
        helpful: ["Apply at least 2 weeks before travel", "Triple entry allows you to enter India three times", "Can be extended in India if needed"]
      },
      {
        question: "Can my family members accompany me?",
        answer: "Yes, up to two family members or friends can accompany you on Medical Attendant Visa (MX). The MX visa has the same validity as your Medical Visa. Attendants need to apply separately and must provide proof of their relationship with the patient, along with a copy of the patient's Medical Visa. Attendants are not allowed to work in India during their stay.",
        helpful: ["MX visa is for family members/attendants only", "Same duration as patient's visa", "No work permitted on MX visa"]
      },
      {
        question: "Which airports should I fly into?",
        answer: "Major international airports for medical tourism are: Delhi (IGI Airport) - Best for North India hospitals; Mumbai (Chhatrapati Shivaji) - Best for Mumbai and West India; Bangalore (Kempegowda) - Best for South India; Chennai (Chennai International) - Best for South India; Hyderabad (Rajiv Gandhi) - Best for Central South India. Choose based on your hospital location. We can arrange airport pickup and transfer to hospital/hotel.",
        helpful: ["Delhi and Mumbai are largest international hubs", "Most hospitals provide airport pickup", "Domestic connections available if needed"]
      },
      {
        question: "Do I need travel insurance?",
        answer: "While not mandatory, travel insurance is highly recommended. Look for policies that cover: medical emergencies, trip cancellation/interruption, medical evacuation if needed, lost luggage, and flight delays. Many insurance companies offer medical tourism-specific policies. Ensure the policy covers your specific medical condition and treatment. Check if your home country insurance provides international coverage.",
        helpful: ["Medical tourism insurance packages available", "Cover pre-existing conditions", "Emergency evacuation coverage important"]
      },
      {
        question: "How early should I arrive before my treatment?",
        answer: "We recommend arriving 2-3 days before your scheduled treatment or surgery. This allows time for: jet lag recovery and rest, pre-operative tests and consultations, doctor meetings and final discussions, settling into accommodation, and adjustment to local climate and time zone. For major surgeries, arriving 3-4 days early is advisable. Emergency cases can be accommodated with shorter notice.",
        helpful: ["2-3 days for most procedures", "3-4 days for major surgeries", "Emergency admissions possible"]
      }
    ]
  },
  {
    category: "Costs & Payments",
    iconName: "CreditCard",
    description: "Information about treatment costs, payment methods, and financial planning",
    color: "green",
    questions: [
      {
        question: "How much cheaper is medical treatment in India compared to Western countries?",
        answer: "Medical treatments in India typically cost 60-90% less than in the US, UK, or Canada while maintaining international quality standards. Examples: Heart bypass surgery: $5,000-$10,000 (vs. $70,000-$200,000 in US); Hip replacement: $6,000-$10,000 (vs. $40,000-$50,000); Knee replacement: $5,500-$8,500 (vs. $35,000-$50,000); Cataract surgery: $800-$1,500 per eye (vs. $3,500-$5,000); IVF treatment: $2,500-$4,000 (vs. $12,000-$15,000). Costs include surgeon fees, hospital stay, and basic post-op care.",
        helpful: ["60-90% savings on average", "Prices include hospital stay", "Additional costs: travel, accommodation"]
      },
      {
        question: "What payment methods are accepted?",
        answer: "Hospitals accept multiple payment methods: International credit cards (Visa, Mastercard, Amex); Bank wire transfers (advance payment option); Cash payments (USD, EUR, GBP, and INR accepted); Payment plans for expensive treatments; Insurance (if you have international coverage). Most hospitals require a 50% advance deposit before admission, with the balance due at discharge. Keep all receipts for insurance claims and tax purposes.",
        helpful: ["Credit cards widely accepted", "Wire transfers for large amounts", "Payment plans available"]
      },
      {
        question: "Are there any hidden costs I should know about?",
        answer: "Transparent pricing is standard, but budget for: Hospital costs (covered in quote); Doctor consultation fees (included in most quotes); Diagnostic tests (some pre-op tests may be additional); Medications (post-discharge medicines separate); Accommodation (hotel/guest house not in medical quote); Food and meals (if not staying at hospital); Local transportation; Attendant costs; International calls; Post-treatment medications; Follow-up consultations (usually included for 1-3 months). Request itemized quotes to understand exactly what's included.",
        helpful: ["Request detailed cost breakdown", "Budget 10-15% extra for miscellaneous", "Post-discharge medicines separate"]
      },
      {
        question: "Can I use my insurance?",
        answer: "Many international insurance policies provide coverage for treatment in India. Steps to use insurance: 1) Check your policy for international coverage, 2) Get pre-authorization if required, 3) Inform hospital about insurance coverage, 4) Hospital will provide necessary documentation, 5) You may need to pay upfront and claim reimbursement. Some insurance companies have direct billing arrangements with Indian hospitals. We help with documentation needed for claims. Travel insurance with medical coverage is also an option.",
        helpful: ["Check policy for India coverage", "Pre-authorization may be required", "Keep all medical receipts"]
      },
      {
        question: "What is included in the quoted treatment cost?",
        answer: "Standard treatment quotes typically include: Surgeon's fees; Hospital room charges (standard or private room); Nursing care; Operation theater charges; Anesthesia; Medications during hospital stay; Basic diagnostic tests; Post-operative care during hospital stay; Standard medical supplies; Follow-up consultations (usually 1-3 months). NOT usually included: Pre-operative diagnostic tests done before arrival; Accommodation outside hospital; Travel costs; Post-discharge medications; Complications requiring extended stay (usually covered by insurance); Personal items and comfort items.",
        helpful: ["Always ask for itemized quote", "Clarify room type included", "Understand follow-up coverage"]
      }
    ]
  },
  {
    category: "Hospitals & Doctors",
    iconName: "Building2",
    description: "Questions about hospital selection, doctor qualifications, and quality standards",
    color: "purple",
    questions: [
      {
        question: "Are Indian hospitals internationally accredited?",
        answer: "Yes, many Indian hospitals hold international accreditations: JCI (Joint Commission International) - Over 50 Indian hospitals are JCI accredited, equivalent to US hospital standards. NABH (National Accreditation Board) - Indian quality standard similar to JCI. ISO certifications - Quality management systems. These accreditations ensure: International protocols followed; Regular quality audits; Trained medical staff; Modern equipment and facilities; Patient safety standards; Infection control measures. We work only with internationally accredited hospitals.",
        helpful: ["50+ JCI accredited hospitals in India", "NABH is Indian equivalent of JCI", "Regular audits ensure quality"]
      },
      {
        question: "What are the qualifications of Indian doctors?",
        answer: "Indian doctors treating international patients are highly qualified: MBBS/MD/MS from recognized medical universities; Many have trained at prestigious institutions in US, UK, Europe; Fellowship training in super-specialties; 15-30 years of experience on average; Published research in international journals; Members of international medical associations; Fluent in English; Experience treating international patients. Many Indian doctors have trained and worked abroad before returning to India. They combine international expertise with cost-effective healthcare delivery.",
        helpful: ["International training common", "15-30 years average experience", "English fluency standard"]
      },
      {
        question: "Can I choose my own doctor?",
        answer: "Absolutely! We provide: Doctor profiles with qualifications and experience; Specialization details and success rates; Patient reviews and testimonials; Option to schedule video consultation before deciding; You can request a specific doctor based on: Your research; Recommendations from others; Doctor's expertise in your specific condition; Language preferences. If your preferred doctor is unavailable, we suggest alternatives with similar expertise. Most patients appreciate our guidance in matching them with the right specialist.",
        helpful: ["Free to choose your doctor", "Video consultation available", "We help match you with specialists"]
      },
      {
        question: "What if I need a second opinion?",
        answer: "Second opinions are encouraged and easily arranged: Can be done before traveling to India (virtual consultation); Can request during your stay in India; No offense to original doctor - it's standard practice; We coordinate with multiple specialists if needed; Video consultations available for remote opinions. Many hospitals have multidisciplinary teams that review complex cases together, providing multiple expert perspectives automatically. Second opinion costs $299-$499 for virtual consultations, or included if you proceed with treatment.",
        helpful: ["Second opinions encouraged", "Virtual consultations available", "Multidisciplinary teams for complex cases"]
      },
      {
        question: "Do doctors speak English?",
        answer: "Yes, all doctors treating international patients are fluent in English. India's medical education is conducted in English, so all doctors are English-proficient. Additionally: Medical staff and nurses speak English; Translators available for other languages (Arabic, French, Russian, etc.); Hospital signage in English; Medical reports in English; Prescription instructions in English. For non-English speakers, we arrange: Professional medical interpreters; Translation of critical documents; Language-speaking coordinators. Common languages supported: Arabic, French, Russian, Spanish, Swahili, Somali.",
        helpful: ["All doctors fluent in English", "Translators available for other languages", "Medical reports in English"]
      }
    ]
  },
  {
    category: "Treatment & Procedures",
    iconName: "Stethoscope",
    description: "Information about medical procedures, pre-op requirements, and treatment protocols",
    color: "indigo",
    questions: [
      {
        question: "How do I start the treatment process?",
        answer: "Simple 6-step process: 1) Contact Us - Call, email, or fill online form; 2) Submit Medical Records - Send reports, scans, medical history; 3) Medical Review - Doctors review your case (24-48 hours); 4) Treatment Plan & Quote - Receive detailed plan and cost estimate; 5) Travel Planning - We help with visa, flights, accommodation; 6) Arrival & Treatment - Airport pickup, hospital admission, treatment begins. Timeline from first contact to treatment: 2-3 weeks for planned procedures; Urgent cases can be expedited (3-5 days possible).",
        helpful: ["2-3 weeks typical timeline", "Urgent cases expedited", "Full support throughout process"]
      },
      {
        question: "What medical records do I need to bring?",
        answer: "Please bring comprehensive documentation: Recent medical reports and diagnoses; All diagnostic test results (blood work, etc.); Imaging studies (X-rays, CT, MRI, PET scans) - Bring digital copies on CD/USB; Current medications list; Previous surgery records if applicable; Medical history summary; Cardiogram reports if available; Doctor's referral letter. Send digital copies before travel for pre-assessment. Bring original hard copies when traveling. If reports are in languages other than English, bring certified translations.",
        helpful: ["Send digital copies in advance", "Bring original hard copies", "English translations if needed"]
      },
      {
        question: "How long will I need to stay in India?",
        answer: "Stay duration depends on the procedure: Minor procedures/Diagnostics: 3-5 days; Cataract surgery: 5-7 days; Knee/Hip replacement: 10-15 days; Cardiac bypass: 12-18 days; Cancer treatment: 2-4 weeks (varies by protocol); Cosmetic surgery: 7-14 days; Dental procedures: 5-10 days (may need multiple visits). Timeline includes: Pre-operative consultations and tests (1-2 days); Surgery day; Hospital recovery (varies); Post-operative monitoring (outpatient); Final doctor clearance to travel. Plan to stay 3-4 days longer than minimum for safety.",
        helpful: ["Varies by procedure", "10-15 days average", "Plan extra time for safety"]
      },
      {
        question: "What is the quality of medical technology in Indian hospitals?",
        answer: "Top Indian hospitals have state-of-the-art technology: Da Vinci Robotic Surgery systems; CyberKnife for precision radiation; 3 Tesla MRI machines; 256-slice CT scanners; Hybrid operation theaters; Advanced cardiac catheterization labs; Latest chemotherapy protocols; Stem cell therapy facilities. Many hospitals upgrade equipment regularly to maintain international standards. Technology is often newer than in many Western hospitals. Indian hospitals invest heavily in latest medical technology to attract international patients.",
        helpful: ["Latest medical technology", "Robotic surgery available", "Equipment comparable to Western hospitals"]
      },
      {
        question: "What happens if there are complications?",
        answer: "Comprehensive complication management: Pre-surgery risk assessment to minimize complications; 24/7 medical monitoring during hospital stay; Immediate intervention if issues arise; ICU facilities available in all accredited hospitals; No additional charges for standard complication management; Extended stay covered if medically necessary; Insurance coverage if you have policy; Clear communication with you and family. Serious complications are rare in accredited hospitals. Success rates are published for major procedures. Emergency protocols are in place and regularly updated.",
        helpful: ["24/7 monitoring", "Complications rare in accredited hospitals", "Extended care if needed"]
      },
      {
        question: "Can I get my treatment in stages if I can't stay long?",
        answer: "Yes, staged treatment is possible for many procedures: Dental work - Multiple visits common (3-6 months apart); Cancer treatment - Can do surgery in India, chemotherapy at home; Orthopedic procedures - Can do one joint, return later for second; Cosmetic surgery - Primary procedure and revision in stages; IVF - Monitoring at home, procedures in India. We coordinate with your home doctors for: Continuing care; Follow-up tests; Post-treatment monitoring. Staged approach can reduce travel costs and time away from home. Requires good coordination between Indian doctors and home doctors.",
        helpful: ["Staged treatment possible", "Coordinate with home doctors", "Reduces travel time"]
      }
    ]
  },
  {
    category: "Accommodation & Stay",
    iconName: "Home",
    description: "Information about lodging, food, and living arrangements during treatment",
    color: "orange",
    questions: [
      {
        question: "Where can I stay during my treatment?",
        answer: "Multiple accommodation options available: Hospital Guest Houses - Adjacent to hospital, convenient, medical staff nearby, $30-$60/night; Serviced Apartments - Kitchen facilities, more space, family-friendly, $50-$100/night; Hotels (3-5 star) - Full amenities, room service, $40-$200/night; Long-term rentals - For extended stays, fully furnished, $500-$1500/month. All options within 10-15 minutes of hospital. We help book based on your: Budget; Length of stay; Number of people; Special requirements. Free cancellation policies available.",
        helpful: ["Options for every budget", "Close to hospitals", "We help with booking"]
      },
      {
        question: "Is the accommodation safe and clean?",
        answer: "Yes, we partner only with verified accommodations: Regular inspections and quality checks; Clean, well-maintained properties; 24/7 security; Safe neighborhoods near hospitals; English-speaking staff; Medical emergency protocols; WiFi and modern amenities; Regular housekeeping. Hospital guest houses are especially suitable as they: Understand patient needs; Have medical staff nearby; Cater to international patients; Provide medical-grade cleanliness. We check all accommodations personally before recommending them.",
        helpful: ["Verified safe accommodations", "Medical-grade cleanliness", "Security provided"]
      },
      {
        question: "What about food? Will I get food I can eat?",
        answer: "Food accommodation is comprehensive: Hospital food - Customized to medical and dietary needs; International cuisine available; Special diet requirements met (diabetic, low-sodium, etc.); Religious dietary requirements (Halal, Kosher, vegetarian); Guest houses and hotels offer: Multiple cuisine options (Western, Asian, Indian); Familiar foods for international patients; Fresh, hygienic preparation; Room service available. Specific dietary needs accommodated: Food allergies; Religious requirements; Medical dietary restrictions; Personal preferences. Many patients find Indian cuisine delicious and healthy!",
        helpful: ["International cuisine available", "Dietary restrictions accommodated", "Halal/Kosher options available"]
      },
      {
        question: "Can my family stay with me?",
        answer: "Yes, family presence is encouraged: In hospital - One attendant can stay in room with patient (private rooms); Hospital provides extra bed/cot; Family can visit during visiting hours; Special arrangements for children visiting. Outside hospital - Family can stay in same accommodation; Family rooms and suites available; Kitchen facilities in serviced apartments; Activities for family members during treatment. Family support is considered important for recovery. Hospitals are very family-friendly and flexible with visiting policies.",
        helpful: ["Family can stay in hospital room", "Family accommodations available", "Family support encouraged"]
      },
      {
        question: "What can my family do while I'm in treatment?",
        answer: "Plenty of options for family members: Tourism - Visit local attractions and historical sites; Shopping - Markets, malls, local crafts; Cultural experiences - Temples, museums, performances; Short trips - Day trips to nearby destinations; Hospital facilities - Some hospitals have family lounges, cafes; We can arrange: City tours; Shopping trips; Cultural experiences; Licensed tour guides. Delhi, Mumbai, Bangalore, Chennai all offer rich cultural and historical attractions. Many families combine medical treatment with tourism. Perfect opportunity to experience India!",
        helpful: ["Tourism opportunities available", "We arrange sightseeing", "Combine treatment with tourism"]
      }
    ]
  },
  {
    category: "Communication & Support",
    iconName: "MessageSquare",
    description: "Questions about language, communication, and patient support services",
    color: "rose",
    questions: [
      {
        question: "Will I have a dedicated coordinator?",
        answer: "Yes! Each patient gets a personal medical coordinator who: Is your single point of contact; Available 24/7 via phone, WhatsApp, email; Coordinates all aspects of your treatment; Arranges airport pickup and hospital transfers; Accompanies you to appointments if needed; Helps with language translation if required; Assists with accommodation and local arrangements; Handles paperwork and documentation; Provides updates to family back home. Your coordinator knows your case intimately and ensures everything runs smoothly. They start working with you from first contact until you return home.",
        helpful: ["24/7 personal coordinator", "Single point of contact", "Helps with everything"]
      },
      {
        question: "How do I communicate with my family back home?",
        answer: "Multiple communication options available: Hospital WiFi - Free in most hospitals; Video calls - WhatsApp, Skype, FaceTime all work; Local SIM card - Available at airport, affordable data plans; International roaming - If preferred (more expensive); Hospital phones - Available for international calls (charges apply). Internet is reliable in cities. Video calls work well for updating family. We help coordinate family updates if you prefer. Can arrange conference calls with doctors and family if desired. Many families create WhatsApp groups for easy updates.",
        helpful: ["Free hospital WiFi", "Video calls work well", "Local SIM cards affordable"]
      },
      {
        question: "What if there's an emergency?",
        answer: "Comprehensive emergency protocols in place: Medical emergencies - 24/7 emergency departments in all hospitals; ICU and critical care available; Ambulance services; Emergency medical teams. Non-medical emergencies - Your coordinator available 24/7; Embassy contact information provided; Emergency cash assistance guidance; Help with lost documents/passport. Emergency contacts provided: Hospital emergency number; Your coordinator's 24/7 number; Our main office emergency line; Local embassy/consulate; Indian emergency services (108/102). All emergencies handled swiftly and professionally.",
        helpful: ["24/7 emergency support", "ICU facilities available", "Coordinator always accessible"]
      },
      {
        question: "Can I schedule video consultations before traveling?",
        answer: "Yes! Video consultations are highly recommended: Pre-travel consultation ($50-$150) - Meet your doctor; Discuss your condition; Review medical records; Understand treatment plan; Ask questions; Get comfortable with doctor and hospital. Benefits: Reduces anxiety; Ensures you're comfortable with chosen doctor; Clarifies treatment expectations; Can do second opinion before traveling; Build rapport with medical team. Easy to schedule: WhatsApp video; Zoom/Skype; Hospital's telemedicine platform. Usually 20-30 minutes. Can include family members. Strongly recommended for major procedures.",
        helpful: ["Video consults available", "$50-$150 typically", "Highly recommended before travel"]
      },
      {
        question: "What kind of follow-up support do I get after returning home?",
        answer: "Extensive post-treatment support: During follow-up period (typically 3-6 months): Email and WhatsApp access to your doctor; Review of test results done at home; Medication adjustment guidance; Answer questions about recovery; Video consultations if needed (usually included). We also: Share medical records with your home doctor; Provide detailed discharge summary; Give emergency contact information; Arrange any required follow-up tests in India; Coordinate with home healthcare providers. Long-term: Available for questions even after follow-up period; Can return for check-ups at discounted rates; Maintain your medical records for future reference.",
        helpful: ["3-6 months follow-up included", "Video consultations available", "Coordinate with home doctors"]
      }
    ]
  },
  {
    category: "Cultural & Practical",
    iconName: "Globe",
    description: "Information about Indian culture, practical tips, and daily life",
    color: "emerald",
    questions: [
      {
        question: "What should I know about Indian culture?",
        answer: "Key cultural points for international patients: Greetings - 'Namaste' with joined palms is common, handshakes acceptable; Respect - Remove shoes when entering homes/temples; Dress - Modest dress appreciated (shoulders and knees covered); Food - Right hand used for eating traditionally; Language - English widely spoken in cities and hospitals; Tipping - Not mandatory but appreciated (10% in restaurants); Bargaining - Expected in markets, not in malls/hospitals. Indians are: Very friendly and helpful; Curious about foreigners (in a positive way); Family-oriented; Respect for elders and doctors. Hospital staff are professional and accustomed to international patients.",
        helpful: ["English widely spoken", "Indians very hospitable", "Hospital staff experienced with foreigners"]
      },
      {
        question: "What's the weather like? What should I pack?",
        answer: "India has diverse climate zones: Summer (March-June) - Hot, 30-45°C (86-113°F), light cotton clothing; Monsoon (July-September) - Rainy, humid, bring umbrella; Winter (November-February) - Pleasant, 10-25°C (50-77°F), light jacket needed; South India - Warm year-round. Packing essentials: Comfortable loose clothing; Medications (current prescriptions); Medical documents; Comfortable shoes; Light jacket/sweater; Personal toiletries; Modest clothing for hospital; Phone charger with India adapter (230V); Sunscreen and hat. Hospital provides: Gowns for surgery; Basic toiletries; Slippers. Keep valuables minimal.",
        helpful: ["Check weather for your travel dates", "Light, comfortable clothing best", "Bring current medications"]
      },
      {
        question: "Is India safe for international patients?",
        answer: "Yes, India is safe for medical tourists with basic precautions: Hospital areas - Very safe, security 24/7; Accommodation - We arrange safe neighborhoods; Transport - Use hospital-arranged cars or reputable services (Uber/Ola available); Tourist areas - Generally safe, normal precautions apply. Safety tips: Don't carry excessive cash; Use hotel safe for valuables; Stay in well-lit, busy areas; Use registered transportation; Keep emergency contacts handy; Trust your coordinator's advice. Medical tourism areas in major cities are well-developed and secure. Millions of international patients visit India annually safely.",
        helpful: ["Medical tourism areas very safe", "Normal precautions sufficient", "Your coordinator ensures safety"]
      },
      {
        question: "What currency should I bring?",
        answer: "Currency guidance: Indian Rupee (INR) is local currency; Exchange rate: ~₹80-85 per $1 USD (varies). Best options: Bring USD, EUR, or GBP - Easily exchanged; Exchange at airport (convenience) or banks (better rates); Credit cards - Widely accepted (Visa, Mastercard); ATMs - Available everywhere, accept international cards. How much cash to bring: Medical bills - Often paid by card or wire transfer; Daily expenses - $30-$50/day sufficient; Emergency fund - $200-$300 extra. Hospital payments: Can pay in USD/EUR directly at many hospitals; Or pay in INR after exchange; Credit cards accepted for large payments.",
        helpful: ["Bring USD, EUR, or GBP", "$30-50/day for expenses", "Credit cards widely accepted"]
      },
      {
        question: "Can I combine tourism with my medical treatment?",
        answer: "Yes! Many patients combine treatment with tourism: Before treatment - Arrive a few days early, sightseeing when feeling well; After treatment - Once doctor clears you, extend stay for tourism; Family tourism - While you're in hospital, family can tour. Popular experiences near major medical hubs: Delhi - Taj Mahal (4 hrs), Red Fort, Qutub Minar; Mumbai - Gateway of India, Elephanta Caves; Bangalore - Palaces, gardens, technology tours; Chennai - Temples, beaches, cultural sites; Kerala (South) - Backwaters, Ayurveda, beaches. We can arrange: Customized tour packages; Licensed guides; Transportation; Comfortable pacing for recovery patients. Combine healing with the incredible India experience!",
        helpful: ["Tourism opportunities abundant", "We arrange tour packages", "After doctor's clearance"]
      }
    ]
  },
  {
    category: "After Treatment",
    iconName: "Heart",
    description: "Post-treatment care, follow-up, and returning home",
    color: "amber",
    questions: [
      {
        question: "When can I fly home after surgery?",
        answer: "Flight clearance varies by procedure: Minor procedures - 24-48 hours; Dental work - 24-48 hours; Eye surgery - 1 week; Orthopedic surgery - 2-3 weeks; Cardiac surgery - 2-3 weeks; Abdominal surgery - 1-2 weeks; Cosmetic surgery - 7-14 days. Doctors consider: Wound healing progress; Complication risk; Flight duration; Your overall condition; Cabin pressure effects. Long flights (over 6 hours) may require: Compression stockings; Blood thinners; Movement exercises; Aisle seat for mobility. Always wait for doctor's written clearance. Don't rush - full recovery is more important than quick return.",
        helpful: ["Varies by procedure", "Doctor clearance required", "Don't rush recovery"]
      },
      {
        question: "What medications will I take home?",
        answer: "Post-discharge medications: Typically 1-3 months supply provided; Detailed instructions in English; Generic names listed (for refills at home); Customs documentation provided. Common medications: Pain management; Antibiotics (if prescribed); Anti-inflammatory drugs; Blood thinners (if needed); Medications specific to your condition. Prescription includes: Medicine names (generic and brand); Dosage instructions; Duration of treatment; Refill information; Side effects to watch for. We help: Coordinate refills with home pharmacy; Provide generic names for international availability; Explain any restrictions for customs.",
        helpful: ["1-3 months supply provided", "Instructions in English", "Refill guidance provided"]
      },
      {
        question: "How do I manage follow-up care at home?",
        answer: "Comprehensive follow-up plan: Before discharge: Detailed medical summary for home doctor; List of follow-up tests needed; Timeline for recovery milestones; Warning signs to watch for; Direct contact to Indian medical team. After returning home: Email/WhatsApp access to your doctor; Review test results done at home; Video consultations if needed; Coordinate with local doctors; Medical records available online. Local follow-up: We provide detailed handover to your home doctor; Your home doctor can contact Indian team; Many home doctors appreciate the detailed documentation; Can do routine tests locally, consult Indian team for interpretation.",
        helpful: ["Detailed medical summary provided", "Home doctor coordination", "Video consultations available"]
      },
      {
        question: "What if I have complications after returning home?",
        answer: "Comprehensive post-return support: Immediate support: Contact your coordinator 24/7; Video consultation with your surgeon; Guidance on whether local ER needed; Connect with local specialists if required. Medical support: Review symptoms via video/photos; Adjust medications if needed; Arrange tests; Coordinate with local hospital if admission needed; Insurance support for claims. Most complications can be managed: With medication adjustments; With guidance to local doctors; Virtually through consultation; Only rarely requires return to India. Your Indian medical team remains responsible for your care during recovery period.",
        helpful: ["24/7 support continues", "Virtual consultations available", "Coordinate with local care"]
      },
      {
        question: "Do I need to return to India for follow-up visits?",
        answer: "Usually not required: Most follow-up done virtually - Video consultations; Email/WhatsApp; Photo documentation of healing; Test results from home. Return to India recommended for: Implant removals (if planned); Complex revisions; Annual check-ups for some procedures; If complications need in-person assessment. Benefits of virtual follow-up: Save travel costs; More convenient; Still effective for most situations; Can escalate to in-person if needed. If return needed: Discounted consultation rates; Can combine with tourism; Travel support provided; Short visits (2-5 days typically).",
        helpful: ["Virtual follow-up usually sufficient", "Return rarely needed", "Discounted rates if return required"]
      }
    ]
  }
];

const quickFacts: QuickFact[] = [
  {
    icon: Clock,
    title: "Average Response Time",
    fact: "24-48 hours",
    details: "We respond to all inquiries within 24-48 hours with detailed information"
  },
  {
    icon: Globe,
    title: "Countries Served",
    fact: "120+ countries",
    details: "We've helped patients from over 120 countries get treatment in India"
  },
  {
    icon: Award,
    title: "Hospital Partners",
    fact: "50+ accredited hospitals",
    details: "We work with 50+ JCI and NABH accredited hospitals across India"
  },
  {
    icon: Users,
    title: "Patient Satisfaction",
    fact: "98% satisfaction rate",
    details: "98% of our patients rate their experience as excellent or very good"
  }
];

const processOverview: ProcessOverview[] = [
  {
    step: 1,
    title: "Initial Consultation",
    icon: MessageSquare,
    description: "Contact us with your medical needs and receive preliminary information"
  },
  {
    step: 2,
    title: "Medical Review",
    icon: FileText,
    description: "Submit records for doctor review and receive treatment plan with cost estimate"
  },
  {
    step: 3,
    title: "Travel Planning",
    icon: Plane,
    description: "We assist with visa, flight bookings, and accommodation arrangements"
  },
  {
    step: 4,
    title: "Arrival & Treatment",
    icon: Stethoscope,
    description: "Airport pickup, hospital admission, and comprehensive treatment"
  },
  {
    step: 5,
    title: "Recovery & Discharge",
    icon: Heart,
    description: "Post-operative care, final consultations, and discharge with medications"
  },
  {
    step: 6,
    title: "Follow-up Support",
    icon: CheckCircle2,
    description: "Ongoing virtual support and coordination with home healthcare providers"
  }
];

export default function PatientFAQsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Patient FAQs - Medical Tourism India",
            "description": "Comprehensive FAQs for international patients seeking medical treatment in India",
            "url": "https://manalhealthcare.com/info/faqs-for-patient",
            "mainEntity": faqCategories.flatMap(category =>
              category.questions.slice(0, 3).map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            )
          }),
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-6">
              <HelpCircle className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Patient FAQs - Complete Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to know about medical treatment in India. 
              Comprehensive answers to all your questions about visa, travel, costs, hospitals, and treatment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                <Mail className="w-5 h-5 mr-2" />
                Email Your Questions
              </Button>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {quickFacts.map((fact, index) => (
              <QuickFactCard key={index} fact={fact} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers quickly by selecting the category that matches your questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faqCategories.map((category, index) => (
              <CategoryCard key={index} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How the Process Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 6-step journey from first contact to complete recovery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processOverview.map((process, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <process.icon className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">{process.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{process.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed FAQs by Category */}
      {faqCategories.map((category, categoryIndex) => (
        <section 
          key={categoryIndex} 
          id={`category-${categoryIndex}`}
          className={`py-16 px-4 ${categoryIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg bg-${category.color}-100`}>
                {(() => {
                  const IconComponent = iconMap[category.iconName] || Plane;
                  return <IconComponent className={`w-8 h-8 text-${category.color}-600`} />;
                })()}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`} className="border rounded-lg px-6 bg-white">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      {faq.helpful && faq.helpful.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <p className="font-semibold text-gray-900 mb-2">Quick Tips:</p>
                          <ul className="space-y-2">
                            {faq.helpful.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      ))}

      {/* Still Have Questions CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-white/10 rounded-full mb-6">
            <HelpCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Our patient coordinators are available 24/7 to answer all your questions and help you plan your medical journey to India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Phone className="w-5 h-5 mr-2" />
              Call Now: +91-XXX-XXX-XXXX
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Article */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2>Complete Guide for International Patients Seeking Treatment in India</h2>
          
          <p>
            India has emerged as one of the world's leading destinations for medical tourism, attracting hundreds of thousands of international patients annually. This comprehensive FAQ guide addresses every aspect of medical treatment in India, from initial planning to post-treatment follow-up, helping you make informed decisions about your healthcare journey.
          </p>

          <h3>Planning Your Medical Journey</h3>
          
          <p>
            Planning medical treatment abroad requires careful consideration of multiple factors. Understanding the process, costs, hospital options, and travel logistics is essential for a smooth and successful medical journey. This guide compiles answers to the most common questions from thousands of international patients we've helped over the years.
          </p>

          <h3>Why Choose India for Medical Treatment</h3>
          
          <p>
            India offers a unique combination of advantages for international patients: world-class medical expertise, internationally accredited hospitals, advanced medical technology, significant cost savings (60-90% compared to Western countries), and English-speaking medical professionals. The country has invested heavily in healthcare infrastructure, resulting in facilities that meet or exceed international standards while remaining accessible and affordable.
          </p>

          <h3>Your Safety and Comfort</h3>
          
          <p>
            Patient safety and comfort are paramount in Indian medical tourism. Accredited hospitals follow strict international protocols, maintain high standards of hygiene and infection control, and employ experienced medical professionals. Additionally, comprehensive support services ensure international patients feel comfortable and cared for throughout their treatment journey.
          </p>

          <h3>Making the Most of Your Medical Journey</h3>
          
          <p>
            With proper planning and support, medical treatment in India can be a positive, life-changing experience. Many patients choose to combine their medical treatment with cultural tourism, experiencing India's rich heritage while receiving world-class healthcare. The key to success is working with experienced medical tourism facilitators who can guide you through every step of the process.
          </p>

          <p>
            Whether you're seeking treatment for a complex medical condition, looking for affordable alternatives to expensive procedures in your home country, or simply want access to specialized expertise, India offers comprehensive solutions tailored to international patients' needs.
          </p>
        </div>
      </section>
    </div>
  );
}
