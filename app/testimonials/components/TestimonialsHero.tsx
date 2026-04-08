"use client";
import Image from "next/image";
import { Heart, Users, Globe, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import t1 from "@/public/t1.jpeg";
import t2 from "@/public/t2.jpeg";
import t3 from "@/public/t3.jpeg";

const carouselImages = [
  {
    src: t1,
    alt: "Patient recovery success",
    caption: "Ahmed from UAE — Cardiac Surgery",
  },
  {
    src: t2,
    alt: "Medical consultation",
    caption: "Maria from UK — Orthopedic Treatment",
  },
  {
    src: t3,
    alt: "Happy patient",
    caption: "James from Canada — Cancer Care",
  },
];

export function TestimonialsHero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((index + carouselImages.length) % carouselImages.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(current + 1);
    }, 3500);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="relative bg-gradient-to-br from-[#209f00]/10 via-white to-[#209f00]/5 py-20 overflow-hidden">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#209f00]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#209f00]/8 blur-3xl" />

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ─── LEFT COLUMN: original content ─── */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#209f00]/10 px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5 text-[#209f00]" />
              <span className="text-[#209f00] font-semibold">Patient Success Stories</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Real Stories from Real Patients
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto lg:mx-0">
              Read authentic testimonials from international patients who chose Manal Healthcare
              for their medical journey. Over 500 verified success stories from 50+ countries.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
              {[
                { icon: Users, value: "500+", label: "Patient Reviews" },
                { icon: Star, value: "4.9/5", label: "Average Rating" },
                { icon: Globe, value: "50+", label: "Countries" },
                { icon: Heart, value: "98%", label: "Satisfaction" },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#209f00]/10 rounded-full mx-auto mb-3">
                    <Icon className="w-6 h-6 text-[#209f00]" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── RIGHT COLUMN: auto image carousel ─── */}
          <div className="flex flex-col items-center gap-4">
            {/* Main image frame */}
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl aspect-[4/4.5] bg-gray-100">
              {carouselImages.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: i === current && !animating ? 1 : 0 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    className="w-full  object-cover"
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                    <p className="text-white font-semibold text-base">{img.caption}</p>
                  </div>
                </div>
              ))}

              {/* Arrow controls */}
              <button
                onClick={() => goTo(current - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#209f00] rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(current + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-[#209f00] rounded-full p-2 shadow-md transition-all duration-200 hover:scale-110"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {carouselImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    i === current
                      ? "border-[#209f00] scale-110 shadow-lg"
                      : "border-transparent opacity-60 hover:opacity-90"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <Image src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 h-3 bg-[#209f00]"
                      : "w-3 h-3 bg-[#209f00]/30 hover:bg-[#209f00]/60"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}