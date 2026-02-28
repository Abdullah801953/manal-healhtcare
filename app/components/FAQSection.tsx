"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
const leftFaqs = faqs.filter((_, index) => index % 2 === 0);
const rightFaqs = faqs.filter((_, index) => index % 2 !== 0);
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
      <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-white">
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 xs:mb-6 sm:mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm xs:text-base">Loading FAQs...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-16 lg:py-10 xl:py-24 bg-white" >
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 max-w-8xl" aria-labelledby="faq-heading">
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4 mb-8 xs:mb-10 sm:mb-12">
          <Link href="/contact">
            <Button className="bg-[#209F00] hover:bg-green-700 text-white px-4 xs:px-6 sm:px-8 py-3 xs:py-4 sm:py-6 rounded-full text-xs xs:text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all">
              Get Started
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="border-2 border-[#209F00] text-[#209F00] hover:bg-green-50 px-4 xs:px-6 sm:px-8 py-3 xs:py-4 sm:py-6 rounded-full text-xs xs:text-sm sm:text-base font-medium transition-all">
              Learn More
            </Button>
          </Link>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center py-8 xs:py-10 sm:py-12 bg-gray-50 rounded-xl xs:rounded-2xl">
            <p className="text-gray-600 text-sm xs:text-base sm:text-lg">No FAQs available at the moment. Please check back later.</p>
          </div>
        ) : (
          <>
      <div className="grid md:grid-cols-2 gap-4 md:gap-8">

  {/* LEFT COLUMN */}
  <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
    {leftFaqs.map((faq, index) => (
      <AccordionItem
        value={`left-${index}`}
        key={faq._id}
        className="border-0 bg-gray-50 rounded-2xl px-4 sm:px-6 py-2 data-[state=open]:bg-gray-100 transition-colors"
      >
        <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 hover:no-underline py-4">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed pb-4 pt-2">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>

  {/* RIGHT COLUMN */}
  <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
    {rightFaqs.map((faq, index) => (
      <AccordionItem
        value={`right-${index}`}
        key={faq._id}
        className="border-0 bg-gray-50 rounded-2xl px-4 sm:px-6 py-2 data-[state=open]:bg-gray-100 transition-colors"
      >
        <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 hover:no-underline py-4">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed pb-4 pt-2">
          {faq.answer}
        </AccordionContent>
        </AccordionItem>
    ))}
  </Accordion>

</div>

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
