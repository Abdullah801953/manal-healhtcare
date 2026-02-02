"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Service item type
export interface ServiceItem {
  id: number;
  name: string;
}

// Default services data
const defaultServices: ServiceItem[] = [
  { id: 1, name: "Ophthalmology" },
  { id: 2, name: "Ophthalmology" },
  { id: 3, name: "Ophthalmology" },
  { id: 4, name: "Ophthalmology" },
  { id: 5, name: "Ophthalmology" },
  { id: 6, name: "Cardiology" },
  { id: 7, name: "Neurology" },
  { id: 8, name: "Pediatrics" },
];

interface ServicesMarqueeProps {
  services?: ServiceItem[];
  backgroundColor?: string;
  textColor?: string;
  speed?: number;
}

export const ServicesMarquee = ({
  services = defaultServices,
  backgroundColor = "bg-green-500",
  textColor = "text-white",
  speed = 50,
}: ServicesMarqueeProps) => {
  // Duplicate services for seamless infinite scroll
  const duplicatedServices = [...services, ...services];

  return (
    <section className={`py-4 xs:py-5 sm:py-6 ${backgroundColor} overflow-hidden`}>
      <div className="relative flex">
        <motion.div
          className="flex items-center gap-4 xs:gap-6 sm:gap-8 whitespace-nowrap"
          animate={{
            x: [0, -50 + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          {duplicatedServices.map((service, index) => (
            <div key={`${service.id}-${index}`} className="flex items-center gap-4 xs:gap-6 sm:gap-8">
              <span className={`${textColor} text-base xs:text-lg sm:text-xl md:text-2xl font-semibold`}>
                {service.name}
              </span>
              <Plus className={`${textColor} w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6`} strokeWidth={3} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
