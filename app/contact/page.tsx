import { ContactHero } from './components/ContactHero';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { ContactFAQ } from './components/ContactFAQ';
import { SocialConnect } from './components/SocialConnect';

export const metadata = {
  title: 'Contact Us - Get in Touch with Manal Healthcare | 24/7 Support',
  description: 'Contact Manal Healthcare for appointments, inquiries, or support. Call (00) 875 784 5682, email info@manalhealthcare.com, or visit us at 238 Arimantab, Moska. 24/7 emergency services available.',
  keywords: 'contact manal healthcare, healthcare contact, book appointment, emergency services, patient support, healthcare inquiries, hospital contact',
  openGraph: {
    title: 'Contact Manal Healthcare',
    description: 'Get in touch with our healthcare team. Available 24/7 for your medical needs.',
    type: 'website',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ContactHero />
      
      {/* Main Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            
            {/* Contact Info - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <ContactFAQ />
      <SocialConnect />

      {/* Additional SEO Content */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Why Contact Manal Healthcare?
            </h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>
                At Manal Healthcare, we understand that your health concerns don't follow a 9-to-5 schedule. 
                That's why we're committed to being accessible when you need us most. Our dedicated team of 
                healthcare professionals is ready to assist you with appointment scheduling, medical inquiries, 
                patient support, and emergency care services.
              </p>
              <p>
                Whether you're a new patient looking to establish care, an existing patient with questions about 
                your treatment plan, or someone seeking information about our services, we're here to help. Our 
                multi-channel support system ensures you can reach us through your preferred method of communication 
                - whether that's phone, email, or our online contact form.
              </p>
              <p>
                For urgent medical situations, our 24/7 emergency department is always staffed with experienced 
                physicians and nurses ready to provide immediate care. For non-emergency inquiries, our customer 
                service team typically responds within 24 hours during business days.
              </p>
              <p>
                We value your time and strive to make healthcare access as convenient as possible. Our location 
                in Moska is easily accessible with ample parking, and we offer extended hours to accommodate 
                various schedules. We also provide telemedicine options for many types of consultations, allowing 
                you to receive quality care from the comfort of your home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
