"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Briefcase, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Doctor {
  _id: string;
  name: string;
  slug: string;
  designation: string;
  hospital: string;
  overview: string;
  qualifications?: string[];
  experience: string;
  experienceYears: string;
  specialization?: string[];
  image?: string;
  status: string;
}

interface HospitalDoctorsSectionProps {
  doctors: Doctor[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function DoctorCard({ doctor, index }: { doctor: Doctor; index: number }) {
  const [imgSrc, setImgSrc] = useState(doctor.image || "/doctor-img 1.png");

  return (
    <motion.div
      variants={itemVariants}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="flex flex-col h-full">
        {/* Doctor Image */}
        <div className="relative h-64 bg-linear-to-br from-green-50 to-blue-50 overflow-hidden">
          <Image
            src={imgSrc}
            alt={doctor.name}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImgSrc("/doctor-img 1.png")}
          />

          {doctor.experienceYears && (
            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#209F00]" />
                <span className="text-xs font-semibold text-gray-900">{doctor.experienceYears}</span>
              </div>
            </div>
          )}

          <div className="absolute top-3 left-3 bg-[#209F00] text-white px-2.5 py-1 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              <span className="text-xs font-bold">4.8</span>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-5 space-y-3 flex flex-col flex-1">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{doctor.name}</h3>
            <p className="text-sm font-semibold text-[#209F00] mb-2 line-clamp-1">{doctor.designation}</p>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600 line-clamp-2">{doctor.hospital}</p>
          </div>

          {doctor.specialization && doctor.specialization.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {doctor.specialization.slice(0, 2).map((spec) => (
                <span
                  key={spec}
                  className="text-xs bg-green-50 text-[#209F00] px-2.5 py-1 rounded-full font-medium border border-green-100"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          <Link href={`/doctors/${doctor.slug}`} className="block mt-auto pt-2">
            <Button className="w-full bg-[#209F00] hover:bg-green-700 text-white rounded-full font-semibold text-sm py-5 shadow-md hover:shadow-lg transition-all">
              View Profile
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HospitalDoctorsSection({ doctors }: HospitalDoctorsSectionProps) {
  if (!doctors || doctors.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="p-3 bg-[#209f00]/10 rounded-xl">
            <Users className="w-6 h-6 text-[#209f00]" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Our Doctors</h2>
            <p className="text-gray-600 mt-1">
              Meet the expert medical professionals at this hospital
            </p>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {doctors.map((doctor, index) => (
            <DoctorCard key={doctor._id} doctor={doctor} index={index} />
          ))}
        </motion.div>

        {/* View All Doctors */}
        <div className="text-center mt-10">
          <Link href="/doctors">
            <Button className="bg-[#209F00] hover:bg-green-700 text-white px-8 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all">
              View All Doctors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
