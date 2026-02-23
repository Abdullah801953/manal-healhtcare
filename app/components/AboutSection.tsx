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
  { id: 1, text: "AI-Powered Diagnostics" },
  { id: 2, text: "Real-Time Monitoring" },
  { id: 3, text: "Secure Data Encryption" },
  { id: 4, text: "Evidence-Based Treatment" },
  { id: 5, text: "Minimally Invasive Procedures" },
  { id: 6, text: "International Patient Support" },
  { id: 7, text: "Post-Treatment Follow-Up" },
  { id: 8, text: "Affordable Healthcare Packages" },
];

export const AboutSection = ({
  badge = "About Us",
  heading = "Leading Medical Tourism Services for World-Class Healthcare in India",
  description = "At Manal Health Care, our mission is to connect international patients with top-quality healthcare providers in India, making the medical journey easy, safe, and comfortable. We help patients access advanced and affordable medical treatment in India, supported by experienced doctors and leading hospitals.We work closely with trusted hospitals and medical specialists across India and provide complete support, including medical visa assistance and multilingual communication, to ensure a smooth and stress-free experience.",
  features = defaultFeatures,
  buttonText = "More About Us",
  buttonLink = "/about",
  imageUrl = "/about-us-img.png",
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
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const leftFeatures = features.slice(0, Math.ceil(features.length / 2));
  const rightFeatures = features.slice(Math.ceil(features.length / 2));

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  uppercase tracking-wide"
            >
              {badge}
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-md font-semibold leading-snug"
            >
              {heading}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-base sm:text-lg leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
            >
           

             
            </motion.div>

            {/* Button + Phone */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={buttonLink}>
                  {buttonText}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

             <Link href="/contact">
    <button
      className="px-6 py-2 text-sm xl:text-base font-semibold
                 bg-gradient-to-r from-red-600 to-red-600
                 text-white rounded-full shadow-md
                 hover:from-red-700 hover:to-red-700
                 hover:scale-105
                 transition-all duration-300"
    >
      Need Assistance?
    </button>
    </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex justify-center lg:col-span-1"
          >
            <div className="relative w-full max-w-[500px] h-[320px] sm:h-[400px] lg:h-[500px] rounded-[30px] overflow-hidden shadow-2xl">
              
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// Feature Item Component
interface FeatureItemProps {
  text: string;
}

const FeatureItem = ({ text }: FeatureItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0 w-8 h-8 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-sm">
        <Check className="w-5 h-5 text-[#209F00] stroke-[2.5]" />
      </div>
      <span className="text-gray-700 text-base font-medium">
        {text}
      </span>
    </div>
  );
};