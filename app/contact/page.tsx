import { ContactHero } from "./components/ContactHero";
import { ContactForm } from "./components/ContactForm";
import { ContactInfo } from "./components/ContactInfo";
import { SocialConnect } from "./components/SocialConnect";
import { QueryForm } from "../components/QueryForm";

export const metadata = {
  title: "Contact Us - Get in Touch with Manal Healthcare | 24/7 Support",
  description:
    "Contact Manal Healthcare for appointments, inquiries, or support. Call (00) 875 784 5682, email info@manalhealthcare.com, or visit us at 238 Arimantab, Moska. 24/7 emergency services available.",
  keywords:
    "contact manal healthcare, healthcare contact, book appointment, emergency services, patient support, healthcare inquiries, hospital contact, medical consultation, schedule appointment, patient care",
  openGraph: {
    title: "Contact Manal Healthcare - 24/7 Support Available",
    description:
      "Get in touch with our healthcare team. Available 24/7 for your medical needs. Book appointments, inquiries, and emergency support.",
    type: "website",
    images: [
      {
        url: "/doctor-img2 1.png",
        width: 1200,
        height: 630,
        alt: "Contact Manal Healthcare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Manal Healthcare",
    description:
      "Get in touch with our healthcare team. Available 24/7 for your medical needs.",
    images: ["/doctor-img2 1.png"],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="mx-5 lg:mx-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <QueryForm />
            </div>

            {/* Contact Info - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <SocialConnect />

      {/* Additional SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="mx-5 lg:mx-24">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Contact Manal Healthcare?
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                Seeking medical treatment abroad can be overwhelming, but you
                don't have to navigate the journey alone. At Manal Healthcare,
                we are committed to making the process simple, transparent, and
                stress-free.
              </p>
              <p>
                Our team helps patients connect with the right hospitals and
                specialists, schedule appointments, obtain treatment plans, and
                coordinate travel-related arrangements. We work with leading
                healthcare providers to ensure you receive quality care that
                meets your individual needs.
              </p>
              <p>
                From your first inquiry to the completion of your treatment, we
                provide personalized support, prompt communication, and guidance
                at every stage. Our goal is to help you make informed healthcare
                decisions with confidence and peace of mind.
              </p>
              <p>
                Whether you are looking for a second opinion, specialized
                treatment, or a comprehensive health check-up, Manal Healthcare
                is here to support you every step of the way.
              </p>
              <p>
                Manal Healthcare – Your Trusted Partner in Medical Travel and Healthcare Services.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
