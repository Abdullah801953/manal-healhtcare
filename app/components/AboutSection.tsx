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
  heading = "Leading Medical Tourism Services for World-Class Healthcare in India",
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
      <div className="px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side - Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex items-center justify-center lg:justify-start lg:col-span-1"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl w-full max-w-xs sm:max-w-sm lg:max-w-md">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={450}
                height={450}
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
            className="space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col justify-start lg:col-span-2"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] font-semibold text-sm sm:text-base uppercase tracking-wide"
            >
              {badge}
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight"
            >
              {heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pt-2 sm:pt-4"
            >
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-5">
                {leftFeatures.map((feature) => (
                  <FeatureItem key={feature.id} text={feature.text} />
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-5">
                {rightFeatures.map((feature) => (
                  <FeatureItem key={feature.id} text={feature.text} />
                ))}
              </div>
            </motion.div>

            {/* Button and Phone Section */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-4 sm:pt-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-6 sm:px-8 lg:px-10 py-5 sm:py-6 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group text-sm sm:text-base w-full sm:w-auto"
              >
                <Link href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {showPhone && (
                <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start bg-gray-50 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl w-full sm:w-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-md">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-[#209F00]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">{phoneLabel}</p>
                    <Link
                      href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                      className="text-gray-900 font-bold text-base sm:text-lg lg:text-xl hover:text-[#209F00] transition-colors"
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
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-sm">
        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#209F00] stroke-[2.5]" />
      </div>
      <span className="text-gray-700 text-sm sm:text-base font-medium">{text}</span>
    </div>
  );
};
