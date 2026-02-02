"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

// Treatment type
export interface TreatmentItem {
  id: number;
  name: string;
  icon: string;
  description: string;
  link: string;
}

// Default treatments data
const defaultTreatments: TreatmentItem[] = [
  {
    id: 1,
    name: "Bone Marrow Transplant",
    icon: "🩺",
    description: "Advanced stem cell therapy for blood disorders and cancers with expert medical care.",
    link: "/treatments/bone-marrow-transplant",
  },
  {
    id: 2,
    name: "Cardiac Surgery",
    icon: "❤️",
    description: "Comprehensive heart treatments including bypass surgery and valve replacements.",
    link: "/treatments/cardiac-surgery",
  },
  {
    id: 3,
    name: "Oncology Treatment",
    icon: "🎗️",
    description: "State-of-the-art cancer care with personalized treatment protocols.",
    link: "/treatments/oncology",
  },
  {
    id: 4,
    name: "Organ Transplant",
    icon: "🫀",
    description: "World-class organ transplant services with experienced specialists.",
    link: "/treatments/organ-transplant",
  },
];

interface TreatmentShowcaseProps {
  badge?: string;
  heading?: string;
  treatments?: TreatmentItem[];
  imageUrl?: string;
  imageAlt?: string;
}

export const LabTestBooking = ({
  badge = "Medical Treatments",
  heading = "Specialized Medical Treatments with Expert Care",
  treatments = defaultTreatments,
  imageUrl = "/treatment-img.png",
  imageAlt = "Medical professionals providing treatment",
}: TreatmentShowcaseProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleTests = 2; // Number of cards to show at once

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, treatments.length - visibleTests) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev >= treatments.length - visibleTests ? 0 : prev + 1
    );
  };

  const displayedTests = treatments.slice(startIndex, startIndex + visibleTests);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-2 xs:space-y-3 sm:space-y-4 px-1 xs:px-2 sm:px-0">
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] font-semibold text-xs xs:text-sm sm:text-base uppercase tracking-wide"
            >
              {badge}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 max-w-4xl mx-auto leading-tight"
            >
              {heading}
            </motion.h2>
          </div>

          {/* Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-[1fr_auto_1.5fr] gap-4 xs:gap-6 sm:gap-8 lg:gap-10 items-center"
          >
            {/* Left Image */}
            <div className="relative rounded-xl xs:rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg xs:shadow-xl sm:shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#209F00]/20 to-transparent z-10"></div>
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={450}
                height={550}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="hidden lg:flex flex-col gap-4 justify-center">
              <Button
                onClick={handlePrevious}
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border-2 border-[#209F00] hover:bg-[#209F00] hover:text-white transition-all shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                onClick={handleNext}
                size="icon"
                variant="outline"
                className="w-12 h-12 rounded-full border-2 border-[#209F00] hover:bg-[#209F00] hover:text-white transition-all shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Treatment Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
              {displayedTests.map((treatment) => (
                <TreatmentCard key={treatment.id} treatment={treatment} />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center gap-3 xs:gap-4 lg:col-span-3">
              <Button
                onClick={handlePrevious}
                size="icon"
                variant="outline"
                className="w-9 h-9 xs:w-11 xs:h-11 rounded-full border-2 border-[#209F00] hover:bg-[#209F00] hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
              </Button>
              <Button
                onClick={handleNext}
                size="icon"
                variant="outline"
                className="w-9 h-9 xs:w-11 xs:h-11 rounded-full border-2 border-[#209F00] hover:bg-[#209F00] hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable Treatment Card Component
interface TreatmentCardProps {
  treatment: TreatmentItem;
}

const TreatmentCard = ({ treatment }: TreatmentCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 shadow-lg hover:shadow-2xl transition-all flex flex-col items-center text-center border border-gray-100 hover:border-[#209F00]/30"
    >
      {/* Icon */}
      <div className="mb-5 sm:mb-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center shadow-md">
          <span className="text-4xl sm:text-5xl">{treatment.icon}</span>
        </div>
      </div>

      {/* Treatment Name */}
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 min-h-[3rem] flex items-center">
        {treatment.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7 flex-grow">
        {treatment.description}
      </p>

      {/* Learn More Button */}
      <Button
        asChild
        className="bg-[#209F00] hover:bg-green-700 text-white rounded-full w-full py-5 sm:py-6 font-semibold transition-all duration-300 group text-sm sm:text-base shadow-md hover:shadow-lg"
      >
        <Link href={treatment.link}>
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </motion.div>
  );
};
