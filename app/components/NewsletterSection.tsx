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
    <section className="py-16 md:py-24 px-1 md:px-10 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Doctor Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src={doctorImage}
                alt={doctorName}
                width={600}
                height={600}
                className="w-full h-[500px] object-cover"
              />
              
              {/* Experience Badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-sm font-medium text-gray-800">
                  {doctorExperience}
                </p>
              </div>

              {/* Doctor Heading and CTA */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {doctorHeading}
                </h3>
                <Button
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-full px-8 py-6 text-base font-medium h-auto"
                >
                  {ctaButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
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
            className="space-y-6"
          >
            {/* Badge */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                {newsletterBadge}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {newsletterHeading}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed">
              {newsletterDescription}
            </p>

            {/* Email Form */}
            <form onSubmit={handleSubscribe} className="mt-8">
              <div className="relative">
                <Input
                  type="email"
                  placeholder={emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-16 rounded-full pl-6 pr-48 text-base border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#209F00] hover:bg-green-700 text-white rounded-full px-6 py-3 h-12 font-medium"
                >
                  {subscribeButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
