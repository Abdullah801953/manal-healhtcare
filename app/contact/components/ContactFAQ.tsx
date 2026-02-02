'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment by calling our main line at (00) 875 784 5682, using our online booking system on the website, or by visiting our facility in person. Our appointment coordinators are available Monday through Friday, 8 AM to 6 PM.',
    },
    {
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans including Medicare, Medicaid, and private insurance providers. Please contact our billing department at (00) 875 784 5686 to verify your specific insurance coverage before your visit.',
    },
    {
      question: 'Do you offer emergency services?',
      answer: 'Yes, our emergency department is open 24/7, 365 days a year. For life-threatening emergencies, please call 911. For urgent but non-life-threatening situations, you can visit our emergency department or call (00) 875 784 5683.',
    },
    {
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid photo ID, your insurance card, a list of current medications, any relevant medical records, and your medical history. If you have a referral from another physician, please bring that as well.',
    },
    {
      question: 'How can I access my medical records?',
      answer: 'You can request access to your medical records by contacting our Patient Records department at (00) 875 784 5685 or through our secure patient portal. We typically process requests within 2-3 business days.',
    },
    {
      question: 'What are your visiting hours?',
      answer: 'General visiting hours are from 10 AM to 8 PM daily. However, some departments may have different visiting hours. Please check with the specific department or call ahead to confirm visiting hours for your patient.',
    },
    {
      question: 'Do you provide telemedicine consultations?',
      answer: 'Yes, we offer telemedicine consultations for many types of appointments. Virtual visits can be scheduled through our online booking system or by calling our appointment line. Our staff will help determine if a virtual visit is appropriate for your needs.',
    },
    {
      question: 'How long will I wait for my appointment?',
      answer: 'We strive to see all patients on time. However, emergency situations may cause delays. If you anticipate being late, please call us as soon as possible. We recommend arriving 15 minutes early for new patient appointments and 10 minutes early for follow-up visits.',
    },
  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Quick answers to common questions. Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-6 h-6 text-[#209f00] shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
