import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How do I prepare for this treatment?',
    answer: 'Your doctor will provide specific pre-treatment instructions, which may include fasting, medication adjustments, and arranging transportation. A pre-procedure consultation will ensure you\'re fully prepared.',
  },
  {
    question: 'Is this treatment covered by insurance?',
    answer: 'Most major insurance plans cover medically necessary procedures. Our billing team will verify your coverage and discuss any out-of-pocket costs before scheduling your treatment.',
  },
  {
    question: 'What is the recovery time?',
    answer: 'Recovery varies by individual and treatment complexity. Your physician will provide a detailed recovery timeline and post-treatment care instructions tailored to your specific needs.',
  },
  {
    question: 'Will I need follow-up appointments?',
    answer: 'Yes, follow-up appointments are essential to monitor your recovery and ensure optimal results. The frequency depends on the procedure and your individual progress.',
  },
  {
    question: 'Are there any risks or side effects?',
    answer: 'All medical procedures carry some risk. Your doctor will discuss potential complications and side effects during your consultation so you can make an informed decision.',
  },
  {
    question: 'Can I return to work immediately?',
    answer: 'Return to work timing depends on the procedure type and your job requirements. Some treatments allow same-day return, while others require rest periods.',
  },
];

export default function TreatmentFAQ() {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00]/10 rounded-2xl mb-4">
              <HelpCircle className="w-8 h-8 text-[#209f00]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Common questions about this treatment
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#209f00]/30 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 hover:text-[#209f00] transition-colors">
                  <span className="text-lg pr-8">{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-gray-500 shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center p-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our medical team is here to help answer any concerns
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#209f00] text-white rounded-full font-semibold hover:bg-[#1a8000] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
