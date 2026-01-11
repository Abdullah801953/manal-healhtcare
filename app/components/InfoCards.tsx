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
    title: "Visitor Information",
    description:
      "View all information of the visitors and follow all terms & conditions.",
    link: "/visitor-info",
  },
  {
    id: 2,
    icon: hosp,
    title: "Hospital Information",
    description:
      "Find complete hospital details, departments and medical services.",
    link: "/hospitals",
  },
  {
    id: 3,
    icon: doc,
    title: "Doctor Consultation",
    description:
      "Connect with experienced doctors and book your appointments.",
    link: "/doctors",
  },
  {
    id: 4,
    icon: destination,
    title: "Destinations",
    description:
      "Explore healthcare destinations and treatment locations.",
    link: "/destinations",
  },
  {
    id: 5,
    icon: sav,
    title: "Save & Care",
    description:
      "Affordable healthcare plans and patient support services.",
    link: "/care",
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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
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
            gap-6
          "
        >
          {infoCards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              {/* Icon */}
              <div className="mb-6">
                <div className=" ">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                {card.description}
              </p>

              {/* Link */}
              <Link
                href={card.link}
                className="inline-flex items-center text-sm font-semibold text-gray-900 hover:text-green-600 transition-colors group"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
