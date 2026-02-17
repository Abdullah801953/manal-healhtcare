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
    <section className=" bg-gray-50 ">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 mt-[15vh] md:mt-[10vh]">
        {/* Scrollable on mobile, grid on larger screens */}
        <div className="overflow-x-auto sm:overflow-visible scrollbar-hide">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="
              flex sm:grid
              sm:grid-cols-3 
              md:grid-cols-3 
              lg:grid-cols-5 
              gap-3 xs:gap-4 sm:gap-5 lg:gap-6
              min-w-max sm:min-w-0
            "
          >
            {infoCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col w-[160px] xs:w-[180px] sm:w-auto flex-shrink-0 sm:flex-shrink"
            >
              {/* Icon */}
              <div className="mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-green-50 rounded-full flex items-center justify-center">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="object-contain w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-[60px] xl:h-[60px]"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-[10px] xs:text-xs sm:text-sm leading-relaxed mb-3 xs:mb-4 sm:mb-6 grow">
                {card.description}
              </p>

              {/* Link */}
             
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};
