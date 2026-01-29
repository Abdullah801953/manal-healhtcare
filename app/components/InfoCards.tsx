"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import doc from "../../public/doc.svg";
import destination from "../../public/destination.svg";
import sav from "../../public/sav.svg";
import hosp from "../../public/hosp.svg";
import happ from "../../public/happ.svg";

const infoCards = [
  {
    id: 1,
    icon: happ,
    title: "300+ Happy Patients",
    description:
      "View all information of the visitors and follow all terms & conditions.",
  },
  {
    id: 2,
    icon: hosp,
    title: "200+ Hospitals",
    description:
      "Find complete hospital details, departments and medical services.",
  },
  {
    id: 3,
    icon: doc,
    title: "500+ Doctors",
    description:
      "Connect with experienced doctors and book your appointments.",
  },
  {
    id: 4,
    icon: destination,
    title: "Destinations",
    description:
      "Explore healthcare destinations and treatment locations.",
  },
  {
    id: 5,
    icon: sav,
    title: "Low Cost Care",
    description:
      "Affordable healthcare plans and patient support services.",
  },
];

export const InfoCards = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="pt-64 sm:pt-72 lg:pt-80 pb-12 sm:pb-14 lg:pb-16 bg-gray-50 my-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-5 
            gap-4 sm:gap-5 lg:gap-6
          "
        >
          {infoCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-5 lg:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-green-50 rounded-full flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="object-contain w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px]"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 grow">
                {card.description}
              </p>

              {/* Link */}
             
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
