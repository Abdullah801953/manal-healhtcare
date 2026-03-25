'use client';

import { Doctor } from '../types';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const [imgSrc, setImgSrc] = useState(doctor.image || '/doctor.png');
  const shortOverview = doctor.overview.length > 120 
    ? doctor.overview.slice(0, 120) + '...' 
    : doctor.overview;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      {/* Doctor Image */}
      <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={imgSrc}
              alt={doctor.name}
              fill
              unoptimized
              className="object-cover"
              sizes="192px"
              onError={() => setImgSrc('/doctor.png')}
            />
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6 pt-2 flex flex-col flex-grow">
        {/* Name and Designation */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
          <p className="text-sm text-[#209F00] font-medium mb-2">{doctor.designation}</p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <MapPin className="w-4 h-4 shrink-0" />
            <span className="line-clamp-2">{doctor.hospital}</span>
          </div>
        </div>

        {/* Overview */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3 text-center">
          {shortOverview}
        </p>

        {/* Specializations */}
        {doctor.specialization && doctor.specialization.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {doctor.specialization.slice(0, 3).map((spec, index) => (
              <span
                key={index}
                className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
            {doctor.specialization.length > 3 && (
              <span className="text-xs text-gray-500 px-3 py-1">
                +{doctor.specialization.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <Link href={`/doctors/${doctor.slug}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-[#209F00] text-[#209F00] hover:bg-[#209F00] hover:text-white rounded-full transition-colors"
            >
              View Profile
            </Button>
          </Link>
        <Link href="/contact" className="flex-1">
  <Button className="w-full bg-[#209F00] hover:bg-[#1a7f00] text-white rounded-full transition-colors">
    Book Now
  </Button>
</Link>
        </div>
      </div>
    </div>
  );
}
