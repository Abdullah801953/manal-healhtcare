"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Award, Briefcase, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Link from "next/link";

// Doctor type based on API
export interface Doctor {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  hospital: string;
  overview: string;
  qualifications?: string[];
  experience: string;
  experienceYears: string;
  specialization?: string[];
  clinicalFocus?: string[];
  image?: string;
  status: string;
}

// Category type
export interface Category {
  id: number;
  name: string;
  slug: string;
}

interface DoctorsShowcaseProps {
  badge?: string;
  heading?: string;
}

export const DoctorsShowcase = ({
  badge = "Professional Doctors",
  heading = "Highly Skilled Doctors, Committed to Excellence",
}: DoctorsShowcaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [startIndex, setStartIndex] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState(4);

  // Calculate visible cards based on screen width
  useEffect(() => {
    const calculateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 475) return 1;      // Mobile: 1 card
      if (width < 640) return 2;      // XS: 2 cards
      if (width < 768) return 2;      // SM: 2 cards
      if (width < 1024) return 3;     // MD: 3 cards
      return 4;                        // LG+: 4 cards
    };

    setVisibleCards(calculateVisibleCards());
    setStartIndex(0); // Reset slider position on resize
    
    const handleResize = () => {
      setVisibleCards(calculateVisibleCards());
      setStartIndex(0); // Reset slider position on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/doctors');
        const result = await response.json();
        
        if (result.success && result.data) {
          const activeDoctors = result.data.filter((doc: Doctor) => doc.status === 'active');
          setDoctors(activeDoctors);
          
          // Extract unique specializations for categories
          const specializations = new Set<string>();
          activeDoctors.forEach((doc: Doctor) => {
            if (doc.specialization && doc.specialization.length > 0) {
              doc.specialization.forEach(spec => specializations.add(spec));
            }
          });
          
          const categoryList = Array.from(specializations).map((spec, index) => ({
            id: index + 1,
            name: spec,
            slug: spec.toLowerCase().replace(/\s+/g, '-')
          }));
          
          setCategories(categoryList.slice(0, 5));
          setError(null);
        } else {
          setError('Failed to fetch doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on selected category
  const filteredDoctors =
    selectedCategory === "all"
      ? doctors
      : doctors.filter((doctor) => 
          doctor.specialization?.some(spec => spec === selectedCategory)
        );

  const handlePrevious = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => 
      Math.min(filteredDoctors.length - visibleCards, prev + 1)
    );
  };

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
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          {/* Header and Filters */}
          <div className="flex flex-col gap-3 xs:gap-4 sm:gap-6">
            {/* Left: Heading */}
            <div className="space-y-1 xs:space-y-2 sm:space-y-3">
              <motion.p
                variants={itemVariants}
                className="text-[#209F00] font-semibold text-[10px] xs:text-xs sm:text-sm md:text-base inline-flex items-center gap-1 xs:gap-2"
              >
                <Award className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                {badge}
              </motion.p>
              <motion.h2
                variants={itemVariants}
                className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 max-w-2xl"
              >
                {heading}
              </motion.h2>
            </div>

            {/* Category Filters - Horizontally scrollable on mobile */}
            {!loading && categories.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="overflow-x-auto scrollbar-hide"
              >
                <div className="flex items-center gap-2 xs:gap-2 sm:gap-3 min-w-max sm:min-w-0 sm:flex-wrap pb-2 sm:pb-0">
                <Button
                  onClick={() => setSelectedCategory("all")}
                  className={`rounded-full px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 text-[10px] xs:text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategory === "all"
                      ? "bg-green-600 hover:bg-green-700 text-white shadow-lg"
                      : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  All Doctors
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`rounded-full px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 text-[10px] xs:text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                      selectedCategory === category.name
                        ? "bg-[#209F00] hover:bg-green-700 text-white shadow-lg"
                        : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300"
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center py-20"
            >
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#209f00] border-t-transparent mb-4"></div>
                <p className="text-gray-600 font-medium">Loading doctors...</p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4 font-medium">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
                >
                  Retry
                </Button>
              </div>
            </motion.div>
          )}

          {/* Doctors Slider with Navigation */}
          {!loading && !error && filteredDoctors.length > 0 && (
            <motion.div variants={itemVariants} className="relative">
              {/* Scrollable on mobile, slider on desktop */}
              <div className="overflow-x-auto sm:overflow-hidden scrollbar-hide">
                <div 
                  className="flex sm:transition-transform sm:duration-500 sm:ease-out gap-3 xs:gap-4 sm:gap-5 lg:gap-6 min-w-max sm:min-w-0"
                  style={{
                    transform: `translateX(-${startIndex * (100 / visibleCards)}%)`
                  }}
                >
                  {filteredDoctors.map((doctor, index) => (
                    <div 
                      key={doctor._id}
                      className="flex-shrink-0 w-[280px] xs:w-[300px] sm:w-auto"
                      style={{ 
                        width: window.innerWidth >= 640 ? `calc(${100 / visibleCards}% - ${((visibleCards - 1) * 16) / visibleCards}px)` : undefined
                      }}
                    >
                      <DoctorCard doctor={doctor} index={index} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows - Half inside, half outside */}
              {filteredDoctors.length > visibleCards && (
                <>
                  <Button
                    onClick={handlePrevious}
                    disabled={startIndex === 0}
                    size="icon"
                    className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-[#209F00] text-gray-700 hover:text-white shadow-2xl border-2 border-gray-200 z-10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={startIndex >= filteredDoctors.length - visibleCards}
                    size="icon"
                    className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white hover:bg-[#209F00] text-gray-700 hover:text-white shadow-2xl border-2 border-gray-200 z-10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {/* View All Doctors Link */}
              <div className="text-center mt-6 xs:mt-8 sm:mt-10">
                <Link href="/doctors">
                  <Button className="bg-[#209F00] hover:bg-green-700 text-white px-6 xs:px-8 py-2.5 xs:py-3 rounded-full text-xs xs:text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    View All Doctors
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}

          {/* No Doctors Found */}
          {!loading && !error && filteredDoctors.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No doctors found in this category.
              </p>
            </motion.div>
          )}
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
  const displayImage = doctor.image || '/doctor-img 1.png';

  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      {/* Doctor Image */}
      <div className="relative h-48 sm:h-56 lg:h-64 bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
        <Image
          src={displayImage}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Experience Badge */}
        {doctor.experienceYears && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#209F00]" />
              <span className="text-xs font-semibold text-gray-900">{doctor.experienceYears}</span>
            </div>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-[#209F00] text-white px-2.5 py-1 rounded-full shadow-lg">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-white" />
            <span className="text-xs font-bold">4.8</span>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5 sm:p-6 space-y-3">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-1">{doctor.name}</h3>
          <p className="text-sm font-semibold text-[#209F00] mb-2 line-clamp-1">{doctor.designation}</p>
        </div>

        {/* Hospital */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
          <p className="text-xs text-gray-600 line-clamp-2">{doctor.hospital}</p>
        </div>

        {/* Specializations */}
        {doctor.specialization && doctor.specialization.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialization.slice(0, 2).map((spec, idx) => (
              <span
                key={idx}
                className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-medium"
              >
                {spec}
              </span>
            ))}
            {doctor.specialization.length > 2 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{doctor.specialization.length - 2}
              </span>
            )}
          </div>
        )}

        {/* View Profile Button */}
        <Link href={`/doctors/${doctor.slug}`} className="block mt-4">
          <Button className="w-full bg-[#209F00] hover:bg-green-700 text-white rounded-full font-semibold text-sm py-5 shadow-md hover:shadow-lg transition-all">
            View Profile
          </Button>
        </Link>
      </div>
    </motion.div>
    </div>
  );
};
