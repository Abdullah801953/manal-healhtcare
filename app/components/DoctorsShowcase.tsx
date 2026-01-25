"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Doctor type
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  category: string;
}

// Default doctors data
const defaultDoctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Alex Dolmand",
    specialty: "Cardiologist",
    image: "/doctor-img 1.png",
    category: "Cardiologist",
  },
  {
    id: 2,
    name: "Dr. Michael Roberts",
    specialty: "Cardiologist",
    image: "/doctor-img 1.png",
    category: "Cardiologist",
  },
  {
    id: 3,
    name: "Dr. James Wilson",
    specialty: "Cardiologist",
    image: "/doctor-img 1.png",
    category: "Cardiologist",
  },
  {
    id: 4,
    name: "Dr. David Anderson",
    specialty: "Cardiologist",
    image: "/doctor-img 1.png",
    category: "Cardiologist",
  },
  {
    id: 5,
    name: "Dr. Sarah Johnson",
    specialty: "Neurologist",
    image: "/doctor-img 1.png",
    category: "Neurologist",
  },
  {
    id: 6,
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    image: "/doctor-img 1.png",
    category: "Pediatrician",
  },
  {
    id: 7,
    name: "Dr. Emily Davis",
    specialty: "Cardiologist",
    image: "/doctor-img 1.png",
    category: "Cardiologist",
  },
  {
    id: 8,
    name: "Dr. Robert Martinez",
    specialty: "Neurologist",
    image: "/doctor-img 1.png",
    category: "Neurologist",
  },
];

// Category type
export interface Category {
  id: number;
  name: string;
  slug: string;
}

const defaultCategories: Category[] = [
  { id: 1, name: "Cardiologist", slug: "cardiologist" },
  { id: 2, name: "Neurologist", slug: "neurologist" },
  { id: 3, name: "Pediatrician", slug: "pediatrician" },
];

interface DoctorsShowcaseProps {
  badge?: string;
  heading?: string;
  doctors?: Doctor[];
  categories?: Category[];
  visibleCards?: number;
}

export const DoctorsShowcase = ({
  badge = "Professional Doctors",
  heading = "Highly Skilled Doctors, Committed to Excellence",
  doctors = defaultDoctors,
  categories = defaultCategories,
  visibleCards = 4,
}: DoctorsShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [startIndex, setStartIndex] = useState(0);

  // Filter doctors based on selected category
  const filteredDoctors =
    selectedCategory === "all"
      ? doctors
      : doctors.filter((doctor) => doctor.category === selectedCategory);

  const handlePrevious = () => {
    setStartIndex((prev) =>
      prev === 0 ? Math.max(0, filteredDoctors.length - visibleCards) : prev - 1
    );
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev >= filteredDoctors.length - visibleCards ? 0 : prev + 1
    );
  };

  const displayedDoctors = filteredDoctors.slice(startIndex, startIndex + visibleCards);

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

  return (
    <section className="py-12 sm:py-14 lg:py-16 xl:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          {/* Header and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
            {/* Left: Heading */}
            <div className="space-y-2 sm:space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-[#209F00] font-semibold text-xs sm:text-sm md:text-base"
              >
                {badge}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-2xl"
              >
                {heading}
              </motion.h2>
            </div>

            {/* Right: Category Filters */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <Button
                onClick={() => setSelectedCategory("all")}
                className={`rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                }`}
              >
                All Doctors
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`rounded-full px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? "bg-[#209F00] hover:bg-green-700 text-white"
                      : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Doctors Grid with Navigation */}
          <motion.div variants={itemVariants} className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {displayedDoctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>

            {/* Navigation Arrows */}
            {filteredDoctors.length > visibleCards && (
              <>
                <Button
                  onClick={handlePrevious}
                  size="icon"
                  className="hidden lg:flex absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 shadow-lg z-10"
                >
                  <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
                <Button
                  onClick={handleNext}
                  size="icon"
                  className="hidden lg:flex absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-900 shadow-lg z-10"
                >
                  <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Reusable Doctor Card Component
interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

const DoctorCard = ({ doctor, index }: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
    >
      {/* Doctor Image */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gray-100">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Doctor Info */}
      <div className="p-4 sm:p-5 lg:p-6 text-center">
        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1">{doctor.name}</h3>
        <p className="text-gray-600 text-xs sm:text-sm">{doctor.specialty}</p>
      </div>
    </motion.div>
  );
};
