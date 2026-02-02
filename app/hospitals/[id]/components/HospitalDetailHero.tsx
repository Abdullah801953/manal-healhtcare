import { Hospital } from '../../types';
import { ArrowLeft, Star, MapPin, Bed, Award, Clock, Car, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface HospitalDetailHeroProps {
  hospital: Hospital;
}

export default function HospitalDetailHero({ hospital }: HospitalDetailHeroProps) {
  return (
    <section className="relative bg-linear-to-br from-[#209f00] via-emerald-600 to-teal-700 text-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Back Button */}
        <Link href="/hospitals">
          <Button variant="ghost" className="mb-6 text-white hover:bg-white/20 hover:text-white cursor-pointer">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Hospitals
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Type Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium">{hospital.type}</span>
              {hospital.featured && (
                <>
                  <span className="text-white/50">•</span>
                  <Award className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">Featured</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {hospital.name}
            </h1>

            {/* Location */}
            <div className="flex items-start gap-2 mb-4">
              <MapPin className="w-5 h-5 shrink-0 mt-1" />
              <span className="text-lg text-white/90">{hospital.location}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-xl">{hospital.rating}</span>
                <span className="text-white/80">({hospital.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Bed className="w-8 h-8 mb-3" />
                <div className="text-sm text-white/80 mb-1">Total Beds</div>
                <div className="text-2xl font-bold">{hospital.beds}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Clock className="w-8 h-8 mb-3" />
                <div className="text-sm text-white/80 mb-1">Established</div>
                <div className="text-2xl font-bold">{hospital.established}</div>
              </div>
            </div>

            {/* Amenities Badges */}
            <div className="flex flex-wrap gap-3 mt-6">
              {hospital.emergency && (
                <div className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-semibold">24/7 Emergency</span>
                </div>
              )}
              {hospital.parking && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Car className="w-4 h-4" />
                  <span className="text-sm font-semibold">Parking</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-125 object-cover"
                width={235}
                height={300}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Action Buttons Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex gap-3">
              <button className="flex-1 bg-white text-[#209f00] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </button>
              <button className="flex-1 bg-[#209f00] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1a8000] transition-colors shadow-lg">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
