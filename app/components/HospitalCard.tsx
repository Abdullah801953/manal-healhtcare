"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface HospitalCardProps {
  hospital: {
    _id: string;
    name: string;
    city?: string;
    country?: string;
    location?: string;
    image?: string;
    description?: string | string[];
  };
}

export const HospitalCardMotion = ({ hospital }: HospitalCardProps) => {
  const originalImage = hospital.image || '/indra.avif';
  const [imgSrc, setImgSrc] = useState(originalImage);
  const [fallbackStage, setFallbackStage] = useState(0);

  const handleImageError = () => {
    if (fallbackStage === 0 && hospital.image) {
      // Try serving via API route
      setFallbackStage(1);
      setImgSrc(`/api${hospital.image}`);
    } else {
      // Final fallback
      setFallbackStage(2);
      setImgSrc('/indra.avif');
    }
  };

  const locationText = hospital.location || [hospital.city, hospital.country].filter(Boolean).join(', ');
  const descriptionText = Array.isArray(hospital.description) 
    ? hospital.description.join(' ') 
    : hospital.description;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className=" rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imgSrc}
          alt={hospital.name}
          fill
          unoptimized
          className="object-cover"
          onError={handleImageError}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>

        {locationText && (
          <p className="text-sm text-gray-500 mb-2">
            {locationText}
          </p>
        )}

        {descriptionText && descriptionText.length > 0 && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {descriptionText}
          </p>
        )}
      </div>
    </motion.div>
  );
};