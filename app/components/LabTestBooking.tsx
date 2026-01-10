"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

// Lab test type
export interface LabTest {
  id: number;
  name: string;
  icon: string;
  discount?: string;
  price: number;
  description: string;
  link: string;
}

// Default lab tests data
const defaultLabTests: LabTest[] = [
  {
    id: 1,
    name: "CT Scan",
    icon: "🔬",
    discount: "10% OFF",
    price: 89,
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/book-test/ct-scan",
  },
  {
    id: 2,
    name: "CT Scan",
    icon: "🔬",
    discount: "10% OFF",
    price: 89,
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/book-test/ct-scan",
  },
  {
    id: 3,
    name: "MRI Scan",
    icon: "🔬",
    discount: "15% OFF",
    price: 120,
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/book-test/mri-scan",
  },
  {
    id: 4,
    name: "Blood Test",
    icon: "🔬",
    discount: "5% OFF",
    price: 45,
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/book-test/blood-test",
  },
];

interface LabTestBookingProps {
  badge?: string;
  heading?: string;
  labTests?: LabTest[];
  imageUrl?: string;
  imageAlt?: string;
}

export const LabTestBooking = ({
  badge = "Affordable Lab Test Rates",
  heading = "We Have Lab Test Facilities, So Book Yours Today!",
  labTests = defaultLabTests,
  imageUrl = "/lab-doctors.jpg",
  imageAlt = "Medical professionals",
}: LabTestBookingProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleTests = 2; // Number of cards to show at once

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? Math.max(0, labTests.length - visibleTests) : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev >= labTests.length - visibleTests ? 0 : prev + 1
    );
  };

  const displayedTests = labTests.slice(startIndex, startIndex + visibleTests);

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
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.p
              variants={itemVariants}
              className="text-green-600 font-semibold text-sm md:text-base"
            >
              {badge}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto"
            >
              {heading}
            </motion.h2>
          </div>

          {/* Content Grid */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-[1fr_auto_1.5fr] gap-8 items-center"
          >
            {/* Left Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={400}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="hidden lg:flex flex-col gap-4 justify-center">
              <Button
                onClick={handlePrevious}
                size="icon"
                variant="ghost"
                className="w-10 h-10 hover:bg-gray-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </Button>
              <Button
                onClick={handleNext}
                size="icon"
                variant="ghost"
                className="w-10 h-10 hover:bg-gray-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </Button>
            </div>

            {/* Test Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              {displayedTests.map((test) => (
                <LabTestCard key={test.id} test={test} />
              ))}
            </div>

            {/* Mobile Navigation */}
            <div className="flex lg:hidden justify-center gap-4 lg:col-span-3">
              <Button
                onClick={handlePrevious}
                size="icon"
                variant="ghost"
                className="w-10 h-10 hover:bg-gray-200"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </Button>
              <Button
                onClick={handleNext}
                size="icon"
                variant="ghost"
                className="w-10 h-10 hover:bg-gray-200"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable Lab Test Card Component
interface LabTestCardProps {
  test: LabTest;
}

const LabTestCard = ({ test }: LabTestCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center text-center"
    >
      {/* Test Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">{test.name}</h3>

      {/* Icon with Discount Badge */}
      <div className="relative mb-6">
        {test.discount && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {test.discount}
          </div>
        )}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-4xl">{test.icon}</span>
        </div>
      </div>

      {/* Price */}
      <p className="text-gray-600 text-sm mb-2">Starting From</p>
      <p className="text-4xl font-bold text-green-600 mb-6">${test.price}</p>

      {/* Book Button */}
      <Button
        asChild
        className="bg-green-600 hover:bg-green-700 text-white rounded-full w-full py-6 mb-6 font-medium transition-all duration-300 group"
      >
        <Link href={test.link}>
          Book A Test
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>

      {/* Description */}
      <p className="text-gray-500 text-xs leading-relaxed">{test.description}</p>
    </motion.div>
  );
};
