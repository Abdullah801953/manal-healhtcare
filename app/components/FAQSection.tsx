"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ Item interface
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Default FAQ data
const defaultFAQs: FAQItem[] = [
  {
    id: "item-1",
    question: "How do you ensure your strategies are effective?",
    answer:
      "We combine in-depth market research, cutting-edge design, and targeted content creation to deliver strategies that generate engagement and drive conversions.",
  },
  {
    id: "item-2",
    question: "Can you help improve our current digital presence?",
    answer:
      "Yes, we analyze your existing digital presence and create customized strategies to enhance your online visibility, engagement, and conversion rates.",
  },
  {
    id: "item-3",
    question: "What makes your approach different?",
    answer:
      "Our approach combines data-driven insights with creative excellence, ensuring every strategy is tailored to your unique business goals and target audience.",
  },
  {
    id: "item-4",
    question: "Who can benefit from your services?",
    answer:
      "Our services are designed for businesses of all sizes looking to enhance their digital presence, from startups to established enterprises across various industries.",
  },
  {
    id: "item-5",
    question: "How involved will we be in the creative process?",
    answer:
      "We believe in collaborative partnerships. You'll be involved at every key stage, providing input and feedback to ensure the final result aligns perfectly with your vision.",
  },
];

interface FAQSectionProps {
  primaryButtonText?: string;
  secondaryButtonText?: string;
  faqs?: FAQItem[];
  defaultOpenItem?: string;
}

export function FAQSection({
  primaryButtonText = "Get Started",
  secondaryButtonText = "Learn More",
  faqs = defaultFAQs,
  defaultOpenItem = "item-1",
}: FAQSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-10 py-6 h-auto text-base font-medium">
            {primaryButtonText}
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-10 py-6 h-auto text-base font-medium"
          >
            {secondaryButtonText}
          </Button>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultOpenItem}
            className="space-y-4"
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-gray-50 rounded-2xl border-none px-6 py-2"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 text-base leading-relaxed pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
