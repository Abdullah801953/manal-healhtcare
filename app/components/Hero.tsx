"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ shadcn Select
import { useState } from "react";
import doctor from "@/public/doctor.png";
export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("treatments"); // ✅ default category

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in category:", searchCategory);
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div className="space-y-4 lg:space-y-5">
              {/* Main Hero Heading */}
              <motion.h1 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900"
              >
                Enhancing Lives, Reviving <span className="text-[#209F00]">Health</span> for a <span className="text-[#209F00]">Better</span> Tomorrow
              </motion.h1>

              {/* Subheading */}
              <motion.h2 
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 leading-relaxed"
              >
                Your trusted partner in Medical Tourism in India, connecting you with top hospitals and experienced doctors.
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                Discover world-class healthcare services where your well-being comes first. At Manal Healthcare, we provide personalized, compassionate medical care and seamless medical tourism services in India, ensuring safe, affordable, and high-quality treatment for every patient.
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2">
              <Button
                size="lg"
                onClick={() => window.dispatchEvent(new Event('openQueryModal'))}
                className="bg-[#209F00] hover:bg-green-700 text-white rounded-full px-8 py-6 text-base font-medium transition-all duration-300 shadow-lg hover:shadow-xl group w-full sm:w-auto"
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
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <Image
                src={doctor}
                alt="Professional Healthcare Doctor"
                width={600}
                height={700}
                className="w-full h-auto object-contain"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 lg:mt-14 max-w-5xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex flex-col sm:flex-row items-stretch bg-white rounded-2xl sm:rounded-full shadow-xl overflow-hidden border border-gray-300">
              
              {/* Dropdown */}
              <Select
                onValueChange={(val) => setSearchCategory(val)}
                defaultValue="treatments"
              >
                <SelectTrigger className="w-full sm:w-44 border-0 px-6 py-4 sm:py-5 focus:ring-0 focus:ring-offset-0 rounded-none sm:rounded-l-full text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="treatments" className="text-base">Treatments</SelectItem>
                  <SelectItem value="hospitals" className="text-base">Hospitals</SelectItem>
                  <SelectItem value="doctors" className="text-base">Doctors</SelectItem>
                </SelectContent>
              </Select>

              {/* Input */}
              <Input
                type="text"
                placeholder="Type treatments, doctors, hospitals name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-6 py-4 sm:py-5 text-base placeholder:text-gray-400 rounded-none w-full"
              />

              {/* Button */}
              <Button
                type="submit"
                size="lg"
                className="bg-[#209F00] hover:bg-green-700 text-white rounded-none sm:rounded-full px-8 py-4 sm:py-5 m-0 sm:m-1 font-semibold transition-all duration-300 w-full sm:w-auto text-base"
              >
                <span>Search</span>
                <Search className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
          
          {/* Quick Search Tips */}
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-500">
              Try: "Heart Surgery", "Orthopedic", "Cancer Treatment"
            </p>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-green-100 rounded-full filter blur-3xl opacity-30 -z-10" />
    </section>
  );
};