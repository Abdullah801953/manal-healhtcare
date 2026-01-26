"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

export const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch('/api/faqs');
        const data = await response.json();
        
        if (data.success) {
          // Filter only active FAQs and sort by order
          const activeFAQs = data.data
            .filter((faq: FAQ) => faq.isActive)
            .sort((a: FAQ, b: FAQ) => a.order - b.order);
          setFaqs(activeFAQs);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) {
    return (
      <section className="py-12 sm:py-14 lg:py-16 xl:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Loading FAQs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10" aria-labelledby="faq-heading">
        {/* Section Heading */}
        <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900">
          Frequently Asked Questions
        </h2>

        {faqs.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No FAQs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <>
            {/* ShadCN Accordion */}
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={faq._id} className="border rounded-md p-0.5">
              <AccordionTrigger className="text-left text-sm sm:text-base md:text-md font-semibold text-gray-900 px-2 sm:px-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 mt-2 text-xs sm:text-sm px-2 sm:px-4">
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
          </>
        )}
      </div>
    </section>
  );
};
