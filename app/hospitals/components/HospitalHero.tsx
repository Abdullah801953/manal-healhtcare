"use client"
import Image from "next/image";
import { Building2, Sparkles } from "lucide-react";

import apolloHospitals from "@/public/apollohs.png";
import artemis from "@/public/artemis.png";
import apolloFertility from "@/public/apollofer.png";
import marengo from "@/public/marengo.png";
import cosmodent from "@/public/cosmodent.png";
import indra from "@/public/indra.avif";
import max from "@/public/max.webp";
import medanta from "@/public/medanta.jpg";

const hospitals = [
  { src: apolloHospitals, alt: "Apollo Hospitals" },
  { src: artemis, alt: "Artemis Health Institute" },
  { src: apolloFertility, alt: "Apollo Fertility" },
  { src: marengo, alt: "Marengo Asia Hospitals" },
  { src: cosmodent, alt: "Cosmodent" },
  { src: indra, alt: "Indra Hospitals" },
  { src: max, alt: "Max Hospitals" },
  { src: medanta, alt: "Medanta Hospitals" },
];

export default function HospitalHero() {
  return (
    <section className="relative text-white py-20 overflow-hidden">

      {/* Collage Background — 4 cols × 2 rows = 8 images */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-[2px]">
        {hospitals.map((hospital, index) => (
          <div key={index} className="relative w-full h-full overflow-hidden">
            <Image
              src={hospital.src}
              alt={hospital.alt}
              fill
              className="object-cover brightness-[0.72] saturate-[0.9] scale-110 transition-transform duration-700 hover:scale-125"
              sizes="25vw"
            />
          </div>
        ))}
      </div>

      {/* Green gradient overlay — lighter so images are visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#209f00]/55 via-emerald-700/45 to-teal-800/55" />

      {/* Center fade so text area is readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,_rgba(0,0,0,0.35)_0%,_transparent_100%)]" />

      {/* Edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.5)_100%)]" />

      {/* Blur blobs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Grid line texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Sparkles */}
      <div className="absolute top-20 right-10 animate-bounce">
        <Sparkles className="w-8 h-8 text-white/40" />
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce delay-300">
        <Sparkles className="w-6 h-6 text-white/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/25 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-5 h-5" />
            <span className="text-sm font-medium">Premier Healthcare Facilities</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
            Find the Right Hospital
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover top-rated hospitals and medical centers equipped with
            advanced technology, expert staff, and comprehensive healthcare
            services
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-1 drop-shadow-lg">50+</div>
              <div className="text-white/80 text-sm">Medical Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1 drop-shadow-lg">2500+</div>
              <div className="text-white/80 text-sm">Total Beds</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-1 drop-shadow-lg">4.8</div>
              <div className="text-white/80 text-sm">Average Rating</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}