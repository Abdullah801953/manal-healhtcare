"use client";

import { motion } from "framer-motion";

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
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Image */}
      {hospital.image && (
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-56 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{hospital.name}</h3>

        {(hospital.city || hospital.country) && (
          <p className="text-sm text-gray-500 mb-2">
            {hospital.city} {hospital.country && `, ${hospital.country}`}
          </p>
        )}

        {hospital.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {hospital.description}
          </p>
        )}
      </div>
    </motion.div>
  );
};