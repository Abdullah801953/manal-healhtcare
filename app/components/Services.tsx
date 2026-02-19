"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight, Activity, Heart, Brain, Eye, Bone, Stethoscope, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

// Treatment type from API
export interface Treatment {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  image?: string;
  status: string;
}

// Service card data type
export interface ServiceCard {
  id: string;
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

interface ServicesProps {
  heading?: string;
  subheading?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export const Services = ({
  heading = "Our Top Treatments",
  subheading = "Innovative Medical Treatments for Modern Healthcare",
  showViewAll = true,
  viewAllLink = "/treatments",
}: ServicesProps) => {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTreatments, setTotalTreatments] = useState(0);

  // Fetch treatments from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/treatments');
        const result = await response.json();
        
        if (result.success && result.data) {
          const activeTreatments = result.data.filter((t: Treatment) => t.status === 'active');
             
          setTotalTreatments(activeTreatments.length);
          
          // Convert treatments to service cards
          const serviceCards: ServiceCard[] = activeTreatments
          .map((treatment: Treatment) => ({
            
            id: treatment._id,
            icon: treatmentIcons[treatment.category] || Activity,
            title: treatment.title,
            description: treatment.shortDescription || treatment.description.slice(0, 150) + '...',
            link: `/treatments/${treatment.slug}`,
          }));
          
          setServices(serviceCards);
        }
      } catch (err) {
        console.error('Error fetching treatments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

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
    <section className="py-8 xs:py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8 sm:space-y-10 lg:space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-3 px-1 xs:px-2 sm:px-0">
            <motion.p
              variants={itemVariants}
              className="text-[#209F00] text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-4xl mx-auto"
            >
              {heading}
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="font-semibold text-[30px] xs:text-sm sm:text-md md:text-2xl"
            >
              {subheading}
            </motion.h2>  
          </div>

          {/* Grid of Cards */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#209f00] border-t-transparent"></div>
              </div>
            ) : services.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <ServiceCard key={service.id} service={service} Icon={Icon} />
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">No treatments available.</p>
            )}
          </motion.div>

          {/* View All Section */}
          {showViewAll && (
            <motion.div
              variants={itemVariants}
              className="text-center px-1 xs:px-2 sm:px-0"
            >
              <p className="text-gray-700 text-[10px] xs:text-xs sm:text-sm md:text-base">
                We have {totalTreatments}+ specialized treatment services available.{" "}
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

// ServiceCard component using Shadcn Card
interface ServiceCardProps {
  service: ServiceCard;
  Icon: React.ElementType;
}

const ServiceCard = ({ service, Icon }: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
<Card className="h-full bg-[#eef3f7] border-none rounded-xl p-4 sm:p-5 hover:shadow-md transition-all duration-300">
  <div className="flex items-start justify-between gap-4">
    
    {/* Left Side Content */}
    <div className="flex items-start gap-4">
      
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center">
        <Icon className="w-10 h-10 text-green-700" />
      </div>

      {/* Text */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {service.title}
        </h3>
      
      </div>
    </div>

    {/* Right Side Plus Button */}
    <Link href={service.link}>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 transition">
        <Plus className="w-3 h-3 text-white" />
      </div>
    </Link>

  </div>
</Card>
    </motion.div>
  );
};
