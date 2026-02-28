"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/app/contexts/SettingsContext";

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
  { id: 1, text: "World-Class Medical Facilities" },
  { id: 2, text: "Board-Certified Specialist Doctors" },
  { id: 3, text: "24/7 Emergency Medical Care" },
  { id: 4, text: "Advanced Diagnostic Technology" },
  { id: 5, text: "Personalized Treatment Plans" },
  { id: 6, text: "International Patient Support" },
  { id: 7, text: "Post-Treatment Care Programs" },
  { id: 8, text: "Multilingual Medical Staff" },
];

export const OurServices = ({
  badge = "Our Services",
 
 
  features = defaultFeatures,
  buttonText = "Our Services",
  buttonLink = "/about",
  imageUrl = "/ourserviceImag.png",
  imageAlt = "Medical professionals providing healthcare",
  phoneLabel = "Need help?",
  showPhone = true,
}: AboutSectionProps) => {
  const { settings } = useSettings();
  const phoneNumber = settings?.sitePhone || "(808) 555-0111";
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
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
          {/* Right Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6 flex flex-col justify-start lg:col-span-2"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  uppercase tracking-wide"
            >
              {badge}
            </motion.p>

            {/* Heading */}
       

            {/* Features Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6 pt-1 xs:pt-2 sm:pt-4"
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
                <div className="flex items-center gap-3 sm:gap-4 justify-center sm:justify-start px-4 sm:px-5 py-3 sm:py-4 rounded-2xl w-full sm:w-auto">
                    <Link href="/contact">
    <button
      className="px-6 py-2 text-sm xl:text-base font-semibold
                 bg-gradient-to-r from-red-600 to-red-600
                 text-white rounded-full shadow-md
                 hover:from-red-700 hover:to-red-700
                 hover:scale-105
                 transition-all duration-300"
    >
      Need help?
    </button>
    </Link>
          
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Left Side - Image */}
       
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
      <span className="text-gray-700 text-xs sm:text-sm font-medium">
        {text}
      </span>
    </div>
  );
};
