import Link from 'next/link';
import { Hospital } from '../types';
import { MapPin, Bed, Star, Award, Clock, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HospitalCardProps {
  hospital: any; // Changed to any to accept MongoDB documents with _id
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const hospitalSlug = hospital.slug || hospital._id || hospital.id;
  const isUploadedImage = typeof hospital.image === 'string' && hospital.image.startsWith('/uploads/');
  
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-80 h-64 sm:h-auto shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={hospital.image}
            alt={hospital.name}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized={isUploadedImage}
          />
          {hospital.featured && (
            <div className="absolute top-4 right-4 bg-[#209f00] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
              <Award className="w-3 h-3" />
              Featured
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
            {hospital.type}
          </div>
          {hospital.emergency && (
            <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" />
              24/7 Emergency
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1">
            {/* Hospital Name */}
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#209f00] transition-colors">
              {hospital.name}
            </h3>
            
            {/* Location */}
            <div className="flex items-start gap-2 text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#209f00]" />
              <span className="text-sm">{hospital.location}</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {hospital.shortDescription}
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{hospital.rating}</span>
                <span className="text-sm text-gray-500">({hospital.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Bed className="w-4 h-4 text-[#209f00]" />
                <span className="text-sm font-medium">{hospital.beds} Beds</span>
              </div>
              {hospital.parking && (
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Car className="w-4 h-4 text-[#209f00]" />
                  <span className="text-sm font-medium">Parking</span>
                </div>
              )}
            </div>

            {/* Specialties */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.slice(0, 3).map((specialty: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
                {hospital.specialties.length > 3 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    +{hospital.specialties.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href={`/hospitals/${hospitalSlug}`} className="flex-1 min-w-50">
              <Button className="w-full bg-[#209f00] hover:bg-[#1a8000] text-white">
                View Details
              </Button>
            </Link>
            <Button variant="outline" className="flex-1 min-w-40 hover:bg-gray-50">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
