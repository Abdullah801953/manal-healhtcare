"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";

export function BlogListHero() {
  return (
    <section className="relative h-[350px] md:h-[750px]  overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/blog-hero.jpg"
          alt="Healthcare professionals"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-start justify-center px-8 md:px-40 z-10">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#209F00] text-sm md:text-base font-medium mb-4"
        >
          Health News and Insights
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-3xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl leading-tight"
        >
          Stay Updated on the<br />Latest News & Insights
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            size="lg" 
            className="relative overflow-hidden bg-[#209F00] hover:bg-[#30dd05] cursor-pointer text-white rounded-full px-15 py-7 text-md group"
          >
            {/* Wave animation overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></span>
            
            <span className="relative flex items-center">
              Request an Appointment
              <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </Button>
        </motion.div>
      </div>

      {/* Latest News overlay text */}
      <div className="absolute bottom-15 right-8 md:bottom-15 md:right-25">
        <h2 className="text-white/40 text-8xl md:text-9xl lg:text-9xl font-bold">
          Latest News
        </h2>
      </div>
    </section>
  );
}
