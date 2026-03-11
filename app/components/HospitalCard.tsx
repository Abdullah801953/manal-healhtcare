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
    image?: string;
    description?: string;
  };
}

export const HospitalCardMotion = ({ hospital }: HospitalCardProps) => {
  const [imgSrc, setImgSrc] = useState(hospital.image || '/indra.avif');

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
          onError={() => setImgSrc('/indra.avif')}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>

        {(hospital.city || hospital.country) && (
          <p className="text-sm text-gray-500 mb-2">
            {hospital.city} {hospital.country && `, ${hospital.country}`}
          </p>
        )}

        {hospital.description && hospital.description.length > 0 && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {Array.isArray(hospital.description) ? hospital.description.join(' ') : hospital.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};