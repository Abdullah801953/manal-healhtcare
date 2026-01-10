"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Add search logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
  };

  return (
    <section className="relative bg-linear-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Enhancing Lives,
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-black">
                Reviving <span className="text-green-600">Health</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                for <span className="text-green-600">Better</span> Tomorrow.
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-base md:text-lg max-w-xl leading-relaxed"
            >
              Discover a world of holistic healthcare where your well-being comes first. At Meca, we deliver
              personalized, compassionate medical services designed to
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Get a quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/doctor.png"
                alt="Professional Healthcare Doctor"
                width={600}
                height={700}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 lg:mt-16 max-w-4xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden border border-gray-200">
              <Input
                type="text"
                placeholder="Search here .."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-8 py-6 text-base placeholder:text-gray-400"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 mr-1 my-1 font-medium transition-all duration-300"
              >
                Search
                <Search className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full filter blur-3xl opacity-30 -z-10" />
    </section>
  );
};
