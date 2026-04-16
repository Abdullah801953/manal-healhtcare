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
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  // Generate a consistent color from the hospital name
  const colors = [
    'from-emerald-500 to-green-600',
    'from-blue-500 to-cyan-600',
    'from-purple-500 to-indigo-600',
    'from-orange-500 to-amber-600',
    'from-rose-500 to-pink-600',
    'from-teal-500 to-cyan-500',
    'from-violet-500 to-purple-600',
    'from-sky-500 to-blue-600',
  ];
  const colorIndex = hospital.name.charCodeAt(0) % colors.length;
  const gradientClass = colors[colorIndex];
  const initial = hospital.name.charAt(0).toUpperCase();

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
        {hospital.image && !imgError ? (
          <Image
            src={hospital.image}
            alt={hospital.name}
            fill
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className={`w-full h-full bg-linear-to-br ${gradientClass} flex flex-col items-center justify-center gap-2`}>
            <span className="text-white text-6xl font-bold opacity-80">{initial}</span>
            <span className="text-white/70 text-sm font-medium text-center px-4 line-clamp-2">{hospital.name}</span>
          </div>
        )}
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