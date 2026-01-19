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
  doctorImage = "/doctor-img2 1.png",
  ctaButtonText = "Get a quote",
  newsletterBadge = "Subscribe to Newsletter",
  newsletterHeading = "Let's Subscribe to Get Our Newsletter.",
  newsletterDescription = "Experience comprehensive healthcare at Meca, where your well-being is our priority. We provide personalized, compassionate medical services, ensuring exceptional care tailored to your",
  emailPlaceholder = "Your email address",
  subscribeButtonText = "Subscribe Now",
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing with email:", email);
  };

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Side - Doctor Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
              <Image
                src={doctorImage}
                alt={doctorName}
                width={600}
                height={600}
                className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/90 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                <p className="text-xs sm:text-sm font-medium text-gray-800">
                  {doctorExperience}
                </p>
              </div>

              {/* Doctor Heading and CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 lg:mb-6">
                  {doctorHeading}
                </h3>
                <Button
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 text-xs sm:text-sm lg:text-base font-medium h-auto w-full sm:w-auto"
                >
                  {ctaButtonText}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
            className="space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                {newsletterBadge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {newsletterHeading}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {newsletterDescription}
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="mt-4 sm:mt-6 lg:mt-8">
              <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0">
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 sm:h-14 lg:h-16 rounded-full sm:rounded-full pl-4 sm:pl-6 pr-4 sm:pr-40 lg:pr-48 text-sm sm:text-base border-gray-200 focus:border-green-500 focus:ring-green-500 w-full"
                />
                <Button
                  type="submit"
                  className="sm:absolute sm:right-2 sm:top-1/2 sm:-translate-y-1/2 bg-[#209F00] hover:bg-green-700 text-white rounded-full px-4 sm:px-6 py-3 h-10 sm:h-10 lg:h-12 font-medium text-sm sm:text-base w-full sm:w-auto"
                >
                  {subscribeButtonText}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
