import { Metadata } from "next";
import {
  Plane,
  FileText,
  Hotel,
  Calendar,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Users,
  Stethoscope,
  CreditCard,
  Shield,
  Briefcase,
  Car,
  Globe,
  Award,
  DollarSign,
  HeartPulse,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Plan Your Medical Travel to India 2026 | Complete Guide - Manal Healthcare",
  description:
    "Plan your medical tourism journey to India with our comprehensive 2026 guide. Expert assistance with visa, accommodation, hospital selection, travel arrangements & 24/7 support. Save up to 70% on medical treatments.",
  keywords: [
    "medical tourism India",
    "plan medical travel India",
    "medical visa India",
    "healthcare travel guide",
    "hospital accommodation India",
    "medical tourism planning",
    "international patient services",
    "affordable medical treatment India",
    "medical travel coordinator",
    "India hospital packages",
    "medical tourism assistance",
    "patient travel services",
  ],
  authors: [{ name: "Manal Healthcare" }],
  openGraph: {
    title: "Plan Your Medical Travel to India 2026 - Complete Guide",
    description:
      "Comprehensive guide to medical tourism in India. Expert planning, visa assistance, accommodation, and 24/7 support for international patients.",
    type: "website",
    locale: "en_US",
    siteName: "Manal Healthcare",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Medical Travel to India - Manal Healthcare",
    description:
      "Complete guide to planning your medical tourism journey to India with expert assistance and 24/7 support.",
  },
  alternates: {
    canonical: "https://manalhealthcare.com/info/plan-your-travel",
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

const PlanYourTravelPage = () => {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            name: "Manal Healthcare - Medical Tourism",
            description:
              "Complete medical tourism planning and assistance for international patients traveling to India",
            url: "https://manalhealthcare.com/info/plan-your-travel",
            telephone: "+91-123-456-7890",
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
            },
            areaServed: "Worldwide",
            availableLanguage: [
              "English",
              "Arabic",
              "French",
              "Spanish",
              "Russian",
            ],
            priceRange: "$$$",
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Medical Tourism Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Medical Travel Planning",
                    description:
                      "Complete assistance with medical travel planning, visa, accommodation, and treatment coordination",
                  },
                },
              ],
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <Plane className="w-12 h-12" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Plan Your Medical Travel to India 2026
              </h1>
              <p className="text-xl md:text-2xl text-green-50 mb-8">
                Complete Medical Tourism Planning Guide - Expert Visa Assistance,
                Hospital Selection, Accommodation & 24/7 Patient Support Services
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  Start Planning
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Download Travel Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-white border-b">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Travel Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600">Partner Hotels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  100%
                </div>
                <div className="text-gray-600">Visa Assistance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  15+
                </div>
                <div className="text-gray-600">Languages</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose India for Medical Tourism */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Why Choose India for Medical Tourism?
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  India has emerged as a global leader in medical tourism,
                  attracting over 2 million international patients annually with
                  world-class healthcare at affordable prices
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {whyIndiaReasons.map((reason, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-lg transition-all"
                  >
                    <CardHeader>
                      <div className="bg-green-100 text-green-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        {reason.icon}
                      </div>
                      <CardTitle className="text-lg">{reason.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{reason.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                  Cost Comparison: India vs Other Countries
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-green-600">
                        <th className="text-left py-4 px-4 font-semibold text-gray-900">
                          Procedure
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          India
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          USA
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-gray-900">
                          UK
                        </th>
                        <th className="text-center py-4 px-4 font-semibold text-green-600">
                          Savings
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {costComparison.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-4 px-4 font-medium text-gray-800">
                            {item.procedure}
                          </td>
                          <td className="text-center py-4 px-4 text-green-600 font-semibold">
                            {item.india}
                          </td>
                          <td className="text-center py-4 px-4 text-gray-600">
                            {item.usa}
                          </td>
                          <td className="text-center py-4 px-4 text-gray-600">
                            {item.uk}
                          </td>
                          <td className="text-center py-4 px-4 text-green-600 font-bold">
                            {item.savings}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-gray-600 mt-6 text-sm">
                  *Approximate costs. Actual prices may vary based on hospital and
                  specific requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Planning Steps */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Journey in 6 Simple Steps
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We make your medical travel seamless from start to finish
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {travelSteps.map((step, index) => (
                <Card
                  key={index}
                  className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 text-green-600 rounded-full p-3 flex-shrink-0">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Step {index + 1}
                          </span>
                          <CardTitle className="text-xl">
                            {step.title}
                          </CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {step.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation Requirements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Required Documentation
                </h2>
                <p className="text-lg text-gray-600">
                  Ensure you have all necessary documents for a smooth journey
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentationRequired.map((doc, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="bg-green-100 text-green-600 p-3 rounded-lg w-fit mb-3">
                        {doc.icon}
                      </div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {doc.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <span className="text-green-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services We Provide */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Services We Provide
                </h2>
                <p className="text-lg text-gray-600">
                  Comprehensive support throughout your medical journey
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesProvided.map((service, index) => (
                  <Card
                    key={index}
                    className="text-center hover:shadow-xl transition-all duration-300 border-2 hover:border-green-500"
                  >
                    <CardHeader>
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        {service.icon}
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Accommodation Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Hotel className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Accommodation Options
                </h2>
                <p className="text-lg text-gray-600">
                  Comfortable stays near top hospitals at every budget
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {accommodationOptions.map((option, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl text-center">
                        {option.type}
                      </CardTitle>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {option.price}
                        </div>
                        <div className="text-gray-600 text-sm">per night</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">
                        Book Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Essential Travel Tips for Medical Tourists
                </h2>
                <p className="text-lg text-gray-600">
                  Important information for international patients traveling to India
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {travelTips.map((tip, index) => (
                  <Card
                    key={index}
                    className="border-l-4 border-green-600 hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                          {tip.icon}
                        </div>
                        {tip.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{tip.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Success Stories from International Patients
                </h2>
                <p className="text-lg text-gray-600">
                  Real experiences from patients who traveled to India for medical
                  treatment
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {successStories.map((story, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {story.initial}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{story.name}</CardTitle>
                          <p className="text-sm text-gray-600">{story.country}</p>
                        </div>
                      </div>
                      <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700 font-medium w-fit">
                        {story.treatment}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 italic mb-4">"{story.quote}"</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>Verified Patient</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Guide Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Complete Medical Travel Planning Guide
                </h2>
                <p className="text-lg text-gray-600">
                  Everything you need to know about planning your medical journey
                </p>
              </div>

              <div className="space-y-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      Before You Travel: Preparation Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">
                        Medical Preparation (2-3 Months Before)
                      </h4>
                      <ul className="space-y-2 ml-4">
                        {beforeTravelChecklist.medical.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">
                        Travel Arrangements (1-2 Months Before)
                      </h4>
                      <ul className="space-y-2 ml-4">
                        {beforeTravelChecklist.travel.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-gray-900">
                        Final Preparations (1-2 Weeks Before)
                      </h4>
                      <ul className="space-y-2 ml-4">
                        {beforeTravelChecklist.final.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      During Your Stay: What to Expect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {duringStayInfo.map((info, idx) => (
                        <div key={idx} className="border-l-4 border-green-600 pl-4">
                          <h4 className="font-semibold text-lg mb-2 text-gray-900">
                            {info.title}
                          </h4>
                          <p className="text-gray-700">{info.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600">
                  Common questions about medical travel planning to India
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-2 border-gray-200 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left hover:text-green-600 py-4">
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-700 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Medical Travel Journey to India?
              </h2>
              <p className="text-xl text-green-50 mb-8">
                Our experienced medical travel coordinators are available 24/7 to
                assist you with planning every aspect of your medical tourism trip.
                Get personalized treatment plans, visa assistance, and complete
                travel support.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +91 123 456 7890
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Schedule a Consultation
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center gap-2 text-green-50">
                <Shield className="w-5 h-5" />
                <span>100% Secure & Confidential</span>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <article>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Medical Tourism in India: A Complete Planning Guide for 2026
                </h2>
                
                <p className="text-gray-700 mb-4">
                  Planning your medical travel to India requires careful
                  consideration and preparation. India has become one of the
                  world's most preferred destinations for medical tourism,
                  offering world-class healthcare facilities at a fraction of the
                  cost compared to Western countries. With state-of-the-art
                  hospitals, internationally trained doctors, and comprehensive
                  patient care services, India provides exceptional value for
                  international patients.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Understanding Medical Visa Requirements for India
                </h3>
                <p className="text-gray-700 mb-4">
                  International patients traveling to India for medical treatment
                  need to apply for a Medical Visa (M Visa) or Medical Attendant
                  Visa (MX Visa) for companions. The medical visa is typically
                  granted for up to 60 days and can be extended based on medical
                  requirements. Our team provides complete assistance with the
                  visa application process, including invitation letters from
                  hospitals and documentation support.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Choosing the Right Hospital and Doctor in India
                </h3>
                <p className="text-gray-700 mb-4">
                  India boasts numerous JCI-accredited and NABH-certified
                  hospitals with cutting-edge medical technology and highly
                  qualified specialists. When planning your medical travel, we
                  help you select the most suitable hospital based on your
                  specific treatment needs, budget, and location preferences. Our
                  network includes top hospitals in major cities like Delhi,
                  Mumbai, Chennai, Bangalore, and Hyderabad.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Cost-Effective Healthcare Without Compromising Quality
                </h3>
                <p className="text-gray-700 mb-4">
                  One of the primary reasons international patients choose India
                  for medical tourism is the significant cost savings - typically
                  60-80% lower than prices in the USA, UK, or Europe. This cost
                  advantage extends across all medical procedures including
                  cardiac surgery, orthopedic treatments, cosmetic surgery, dental
                  procedures, fertility treatments, and cancer care. The lower
                  costs do not reflect lower quality; Indian hospitals maintain
                  international standards and employ highly experienced medical
                  professionals.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Comprehensive Travel and Accommodation Support
                </h3>
                <p className="text-gray-700 mb-4">
                  Planning medical travel involves more than just booking
                  flights. Our comprehensive services include airport pickup and
                  drop-off, accommodation arrangements near hospitals, local
                  transportation, language interpretation services, and 24/7
                  patient coordinator support. We ensure your entire journey -
                  from arrival in India to your departure after treatment - is
                  comfortable and stress-free.
                </p>

                <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                  Post-Treatment Care and Follow-up Services
                </h3>
                <p className="text-gray-700 mb-4">
                  Quality medical tourism doesn't end when treatment is complete.
                  We provide comprehensive post-treatment care including
                  follow-up consultations, medication guidance, recovery
                  monitoring, and telemedicine services after you return home.
                  This ensures continuity of care and peace of mind throughout
                  your recovery journey.
                </p>

                <p className="text-gray-700 mt-8">
                  <strong>Contact Manal Healthcare today</strong> to start
                  planning your medical travel to India. Our experienced team
                  will guide you through every step of the process, ensuring a
                  safe, comfortable, and successful medical tourism experience.
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PlanYourTravelPage;

// Data
const travelSteps = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Initial Consultation & Medical Records",
    description: "Share your medical history and treatment requirements",
    points: [
      "Submit medical reports and diagnostic results",
      "Complete online consultation form",
      "Receive preliminary medical opinion within 48 hours",
      "Get treatment cost estimate and timeline",
    ],
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Treatment Planning & Scheduling",
    description: "Finalize your treatment plan and travel dates",
    points: [
      "Confirm treatment schedule with assigned doctor",
      "Receive detailed treatment protocol",
      "Book appointment dates and slots",
      "Get personalized travel itinerary",
    ],
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Visa & Travel Documentation",
    description: "Complete assistance with visa and travel formalities",
    points: [
      "Medical visa invitation letter provided",
      "Step-by-step visa application guidance",
      "Airport pickup arrangements confirmed",
      "Travel insurance recommendations",
    ],
  },
  {
    icon: <Plane className="w-6 h-6" />,
    title: "Flight & Accommodation Booking",
    description: "Arrange comfortable travel and stay",
    points: [
      "Flight booking assistance at best rates",
      "Hospital-proximity accommodation options",
      "Airport transfer arrangements",
      "Dietary preference accommodation",
    ],
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Arrival & Treatment",
    description: "Receive comprehensive care during your stay",
    points: [
      "Airport reception and welcome assistance",
      "Hospital admission procedures handled",
      "24/7 patient coordinator support",
      "Language interpretation services",
    ],
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Post-Treatment & Follow-up",
    description: "Continued care after treatment completion",
    points: [
      "Discharge planning and medications",
      "Travel arrangements for return journey",
      "Follow-up consultation schedule",
      "Ongoing telemedicine support",
    ],
  },
];

const documentationRequired = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Travel Documents",
    items: [
      "Valid passport (min. 6 months validity)",
      "Medical visa for India",
      "Travel insurance documents",
      "Flight tickets (confirmed)",
      "Hotel booking confirmation",
    ],
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Medical Records",
    items: [
      "Complete medical history",
      "Recent diagnostic reports",
      "Previous treatment records",
      "Current medication list",
      "Doctor's referral letter",
    ],
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Financial Documents",
    items: [
      "Credit/debit cards",
      "Foreign currency/traveler's cheques",
      "Bank statements (if required)",
      "Travel insurance policy",
      "Emergency contact information",
    ],
  },
];

const servicesProvided = [
  {
    icon: <Plane className="w-7 h-7" />,
    title: "Airport Pickup & Drop",
    description:
      "Complimentary airport transfers with comfortable vehicles and professional drivers",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Personal Coordinator",
    description:
      "Dedicated patient coordinator available 24/7 for all your needs",
  },
  {
    icon: <Phone className="w-7 h-7" />,
    title: "Language Interpreter",
    description:
      "Professional interpreters available in 15+ languages for seamless communication",
  },
  {
    icon: <Hotel className="w-7 h-7" />,
    title: "Accommodation Assistance",
    description:
      "Help with booking hotels, guest houses, or serviced apartments near hospitals",
  },
  {
    icon: <Car className="w-7 h-7" />,
    title: "Local Transportation",
    description:
      "Reliable transport for hospital visits, sightseeing, and daily commutes",
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "City Tours",
    description:
      "Optional guided tours to explore local attractions during recovery period",
  },
];

const accommodationOptions = [
  {
    type: "Budget",
    price: "$30-50",
    features: [
      "Clean and comfortable rooms",
      "Basic amenities included",
      "Within 5km of hospital",
      "24/7 security",
      "WiFi connectivity",
      "Daily housekeeping",
    ],
  },
  {
    type: "Standard",
    price: "$50-100",
    features: [
      "Well-furnished rooms",
      "Air conditioning",
      "Within 2km of hospital",
      "Restaurant on-site",
      "Laundry services",
      "Room service available",
    ],
  },
  {
    type: "Premium",
    price: "$100-200",
    features: [
      "Luxury accommodations",
      "Adjacent to hospital",
      "Full amenities & services",
      "Concierge service",
      "Multiple dining options",
      "Spa and wellness center",
    ],
  },
];

const travelTips = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Best Time to Visit India",
    content:
      "October to March offers pleasant weather across most of India. Avoid monsoon season (June-September) for easier travel. Plan to arrive 2-3 days before treatment for rest and acclimatization.",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Currency & Payments",
    content:
      "Indian Rupee (INR) is the local currency. Major hospitals accept international credit cards. ATMs are widely available. Carry some cash for daily expenses and small vendors.",
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: "Communication & Connectivity",
    content:
      "Get a local SIM card at the airport for easier communication. WhatsApp works well for international calls. Most hotels and hospitals offer free WiFi. English is widely spoken in medical facilities.",
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "What to Pack for Medical Travel",
    content:
      "Comfortable clothing, current medications, complete medical records, power adapters (230V), comfortable shoes, weather-appropriate attire, and copies of important documents. Keep valuables secure.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Travel Insurance",
    content:
      "Purchase comprehensive travel insurance that covers medical emergencies, trip cancellations, and baggage loss. Verify coverage for pre-existing conditions and medical procedures.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Cultural Awareness",
    content:
      "India is culturally diverse. Dress modestly when visiting religious sites. Remove shoes before entering hospitals and homes. Respect local customs and traditions for a pleasant experience.",
  },
];

const whyIndiaReasons = [
  {
    icon: <DollarSign className="w-7 h-7" />,
    title: "Cost Savings",
    description:
      "Save 60-80% on medical procedures compared to USA, UK, or Europe without compromising quality",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "World-Class Hospitals",
    description:
      "JCI-accredited facilities with state-of-the-art technology and internationally trained specialists",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Expert Doctors",
    description:
      "Highly qualified surgeons and specialists with international experience and certifications",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "No Waiting Time",
    description:
      "Immediate treatment availability without long waiting lists common in Western countries",
  },
];

const costComparison = [
  {
    procedure: "Heart Bypass Surgery",
    india: "$7,000",
    usa: "$75,000",
    uk: "$50,000",
    savings: "Up to 90%",
  },
  {
    procedure: "Knee Replacement",
    india: "$5,500",
    usa: "$50,000",
    uk: "$35,000",
    savings: "Up to 89%",
  },
  {
    procedure: "Hip Replacement",
    india: "$6,000",
    usa: "$45,000",
    uk: "$30,000",
    savings: "Up to 87%",
  },
  {
    procedure: "Dental Implant (per tooth)",
    india: "$800",
    usa: "$4,500",
    uk: "$3,000",
    savings: "Up to 82%",
  },
  {
    procedure: "IVF Treatment",
    india: "$3,000",
    usa: "$15,000",
    uk: "$10,000",
    savings: "Up to 80%",
  },
  {
    procedure: "Cataract Surgery",
    india: "$1,500",
    usa: "$5,500",
    uk: "$4,000",
    savings: "Up to 73%",
  },
];

const successStories = [
  {
    name: "Mohammed Al-Rahman",
    country: "Saudi Arabia",
    initial: "MA",
    treatment: "Cardiac Surgery",
    quote:
      "The quality of care in India exceeded my expectations. The doctors were highly skilled, and the hospital facilities were world-class. I saved over $50,000 compared to treatment in the USA.",
  },
  {
    name: "Sarah Johnson",
    country: "United Kingdom",
    initial: "SJ",
    treatment: "Knee Replacement",
    quote:
      "From visa assistance to post-surgery care, everything was perfectly organized. No waiting lists, excellent treatment, and I was back home within 3 weeks feeling much better.",
  },
  {
    name: "David Thompson",
    country: "Australia",
    initial: "DT",
    treatment: "Dental Implants",
    quote:
      "I came for dental work and received exceptional treatment at one-fifth of the cost back home. The coordinators made everything seamless from airport pickup to hotel arrangements.",
  },
];

const beforeTravelChecklist = {
  medical: [
    "Consult with your local doctor and get medical clearance for travel",
    "Gather all medical records, test results, and imaging reports",
    "Get digital copies of all documents in PDF format",
    "Share medical history with Indian hospital for preliminary evaluation",
    "Understand the recommended treatment protocol and expected outcomes",
    "Confirm treatment costs and payment methods with the hospital",
  ],
  travel: [
    "Apply for medical visa with invitation letter from Indian hospital",
    "Book flight tickets with flexible date change options",
    "Arrange travel insurance covering medical procedures abroad",
    "Research and book accommodation near the hospital",
    "Inform your local doctor about planned treatment abroad",
    "Arrange for extended leave from work if necessary",
  ],
  final: [
    "Pack all medical documents in carry-on luggage",
    "Carry current medications with prescriptions",
    "Exchange currency or arrange international debit/credit cards",
    "Download offline maps and important contact numbers",
    "Confirm airport pickup and hospital appointment timings",
    "Share travel itinerary with family members",
    "Keep copies of passport and visa in separate bags",
  ],
};

const duringStayInfo = [
  {
    title: "Arrival and Initial Consultation",
    description:
      "Upon arrival, our representative will receive you at the airport and escort you to your accommodation. Within 24-48 hours, you'll have your first consultation with the treating doctor for detailed examination and treatment planning.",
  },
  {
    title: "Pre-Treatment Procedures",
    description:
      "Necessary diagnostic tests and pre-operative assessments will be conducted. This may include blood tests, imaging, and specialist consultations. Your patient coordinator will explain each step and accompany you throughout.",
  },
  {
    title: "Treatment and Hospital Stay",
    description:
      "During your treatment and hospital stay, you'll receive round-the-clock nursing care, regular doctor visits, and assistance with all needs. Family members can stay with you based on hospital policies.",
  },
  {
    title: "Recovery and Post-Treatment Care",
    description:
      "After treatment, you'll receive detailed discharge instructions, medications, and follow-up care guidelines. We'll arrange comfortable recovery accommodation if needed and help with any additional requirements.",
  },
];

const faqs = [
  {
    question: "How long does the medical visa process take for India?",
    answer:
      "The medical visa application process typically takes 3-5 business days. We provide the medical visa invitation letter from the hospital, which is required for the application. Medical visas are usually granted for 60 days initially and can be extended based on medical requirements. We recommend applying at least 2-3 weeks before your planned travel date.",
  },
  {
    question: "What is included in the medical tourism package cost?",
    answer:
      "Our medical tourism packages typically include hospital charges, doctor's fees, accommodation for patient and one attendant, airport transfers, local transportation for hospital visits, patient coordinator services, and visa invitation letter. Flight tickets, meals outside the hospital, and personal expenses are usually separate. We provide detailed cost breakdowns before you commit.",
  },
  {
    question: "Can I bring a family member or attendant with me?",
    answer:
      "Yes, you can bring up to two attendants with you. They will need to apply for a Medical Attendant Visa (MX Visa). We can arrange accommodation for attendants either in the hospital (if permitted) or in nearby hotels. Most of our packages include accommodation for one attendant.",
  },
  {
    question: "Are Indian hospitals internationally accredited?",
    answer:
      "Yes, many hospitals in India are JCI (Joint Commission International) accredited and NABH (National Accreditation Board for Hospitals) certified. These accreditations ensure that hospitals meet international quality and safety standards. We only partner with accredited hospitals that have proven track records with international patients.",
  },
  {
    question: "What if I need to extend my stay beyond the initially planned duration?",
    answer:
      "If medical complications or recovery requires extended stay, we can help you extend your medical visa and arrange continued accommodation. Your patient coordinator will liaise with the hospital and immigration authorities. Additional costs for extended accommodation and care will be communicated transparently.",
  },
  {
    question: "Is language a barrier in Indian hospitals?",
    answer:
      "No, English is widely spoken in all major hospitals in India, especially those catering to international patients. Additionally, we provide interpreter services in over 15 languages including Arabic, Russian, French, Spanish, and others. Hospital staff and doctors are trained to communicate effectively with international patients.",
  },
  {
    question: "How do I make payments for medical treatment in India?",
    answer:
      "Most hospitals accept international credit cards, wire transfers, and cash payments. We recommend carrying a credit card for emergencies. Hospitals typically require an advance payment or deposit before treatment begins. We'll provide detailed payment instructions and assist with all financial transactions to ensure transparency.",
  },
  {
    question: "What happens if there are complications during or after treatment?",
    answer:
      "All our partner hospitals have 24/7 emergency services and experienced medical teams to handle any complications. Your medical insurance should cover emergency complications. We ensure you have access to the best medical care throughout your stay. Post-treatment follow-up is also included, and we arrange telemedicine consultations after you return home.",
  },
  {
    question: "Can I combine medical treatment with tourism in India?",
    answer:
      "Yes, many patients combine medical treatment with tourism, especially during recovery periods. India offers incredible tourist attractions, and we can arrange guided tours once your doctor approves leisure activities. Popular destinations include the Taj Mahal, Kerala backwaters, Rajasthan palaces, and more. We recommend planning light tourism activities after consulting with your treating physician.",
  },
  {
    question: "How do I get my medical records after treatment?",
    answer:
      "Before discharge, you'll receive a comprehensive discharge summary, all test reports, surgical notes, and medications. We provide both physical and digital copies of all medical records. These documents are essential for follow-up care with your local doctor. We also maintain records for future reference and telemedicine consultations.",
  },
];
