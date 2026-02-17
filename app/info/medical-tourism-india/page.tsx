import { Metadata } from "next";
import {
  Plane,
  Heart,
  Shield,
  Award,
  TrendingUp,
  Users,
  Building2,
  Stethoscope,
  Globe2,
  BadgeCheck,
  Clock,
  DollarSign,
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  Activity,
  Brain,
  Bone,
  Eye,
  HeartPulse,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Types
interface Statistic {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend?: string;
}

interface Specialty {
  icon: React.ReactNode;
  title: string;
  description: string;
  procedures: string[];
  successRate: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: string;
}

interface Destination {
  city: string;
  description: string;
  hospitals: number;
  specialties: string[];
  image?: string;
}

interface Testimonial {
  name: string;
  country: string;
  treatment: string;
  rating: number;
  testimonial: string;
  date: string;
}

// SEO Metadata
export const metadata: Metadata = {
  title: "Medical Tourism in India 2026 | #1 Destination for Affordable World-Class Healthcare",
  description:
    "Discover why India is the world's leading medical tourism destination. Save 60-90% on treatments with JCI-accredited hospitals, internationally trained doctors, and comprehensive care. Explore cardiac surgery, orthopedics, cosmetic procedures, fertility treatments & more.",
  keywords: [
    "medical tourism India",
    "healthcare tourism India 2026",
    "affordable medical treatment India",
    "JCI hospitals India",
    "medical travel India",
    "India surgery cost",
    "best hospitals India international patients",
    "cardiac surgery India",
    "orthopedic treatment India",
    "cosmetic surgery India",
    "dental tourism India",
    "IVF treatment India",
    "cancer treatment India",
    "medical visa India",
    "health tourism packages India",
  ],
  authors: [{ name: "Manal Healthcare" }],
  openGraph: {
    title: "Medical Tourism in India 2026 - World-Class Healthcare at 70% Lower Cost",
    description:
      "India welcomes 2M+ international patients annually. Explore JCI-accredited hospitals, expert doctors, and comprehensive medical tourism services.",
    type: "article",
    locale: "en_US",
    siteName: "Manal Healthcare",
    publishedTime: "2026-01-01T00:00:00Z",
    modifiedTime: new Date().toISOString(),
    images: [
      {
        url: "/images/medical-tourism-india.jpg",
        width: 1200,
        height: 630,
        alt: "Medical Tourism in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Tourism in India - Affordable World-Class Healthcare",
    description:
      "Save 60-90% on medical procedures without compromising quality. JCI-accredited hospitals, expert care, zero waiting time.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/medical-tourism-india",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Components
const StatCard: React.FC<{ stat: Statistic }> = ({ stat }) => (
  <Card className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center text-center space-y-2">
        <div className="bg-green-100 text-green-600 p-3 rounded-full">
          {stat.icon}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-gray-900">
          {stat.value}
        </div>
        <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
        {stat.trend && (
          <div className="text-xs text-green-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {stat.trend}
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const SpecialtyCard: React.FC<{ specialty: Specialty }> = ({ specialty }) => (
  <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500">
    <CardHeader>
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {specialty.icon}
      </div>
      <CardTitle className="text-xl">{specialty.title}</CardTitle>
      <CardDescription className="text-base">
        {specialty.description}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b">
          <span className="text-sm font-medium text-gray-600">Success Rate</span>
          <span className="text-lg font-bold text-green-600">
            {specialty.successRate}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Common Procedures:
          </p>
          <ul className="space-y-1">
            {specialty.procedures.map((proc, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                <span>{proc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BenefitCard: React.FC<{ benefit: Benefit }> = ({ benefit }) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader>
      <div className="bg-green-100 text-green-600 p-3 rounded-lg w-fit mb-3">
        {benefit.icon}
      </div>
      <CardTitle className="text-lg">{benefit.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 text-sm mb-2">{benefit.description}</p>
      {benefit.highlight && (
        <p className="text-green-600 font-semibold text-sm">
          {benefit.highlight}
        </p>
      )}
    </CardContent>
  </Card>
);

const DestinationCard: React.FC<{ destination: Destination }> = ({
  destination,
}) => (
  <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden">
    <CardHeader className="bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="flex items-center justify-between mb-2">
        <CardTitle className="text-2xl">{destination.city}</CardTitle>
        <MapPin className="w-6 h-6 text-green-600" />
      </div>
      <CardDescription className="text-base">
        {destination.description}
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-6 space-y-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-600">
          Accredited Hospitals
        </span>
        <span className="text-xl font-bold text-green-600">
          {destination.hospitals}+
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Key Specialties:
        </p>
        <div className="flex flex-wrap gap-2">
          {destination.specialties.map((spec, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <Card className="h-full hover:shadow-xl transition-all duration-300">
    <CardHeader>
      <div className="flex items-start justify-between">
        <div>
          <CardTitle className="text-lg">{testimonial.name}</CardTitle>
          <p className="text-sm text-gray-600">{testimonial.country}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: testimonial.rating }).map((_, idx) => (
            <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700 font-medium w-fit mt-2">
        {testimonial.treatment}
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-700 italic mb-3">&quot;{testimonial.testimonial}&quot;</p>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <BadgeCheck className="w-4 h-4 text-green-600" />
        <span>Verified Patient • {testimonial.date}</span>
      </div>
    </CardContent>
  </Card>
);

// Main Component
const MedicalTourismIndiaPage = () => {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Medical Tourism in India - Manal Healthcare",
            description:
              "Leading medical tourism destination offering world-class healthcare at affordable costs",
            url: "https://manalhealthcare.com/info/medical-tourism-india",
            telephone: "+91-123-456-7890",
            priceRange: "$$$",
            areaServed: "Worldwide",
            availableLanguage: [
              "English",
              "Arabic",
              "French",
              "Spanish",
              "Russian",
              "Chinese",
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "15000",
            },
          }),
        }}
      />

      <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-[url('/patterns/medical-pattern.svg')] opacity-5"></div>
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="max-w-5xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full animate-pulse">
                  <Globe2 className="w-14 h-14" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Medical Tourism in India:<br />
                <span className="text-green-100">
                  World-Class Healthcare at 70% Lower Cost
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8 max-w-3xl mx-auto leading-relaxed">
                Join 2 Million+ international patients who choose India annually
                for affordable, high-quality medical treatments at JCI-accredited
                hospitals with zero waiting time
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8"
                >
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8"
                >
                  Explore Treatments
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Statistics */}
        <section className="py-16 bg-white border-b">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  India: The Global Leader in Medical Tourism
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Trusted by millions worldwide for exceptional healthcare outcomes
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {keyStatistics.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose India */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <Heart className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose India for Medical Tourism?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover the unique advantages that make India the preferred
                  destination for medical travelers worldwide
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {benefits.map((benefit, index) => (
                  <BenefitCard key={index} benefit={benefit} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Medical Specialties */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <Stethoscope className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Top Medical Specialties in India
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Excellence across multiple medical disciplines with
                  international standards of care
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {medicalSpecialties.map((specialty, index) => (
                  <SpecialtyCard key={index} specialty={specialty} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Medical Destinations */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Premier Medical Tourism Destinations in India
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  World-class hospitals and specialists across major cities
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {topDestinations.map((destination, index) => (
                  <DestinationCard key={index} destination={destination} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Unbeatable Cost Advantage
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Save significantly without compromising on quality of care
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-green-600">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Medical Procedure
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-green-600">
                          India
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          USA
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          UK
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-green-600">
                          You Save
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {costComparison.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-4 px-4 font-medium text-gray-800">
                            {item.procedure}
                          </td>
                          <td className="text-center py-4 px-4 text-green-600 font-bold text-lg">
                            {item.india}
                          </td>
                          <td className="text-center py-4 px-4 text-gray-600">
                            {item.usa}
                          </td>
                          <td className="text-center py-4 px-4 text-gray-600">
                            {item.uk}
                          </td>
                          <td className="text-center py-4 px-4">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                              {item.savings}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-8 p-4 bg-white rounded-lg shadow-sm">
                  <p className="text-center text-gray-700">
                    <strong>Note:</strong> Prices include consultation, surgery,
                    hospital stay, and post-operative care. Actual costs may vary
                    based on specific requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <Star className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Stories from Our International Patients
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Real experiences from patients who received treatment in India
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {patientTestimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Your Medical Journey: Simple & Seamless
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We guide you through every step of your medical tourism experience
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {processSteps.map((step, index) => (
                  <Card
                    key={index}
                    className="relative hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500"
                  >
                    <CardHeader>
                      <div className="absolute -top-4 -left-4 bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      <div className="bg-green-100 text-green-600 p-3 rounded-lg w-fit mb-3">
                        {step.icon}
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto">
              <div className="text-center mb-12">
                <BadgeCheck className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  International Quality Standards
                </h2>
                <p className="text-lg text-gray-600">
                  Our partner hospitals maintain the highest global healthcare standards
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
                {qualityStandards.map((standard, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all"
                  >
                    <CardContent className="pt-6">
                      <div className="bg-green-100 text-green-600 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        {standard.icon}
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {standard.title}
                      </h3>
                      <p className="text-sm text-gray-600">{standard.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto prose prose-lg">
              <article className="text-gray-700">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Medical Tourism in India: The Complete 2026 Guide
                </h2>

                <p className="mb-4">
                  India has established itself as the world&apos;s premier medical
                  tourism destination, welcoming over 2 million international
                  patients annually. With a unique combination of world-class
                  medical infrastructure, highly qualified healthcare professionals,
                  and significantly lower costs compared to Western countries, India
                  offers exceptional value for patients seeking quality healthcare.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  The Rise of Medical Tourism in India
                </h3>
                <p className="mb-4">
                  The Indian medical tourism industry has grown exponentially over
                  the past two decades, with an estimated market value exceeding $9
                  billion in 2026. This remarkable growth is attributed to India&apos;s
                  investment in state-of-the-art medical facilities, adoption of
                  cutting-edge technologies, and development of specialized centers
                  of excellence across multiple medical disciplines.
                </p>

                <p className="mb-4">
                  Major cities like Delhi, Mumbai, Chennai, Bangalore, and Hyderabad
                  host internationally accredited hospitals that rival the best
                  healthcare institutions globally. These facilities feature advanced
                  medical equipment, modern infrastructure, and are staffed by
                  doctors trained at prestigious institutions worldwide.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Cost Advantage: Quality Healthcare at Fraction of the Cost
                </h3>
                <p className="mb-4">
                  One of the most compelling reasons patients choose India for
                  medical treatment is the substantial cost savings. Medical
                  procedures in India typically cost 60-90% less than in the United
                  States, United Kingdom, or other developed nations. For instance, a
                  heart bypass surgery that costs $75,000-$150,000 in the USA can be
                  performed in India for $7,000-$12,000, including hospital stay and
                  post-operative care.
                </p>

                <p className="mb-4">
                  This affordability extends across all medical specialties - from
                  cardiac surgery and orthopedic procedures to cosmetic treatments,
                  dental work, and fertility treatments. The lower costs do not
                  reflect inferior quality; rather, they result from lower
                  operational expenses, favorable exchange rates, and competitive
                  pricing in the Indian healthcare market.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  World-Class Medical Expertise and Facilities
                </h3>
                <p className="mb-4">
                  India is home to over 500 JCI (Joint Commission International)
                  accredited hospitals and numerous NABH (National Accreditation
                  Board for Hospitals & Healthcare Providers) certified facilities.
                  These accreditations ensure that hospitals maintain international
                  quality standards in patient care, safety protocols, and medical
                  outcomes.
                </p>

                <p className="mb-4">
                  Indian doctors and surgeons are renowned for their expertise and
                  experience. Many have received training and practiced in leading
                  medical institutions in the USA, UK, and Europe before returning to
                  India. The country produces over 50,000 medical graduates annually,
                  creating a deep pool of talented healthcare professionals.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Popular Medical Treatments and Procedures
                </h3>
                <p className="mb-4">
                  India excels in a wide range of medical specialties. Cardiac care
                  is one of the most sought-after treatments, with Indian hospitals
                  performing complex procedures like coronary artery bypass grafts,
                  valve replacements, and pediatric cardiac surgeries with success
                  rates comparable to top global institutions.
                </p>

                <p className="mb-4">
                  Orthopedic treatments, including joint replacements, spine surgery,
                  and sports medicine, attract thousands of international patients.
                  India&apos;s orthopedic surgeons are pioneers in minimally invasive
                  techniques and robotic-assisted surgeries.
                </p>

                <p className="mb-4">
                  Other popular treatments include cancer care with advanced
                  radiation therapy and chemotherapy, fertility treatments with high
                  success rates, cosmetic and plastic surgery, dental procedures,
                  organ transplants, and neurosurgery. India has also become a
                  preferred destination for wellness and alternative medicine,
                  including Ayurveda and yoga therapy.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Comprehensive Support for International Patients
                </h3>
                <p className="mb-4">
                  Medical tourism facilitators in India provide end-to-end support
                  for international patients. Services typically include assistance
                  with medical visa applications, airport transfers, accommodation
                  arrangements, language interpretation, coordination with hospitals
                  and doctors, and post-treatment follow-up care.
                </p>

                <p className="mb-4">
                  Many hospitals have dedicated international patient departments
                  staffed with coordinators who speak multiple languages. These
                  professionals help navigate the Indian healthcare system, explain
                  treatment protocols, manage appointments, and address any concerns
                  throughout the medical journey.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Medical Visa and Travel Requirements
                </h3>
                <p className="mb-4">
                  The Indian government has streamlined the medical visa process to
                  facilitate medical tourism. Medical visas (M Visa) are typically
                  granted for up to 60 days and can be extended if necessary. The
                  application process is straightforward, requiring a recommendation
                  letter from the treating hospital in India along with standard visa
                  documentation.
                </p>

                <p className="mb-4">
                  Patients can also bring up to two attendants on Medical Attendant
                  Visas (MX Visa). The visa can be applied for online or through
                  Indian embassies and consulates worldwide. Most medical tourism
                  facilitators assist with the entire visa application process.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Safety, Quality, and Post-Treatment Care
                </h3>
                <p className="mb-4">
                  Patient safety is paramount in Indian hospitals catering to
                  international patients. Stringent infection control protocols,
                  modern equipment, and adherence to international treatment
                  guidelines ensure optimal outcomes. Hospitals maintain transparent
                  communication about treatment plans, potential risks, and expected
                  results.
                </p>

                <p className="mb-4">
                  Post-treatment care is comprehensive, with detailed discharge
                  instructions, medication guidance, and follow-up consultations.
                  Many hospitals offer telemedicine services for long-term follow-up
                  after patients return to their home countries, ensuring continuity
                  of care.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Tourism Opportunities During Recovery
                </h3>
                <p className="mb-4">
                  India offers the unique advantage of combining medical treatment
                  with tourism. Patients often extend their stay to explore India&apos;s
                  rich cultural heritage, visit iconic monuments like the Taj Mahal,
                  experience traditional wellness therapies, or relax in scenic
                  destinations during their recovery period. This combination of
                  healthcare and tourism creates a holistic healing experience.
                </p>

                <p className="mt-8 mb-4">
                  <strong>Ready to explore medical tourism in India?</strong> Contact
                  Manal Healthcare today for personalized treatment planning, cost
                  estimates, and comprehensive support throughout your medical
                  journey. Our team of experienced coordinators will ensure you
                  receive world-class healthcare in a safe, comfortable, and
                  affordable manner.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Medical Tourism Journey to India Today
              </h2>
              <p className="text-xl text-green-50 mb-8">
                Get personalized treatment plans, cost estimates, visa assistance,
                and 24/7 support from our expert medical tourism coordinators
              </p>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call: +91 123 456 7890
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Consultation
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 xs:gap-5 sm:gap-6 lg:gap-8 text-green-50">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5" />
                  <span>JCI Accredited Hospitals</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default MedicalTourismIndiaPage;

// Data
const keyStatistics: Statistic[] = [
  {
    icon: <Users className="w-7 h-7" />,
    value: "2M+",
    label: "Annual International Patients",
    trend: "+15% YoY",
  },
  {
    icon: <Building2 className="w-7 h-7" />,
    value: "500+",
    label: "JCI Accredited Hospitals",
  },
  {
    icon: <DollarSign className="w-7 h-7" />,
    value: "60-90%",
    label: "Cost Savings",
    trend: "vs USA/UK",
  },
  {
    icon: <Star className="w-7 h-7" />,
    value: "95%+",
    label: "Patient Satisfaction Rate",
  },
];

const benefits: Benefit[] = [
  {
    icon: <DollarSign className="w-6 h-6" />,
    title: "Unmatched Affordability",
    description:
      "Save 60-90% on medical procedures compared to Western countries without compromising on quality of care.",
    highlight: "Average savings: $50,000+ per treatment",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" />,
    title: "JCI & NABH Accredited Facilities",
    description:
      "Access to 500+ internationally accredited hospitals with state-of-the-art infrastructure and technology.",
    highlight: "International quality standards guaranteed",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "World-Class Medical Experts",
    description:
      "Highly qualified doctors trained at top global institutions with extensive international experience.",
    highlight: "50,000+ specialist doctors",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Zero Waiting Time",
    description:
      "Immediate treatment availability without months-long waiting lists common in many countries.",
    highlight: "Start treatment within days",
  },
  {
    icon: <Globe2 className="w-6 h-6" />,
    title: "English-Speaking Staff",
    description:
      "Seamless communication with doctors and staff who are fluent in English and multiple other languages.",
    highlight: "15+ languages supported",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Comprehensive Patient Care",
    description:
      "End-to-end support including visa assistance, accommodation, travel coordination, and post-treatment follow-up.",
    highlight: "24/7 dedicated support",
  },
];

const medicalSpecialties: Specialty[] = [
  {
    icon: <HeartPulse className="w-8 h-8" />,
    title: "Cardiac Surgery",
    description:
      "World-renowned cardiac care with advanced technology and experienced surgeons.",
    procedures: [
      "Coronary Artery Bypass",
      "Heart Valve Replacement",
      "Pediatric Cardiac Surgery",
      "Heart Transplant",
    ],
    successRate: "98.5%",
  },
  {
    icon: <Bone className="w-8 h-8" />,
    title: "Orthopedics",
    description:
      "Leading-edge orthopedic treatments including joint replacements and sports medicine.",
    procedures: [
      "Knee Replacement",
      "Hip Replacement",
      "Spine Surgery",
      "Sports Injury Treatment",
    ],
    successRate: "97%",
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Oncology",
    description:
      "Comprehensive cancer care with latest radiation therapy and chemotherapy protocols.",
    procedures: [
      "Radiation Therapy",
      "Chemotherapy",
      "Immunotherapy",
      "Surgical Oncology",
    ],
    successRate: "85%",
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Neurosurgery",
    description:
      "Advanced neurological treatments with minimally invasive techniques.",
    procedures: [
      "Brain Tumor Surgery",
      "Spine Surgery",
      "Epilepsy Treatment",
      "Stroke Management",
    ],
    successRate: "95%",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Ophthalmology",
    description:
      "Cutting-edge eye care including LASIK and cataract surgeries.",
    procedures: [
      "LASIK Surgery",
      "Cataract Surgery",
      "Retina Treatment",
      "Glaucoma Management",
    ],
    successRate: "99%",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Fertility Treatments",
    description:
      "High success rate fertility treatments with personalized care protocols.",
    procedures: [
      "IVF Treatment",
      "IUI Procedures",
      "Egg Freezing",
      "Surrogacy Services",
    ],
    successRate: "65%",
  },
];

const topDestinations: Destination[] = [
  {
    city: "Delhi NCR",
    description:
      "India's capital region hosts premier hospitals with every medical specialty.",
    hospitals: 150,
    specialties: [
      "Cardiac Care",
      "Oncology",
      "Orthopedics",
      "Neurosurgery",
      "Transplants",
    ],
  },
  {
    city: "Mumbai",
    description:
      "Financial capital with advanced healthcare infrastructure and renowned specialists.",
    hospitals: 120,
    specialties: [
      "Cancer Treatment",
      "Cosmetic Surgery",
      "Fertility",
      "Cardiac Care",
    ],
  },
  {
    city: "Chennai",
    description:
      "Healthcare hub known for excellence in cardiac care and multi-organ transplants.",
    hospitals: 100,
    specialties: ["Heart Surgery", "Liver Transplant", "Kidney Transplant", "Oncology"],
  },
  {
    city: "Bangalore",
    description:
      "Technology-driven medical city with state-of-the-art robotic surgery capabilities.",
    hospitals: 80,
    specialties: ["Robotic Surgery", "Neurosurgery", "Orthopedics", "Pediatrics"],
  },
  {
    city: "Hyderabad",
    description:
      "Emerging medical tourism destination with cost-effective quality healthcare.",
    hospitals: 70,
    specialties: ["Cardiac Care", "Ophthalmology", "Dental", "Orthopedics"],
  },
  {
    city: "Pune",
    description:
      "Growing healthcare center with focus on specialized treatments and wellness.",
    hospitals: 60,
    specialties: ["Joint Replacement", "Spine Surgery", "IVF", "Wellness"],
  },
];

const costComparison = [
  {
    procedure: "Heart Bypass Surgery (CABG)",
    india: "$7,000",
    usa: "$75,000",
    uk: "$50,000",
    savings: "90%",
  },
  {
    procedure: "Total Knee Replacement",
    india: "$5,500",
    usa: "$50,000",
    uk: "$35,000",
    savings: "89%",
  },
  {
    procedure: "Hip Replacement Surgery",
    india: "$6,000",
    usa: "$45,000",
    uk: "$30,000",
    savings: "87%",
  },
  {
    procedure: "Spinal Fusion Surgery",
    india: "$6,500",
    usa: "$110,000",
    uk: "$40,000",
    savings: "94%",
  },
  {
    procedure: "Liver Transplant",
    india: "$35,000",
    usa: "$575,000",
    uk: "$200,000",
    savings: "94%",
  },
  {
    procedure: "IVF Treatment (per cycle)",
    india: "$3,000",
    usa: "$15,000",
    uk: "$10,000",
    savings: "80%",
  },
  {
    procedure: "Cataract Surgery (both eyes)",
    india: "$1,500",
    usa: "$6,000",
    uk: "$4,500",
    savings: "75%",
  },
  {
    procedure: "Dental Implants (per tooth)",
    india: "$800",
    usa: "$4,500",
    uk: "$3,000",
    savings: "82%",
  },
];

const patientTestimonials: Testimonial[] = [
  {
    name: "Ahmed Al-Sayed",
    country: "United Arab Emirates",
    treatment: "Cardiac Bypass Surgery",
    rating: 5,
    testimonial:
      "The medical care I received in India was exceptional. The cardiac surgeon was highly experienced, and the hospital facilities were world-class. I saved over $60,000 compared to treatment in the USA, and the outcomes were outstanding.",
    date: "December 2025",
  },
  {
    name: "Margaret Williams",
    country: "United Kingdom",
    treatment: "Bilateral Knee Replacement",
    rating: 5,
    testimonial:
      "After waiting 2 years in the NHS queue, I chose India for my knee replacement. Within 2 weeks, I had my surgery at a fraction of the UK private cost. The physiotherapy and rehabilitation were excellent. I'm walking pain-free now!",
    date: "November 2025",
  },
  {
    name: "John Peterson",
    country: "United States",
    treatment: "Spinal Fusion Surgery",
    rating: 5,
    testimonial:
      "I was quoted $150,000 for spinal surgery in the US. Got the same procedure in India for $8,000 with the same quality. The surgeon was trained at Johns Hopkins. This saved my finances and my health!",
    date: "October 2025",
  },
  {
    name: "Li Wei",
    country: "China",
    treatment: "IVF Treatment",
    rating: 5,
    testimonial:
      "After multiple failed attempts in China, we came to India for IVF. The personalized care, advanced technology, and success on our first cycle was a dream come true. We are now proud parents of twins!",
    date: "September 2025",
  },
  {
    name: "Natasha Ivanova",
    country: "Russia",
    treatment: "Cosmetic Surgery",
    rating: 5,
    testimonial:
      "I had multiple cosmetic procedures done in Mumbai. The results are natural and beautiful. The surgeon's expertise and attention to detail were impressive. Post-operative care was thorough and professional.",
    date: "August 2025",
  },
  {
    name: "David O'Connor",
    country: "Australia",
    treatment: "Dental Implants",
    rating: 5,
    testimonial:
      "Needed 6 dental implants which would have cost me $27,000 in Australia. Got everything done in India for $5,000 including flights and accommodation. The dental clinic was ultra-modern and the dentist was excellent.",
    date: "July 2025",
  },
];

const processSteps = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Consultation",
    description:
      "Share your medical history and get expert opinion within 48 hours",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Planning",
    description:
      "Receive detailed treatment plan, cost estimate, and travel arrangements",
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Travel",
    description: "Visa assistance, flight booking, and airport pickup arranged",
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Treatment",
    description:
      "Receive world-class medical care with 24/7 coordinator support",
  },
];

const qualityStandards = [
  {
    icon: <Award className="w-8 h-8" />,
    title: "JCI Accreditation",
    description:
      "Joint Commission International certification ensuring global quality standards",
  },
  {
    icon: <BadgeCheck className="w-8 h-8" />,
    title: "NABH Certified",
    description:
      "National Accreditation Board certification for healthcare excellence",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "ISO Compliance",
    description: "International standards for quality management and patient safety",
  },
];
