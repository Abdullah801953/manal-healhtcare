"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// SEO FAQ data
const faqs = [
  {
    question: "What is Medical Tourism in India?",
    answer:
      "Medical Tourism in India allows patients from around the world to access high-quality medical treatments, top hospitals, and experienced doctors at affordable costs. Manal Healthcare organizes your entire medical journey seamlessly.",
  },
  {
    question: "How can I find top hospitals and doctors through Manal Healthcare?",
    answer:
      "Manal Healthcare connects you with certified hospitals and highly experienced doctors across India. You can browse hospitals, read patient reviews, and book appointments directly through our platform.",
  },
  {
    question: "Are the medical treatments affordable?",
    answer:
      "Our medical tourism services are cost-effective without compromising quality. Compare treatment packages and choose one that suits your budget and needs.",
  },
  {
    question: "Does Manal Healthcare assist with travel and accommodation?",
    answer:
      "We provide end-to-end support including visa guidance, travel arrangements, airport transfers, and hospital stays to make your medical journey stress-free.",
  },
  {
    question: "How do I get started with Manal Healthcare?",
    answer:
      "Contact us via our website or phone, and our team will guide you through selecting the right hospital, doctor, and treatment plan tailored to your needs.",
  },
  {
    question: "Is it safe to travel to India for medical treatment?",
    answer:
      "India has internationally accredited hospitals and experienced medical staff. We provide travel safety guidelines and local assistance to ensure a safe experience.",
  },
  {
    question: "Which medical specialties does Manal Healthcare cover?",
    answer:
      "We cover a wide range of specialties including Cardiology, Orthopedics, Neuro Surgery, Dental Care, Ophthalmology, Prenatal Care, and more.",
  },
  {
    question: "Can I get a cost estimate before traveling?",
    answer:
      "Our team provides detailed treatment cost estimates, including hospital fees, doctor charges, and optional travel assistance, so you can plan your medical trip in advance.",
  },
  {
    question: "How long does it take to arrange treatment in India?",
    answer:
      "Depending on the procedure and hospital availability, we typically arrange appointments and travel within 1-2 weeks. Our team ensures a smooth, quick process.",
  },
  {
    question: "Does Manal Healthcare support international patients?",
    answer:
      "We specialize in assisting international patients with treatment, travel, accommodation, and post-treatment follow-up. Your comfort and safety are our priority.",
  },
];

export const FAQSection = () => {
  return (
    <section className="container mx-auto px-4 py-12" aria-labelledby="faq-heading">
      {/* Section Heading */}
      <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
        Frequently Asked Questions
      </h2>

      {/* ShadCN Accordion */}
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="border rounded-md">
            <AccordionTrigger className="text-left text-lg font-semibold text-gray-900">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 mt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }),
        }}
      />
    </section>
  );
};
