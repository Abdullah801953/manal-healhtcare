"use client";

import Image from "next/image";
import { Target, Eye, Heart } from "lucide-react";// apni image yahan import karo

export function MissionVision() {
  const sections = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To deliver world-class healthcare services that improve the quality of life for our patients through innovative treatments, compassionate care, and medical excellence.",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading healthcare provider recognized for exceptional patient care, medical innovation, and commitment to community health and wellbeing.",
      color: "from-teal-500 to-cyan-600",
    },
    {
      icon: Heart,
      title: "Our Values",
      description:
        "Compassion, integrity, excellence, innovation, and respect guide every decision we make and every interaction we have with our patients and community.",
      color: "from-green-500 to-emerald-600",
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
          <div className="relative w-full h-[500px] lg:h-[660px] rounded-xl overflow-hidden shadow-xl">
         <Image
  src="/foundationImg.jpeg"
  alt="Healthcare Foundation"
  fill
  className="object-cover"
/>
          </div>

        </div>
      </div>
    </section>
  );
}