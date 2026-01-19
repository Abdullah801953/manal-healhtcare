"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

// Feature item type
export interface Feature {
  id: number;
  text: string;
}

// About section props
interface AboutSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  features?: Feature[];
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  phoneNumber?: string;
  phoneLabel?: string;
  showPhone?: boolean;
}

// Default features data
const defaultFeatures: Feature[] = [
  { id: 1, text: "AI-Powered Diagnostics" },
  { id: 2, text: "Real-Time Monitoring" },
  { id: 3, text: "Secure Data Encryption" },
  { id: 4, text: "Evidence-Based Treatment" },
  { id: 5, text: "AI-Powered Diagnostics" },
  { id: 6, text: "Real-Time Monitoring" },
  { id: 7, text: "Secure Data Encryption" },
  { id: 8, text: "Evidence-Based Treatment" },
];

export const AboutSection = ({
  badge = "About Us",
  heading = "Advancing Medical Solutions for Health.",
  description = "Experience comprehensive healthcare at Meca, where your well-being is our priority. We provide personalized, compassionate medical services, ensuring exceptional care tailored to your",
  features = defaultFeatures,
  buttonText = "More About Us",
  buttonLink = "/about",
  imageUrl = "/about-img.png",
  imageAlt = "Medical professionals providing healthcare",
  phoneNumber = "(808) 555-0111",
  phoneLabel = "Need help?",
  showPhone = true,
}: AboutSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  // Split features into two columns
  const leftFeatures = features.slice(0, Math.ceil(features.length / 2));
  const rightFeatures = features.slice(Math.ceil(features.length / 2));

  return (
    <section className="py-12 sm:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Left Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={600}
                height={200}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4 sm:space-y-5 lg:space-y-6"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] font-semibold text-xs sm:text-sm md:text-base"
            >
              {badge}
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-sm sm:text-base leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              {/* Left Column */}
              <div className="space-y-2 sm:space-y-3">
                {leftFeatures.map((feature) => (
                  <FeatureItem key={feature.id} text={feature.text} />
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-2 sm:space-y-3">
                {rightFeatures.map((feature) => (
                  <FeatureItem key={feature.id} text={feature.text} />
                ))}
              </div>
            </motion.div>

            {/* Button and Phone Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 pt-2 sm:pt-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-6 sm:px-8 py-4 sm:py-5 lg:py-6 font-medium transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base w-full sm:w-auto"
              >
                <Link href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {showPhone && (
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#209F00]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{phoneLabel}</p>
                    <Link
                      href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                      className="text-gray-900 font-bold text-base sm:text-lg hover:text-[#209F00] transition-colors"
                    >
                      {phoneNumber}
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Reusable Feature Item Component
interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-[#209F00]" />
      </div>
      <span className="text-gray-700 text-xs sm:text-sm font-medium">{text}</span>
    </div>
  );
};
