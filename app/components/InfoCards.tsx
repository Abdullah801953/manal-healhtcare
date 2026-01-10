"use client";

import { motion } from "framer-motion";
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";

const infoCards = [
  {
    id: 1,
    icon: User,
    title: "Visitor Information",
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/visitor-info",
  },
  {
    id: 2,
    icon: User,
    title: "Visitor Information",
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/visitor-info",
  },
  {
    id: 3,
    icon: User,
    title: "Visitor Information",
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/visitor-info",
  },
  {
    id: 4,
    icon: User,
    title: "Visitor Information",
    description: "View all information of the visitors and follow all terms & conditions.",
    link: "/visitor-info",
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
      transition: {
        duration: 0.5,
      },
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="w-7 h-7 text-gray-900" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 grow">
                    {card.description}
                  </p>

                  {/* Learn More Link */}
                  <Link
                    href={card.link}
                    className="inline-flex items-center text-gray-900 font-semibold text-sm group hover:text-green-600 transition-colors"
                  >
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
