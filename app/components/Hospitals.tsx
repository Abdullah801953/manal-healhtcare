"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HospitalCardMotion } from "./HospitalCard";

interface Hospital {
  _id: string;
  slug: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  beds: number;
  parking: boolean;
  specialties: string[];
  featured?: boolean;
  emergency?: boolean;
  status: string;
}

interface HospitalsProps {
  heading?: string;
  subheading?: string;
  showViewAll?: boolean;
}

export const Hospitals = ({
  heading = "Top Hospitals in India",
  subheading = "World-Class Infrastructure & Expert Medical Care",
  showViewAll = true,
}: HospitalsProps) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/hospitals");
        const result = await res.json();

        if (result.success && result.data) {
          const activeHospitals = result.data.filter(
            (h: Hospital) => h.status === "active"
          );

          setHospitals(activeHospitals);
        }
      } catch (err) {
        console.error("Error fetching hospitals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-10"
        >
          {/* Header */}
          <div className="text-center space-y-3">
            <motion.h2
              variants={itemVariants}
              className="text-[#209F00] text-3xl md:text-4xl lg:text-5xl font-bold"
            >
              {heading}
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-base md:text-lg"
            >
              {subheading}
            </motion.p>
          </div>

          {/* Grid */}
          <motion.div variants={itemVariants}>
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#209f00] border-t-transparent"></div>
              </div>
            ) : hospitals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {hospitals.map((hospital) => (
                  <HospitalCardMotion
                    key={hospital._id}
                    hospital={hospital}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8">
                No hospitals available.
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};