"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, ChevronLeft, ChevronRight, Activity, Heart, Brain, Eye, Bone, Stethoscope } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { treatmentCategories } from "@/app/lib/treatments";

// Service card data type
export interface ServiceCard {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
}

// Icon mapping for treatments
const treatmentIcons: Record<string, React.ElementType> = {
  "Cardiac Surgery": Heart,
  "Orthopedic Surgery": Bone,
  "Brain and Spine Surgery": Brain,
  "Eye Treatment": Eye,
  "Neurology Treatment": Brain,
  "Cancer Treatment": Activity,
  "General Surgery": Stethoscope,
  "Urology Surgery": Activity,
  "Cosmetic Surgery": Activity,
  "Dental Treatment": Activity,
  "Ear Nose Throat Surgery": Activity,
  "Gastroenterology Surgery": Activity,
  "Gynaecology Treatment": Activity,
  "Nephrology Treatment": Activity,
  "Organ Transplant Surgery": Activity,
  "Robotic Surgery": Activity,
  "Stem Cell Therapy": Activity,
  "Weight Loss Treatment": Activity,
};

// Convert treatment categories to services
const treatmentServices: ServiceCard[] = treatmentCategories.map((treatment, index) => ({
  id: parseInt(treatment.id),
  icon: treatmentIcons[treatment.category] || Activity,
  title: treatment.category,
  description: `Expert ${treatment.category.toLowerCase()} services with world-class facilities and experienced medical professionals.`,
  link: `/treatments/${treatment.id}`,
}));

interface ServicesProps {
  heading?: string;
  subheading?: string;
  services?: ServiceCard[];
  showViewAll?: boolean;
  viewAllLink?: string;
}

export const Services = ({
  heading = "Our Top Treatments",
  subheading = "Innovative Medical Treatments for Modern Healthcare",
  services = treatmentServices,
  showViewAll = true,
  viewAllLink = "/treatments",
}: ServicesProps) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 lg:py-20 bg-white">
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
              className="text-[#209F00] font-semibold text-sm md:text-base"
            >
              {heading}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto"
            >
              {subheading}
            </motion.h2>
          </div>

          {/* Carousel */}
          <motion.div variants={itemVariants} className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <CarouselItem
                      key={service.id}
                      className="pl-4 md:basis-1/2 lg:basis-1/4"
                    >
                      <ServiceCard service={service} Icon={Icon} />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 border-0 text-gray-900" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-200 hover:bg-gray-300 border-0 text-gray-900" />
            </Carousel>
          </motion.div>

          {/* View All Section */}
          {showViewAll && (
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <p className="text-gray-700 text-sm md:text-base">
                We have {treatmentCategories.length}+ specialized treatment services available.{" "}
                <Link
                  href={viewAllLink}
                  className="text-[#209F00] font-semibold hover:text-green-700 transition-colors"
                >
                  View All
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// Separate ServiceCard component for reusability
interface ServiceCardProps {
  service: ServiceCard;
  Icon: React.ElementType;
}

const ServiceCard = ({ service, Icon }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-[#f1f8ef] rounded-2xl p-6 h-full flex flex-col"
    >
      {/* Icon */}
      <div className="mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#209F00]" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
        {service.description}
      </p>

      {/* Button */}
      <Button
        asChild
        className="bg-[#209F00] hover:bg-green-700 text-white rounded-full w-full py-6 font-medium transition-all duration-300 group"
      >
        <Link href={service.link}>
          Learn More
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </Button>
    </motion.div>
  );
};
