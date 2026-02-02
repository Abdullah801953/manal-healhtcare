"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface NewsletterSectionProps {
  doctorName?: string;
  doctorExperience?: string;
  doctorHeading?: string;
  doctorImage?: string;
  ctaButtonText?: string;
  newsletterBadge?: string;
  newsletterHeading?: string;
  newsletterDescription?: string;
  emailPlaceholder?: string;
  subscribeButtonText?: string;
}

export function NewsletterSection({
  doctorName = "Dr. Rasika",
  doctorExperience = "08+ Years of Experience",
  doctorHeading = "Dr. Rasika Is Dedicated to Helping Others Heal.",
  doctorImage = "/subscribe-img.png",
  ctaButtonText = "Get a quote",
  newsletterBadge = "Subscribe to Newsletter",
  newsletterHeading = "Let's Subscribe to Get Our Newsletter.",
  newsletterDescription = "Experience comprehensive healthcare at Meca, where your well-being is our priority. We provide personalized, compassionate medical services, ensuring exceptional care tailored to your",
  emailPlaceholder = "Your email address",
  subscribeButtonText = "Subscribe Now",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message || 'Successfully subscribed to newsletter!' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to subscribe. Please try again.' });
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Doctor Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden">
              <Image
                src={doctorImage}
                alt={doctorName}
                width={600}
                height={600}
                className="w-full h-[280px] xs:h-[320px] sm:h-[380px] md:h-[420px] lg:h-[500px] object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute top-3 left-3 xs:top-4 xs:left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-sm px-2 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 rounded-full">
                <p className="text-[10px] xs:text-xs sm:text-sm font-medium text-gray-800">
                  {doctorExperience}
                </p>
              </div>

              {/* Doctor Heading and CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-3 xs:p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 lg:mb-6">
                  {doctorHeading}
                </h3>
                <Button
                  variant="secondary"
                  onClick={() => {
                    const queryForm = document.getElementById('query-form');
                    if (queryForm) {
                      queryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-900 rounded-full px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 md:py-3.5 text-xs xs:text-sm sm:text-base font-semibold h-auto shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-1.5 xs:gap-2 cursor-pointer"
                >
                  {ctaButtonText}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {/* Badge */}
            <div className="flex items-center gap-1.5 xs:gap-2">
              <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="h-3.5 w-3.5 xs:h-4 xs:w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium text-xs xs:text-sm sm:text-base">
                {newsletterBadge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {newsletterHeading}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-xs xs:text-sm sm:text-base leading-relaxed">
              {newsletterDescription}
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="mt-3 xs:mt-4 sm:mt-6 lg:mt-8">
              <div className="relative flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-0">
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="h-10 xs:h-12 sm:h-14 lg:h-16 rounded-full sm:rounded-full pl-3 xs:pl-4 sm:pl-6 pr-3 xs:pr-4 sm:pr-40 lg:pr-48 text-xs xs:text-sm sm:text-base border-gray-200 focus:border-green-500 focus:ring-green-500 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-[#209F00] hover:bg-green-700 text-white rounded-full px-3 xs:px-4 sm:px-6 py-2 xs:py-3 h-9 xs:h-10 sm:h-10 lg:h-12 font-medium text-xs xs:text-sm sm:text-base w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      {subscribeButtonText}
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </>
                  )}
                </Button>
              </div>
              {/* Success/Error Message */}
              {message && (
                <div className={`mt-3 p-3 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.text}
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
