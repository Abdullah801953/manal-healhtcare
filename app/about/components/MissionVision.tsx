"use client";
import { useSettings } from "@/app/contexts/SettingsContext";
import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";// apni image yahan import karo
import { HeroQueryForm } from "@/app/components/HeroQueryForm";

export function MissionVision() {
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "Make quality healthcare in India accessible, clear, and stress-free for every international patient.We remove the barriers — language gaps, hospital confusion, visa paperwork, logistical overwhelm — so patients can focus entirely on their recovery and well-being. Every patient who reaches out to us deserves honest guidance, not a sales pitch. That's how we work.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "We strive to simplify the complexities of cross border healthcare, ensuring that every individual, regardless of their location, can access the world's best medical facilities and specialists. We are dedicated to using modern technology and streamlined processes to provide clear, honest and efficient healthcare solutions, making the path to recovery as smooth as possible.",
      color: "from-teal-500 to-cyan-600",
    },
   
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Foundation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built on principles of excellence and compassion
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - 3 BOX GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {section.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {section.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className=" w-full h-[500px] lg:h-[660px] rounded-xl ">
      
          <div className ="">
              <HeroQueryForm />
          </div>
    
          </div>

        </div>
      </div>
    </section>
  );
}