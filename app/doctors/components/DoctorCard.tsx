'use client';

import { Doctor } from '../types';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Doctor Image */}
      <div className="relative h-64 bg-linear-to-b from-gray-50 to-white">
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Image
              src={doctor.image}
              alt={doctor.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-6 pt-2">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-500">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-900">{doctor.rating}</span>
          </div>
        </div>

        {/* Bio Label */}
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">Bio:</span>
        </div>

        {/* Bio Text */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
          {doctor.bio}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Link href={`/doctors/${doctor.id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-teal-500 text-teal-600 hover:bg-teal-50 rounded-full"
            >
              View Details
            </Button>
          </Link>
          <Button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white rounded-full">
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  );
}
