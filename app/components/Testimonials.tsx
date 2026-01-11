"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Testimonial type
export interface Testimonial {
  id: number;
  rating: number;
  description: string;
  authorName: string;
  authorTitle: string;
}

// Default testimonials data
const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    description:
      "Experience comprehensive healthcare at Meca, where your well-being is our priority. We provide personalized, compassionate medical services, ensuring exceptional care tailored to your",
    authorName: "Norman Jones",
    authorTitle: "CEO at Mediko",
  },
  {
    id: 2,
    rating: 5,
    description:
      "Outstanding medical care with professional staff. The attention to detail and patient care exceeded my expectations. Highly recommend their services.",
    authorName: "Sarah Williams",
    authorTitle: "Patient",
  },
  {
    id: 3,
    rating: 5,
    description:
      "The best healthcare experience I've had. The doctors are knowledgeable, caring, and always available to answer questions.",
    authorName: "Michael Brown",
    authorTitle: "Patient",
  },
];

interface TestimonialsProps {
  badge?: string;
  heading?: string;
  testimonials?: Testimonial[];
  googleRating?: number;
  videoThumbnail?: string;
  videoUrl?: string;
  showVideo?: boolean;
}

export const Testimonials = ({
  badge = "Testimonials",
  heading = "Stories of Healing and Trust From Our Valued Patients",
  testimonials = defaultTestimonials,
  googleRating = 4.8,
  videoThumbnail = "/testimonial-video.jpg",
  videoUrl = "#",
  showVideo = true,
}: TestimonialsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

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
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Testimonial Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] font-semibold text-sm md:text-base"
            >
              {badge}
            </motion.p>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              {heading}
            </motion.h2>

            {/* Rating Stars */}
            <motion.div variants={itemVariants} className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < currentTestimonial.rating
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </motion.div>   <motion.div variants={itemVariants} className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < currentTestimonial.rating
                      ? "fill-orange-400 text-orange-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 text-base leading-relaxed"
            >
              {currentTestimonial.description}
            </motion.p>

            {/* Author Info */}
            <motion.div
              key={`author-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-4"
            >
              <h4 className="text-xl font-bold text-gray-900">
                {currentTestimonial.authorName}
              </h4>
              <p className="text-sm text-gray-600">{currentTestimonial.authorTitle}</p>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
              <Button
                onClick={handlePrevious}
                size="icon"
                className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleNext}
                size="icon"
                className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Rating Card and Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Google Rating Card */}
      

            {/* Video Thumbnail */}
            {showVideo && (
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
                <Image
                  src={videoThumbnail}
                  alt="Patient testimonial video"
                  width={500}
                  height={400}
                  className="w-full h-auto object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-blue-900/90 rounded-full flex items-center justify-center"
                  >
                    <Play className="w-10 h-10 text-green-500 fill-green-500 ml-1" />
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
