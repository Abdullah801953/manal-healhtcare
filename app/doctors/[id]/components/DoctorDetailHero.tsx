import { Doctor } from '../../types';
import { Button } from '@/components/ui/button';
import { Star, Calendar } from 'lucide-react';
import Image from 'next/image';

interface DoctorDetailHeroProps {
  doctor: Doctor;
}

export function DoctorDetailHero({ doctor }: DoctorDetailHeroProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-r from-emerald-500 via-[#209f00] to-green-600  mb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/clouds.svg')] opacity-20 bg-cover bg-center"></div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Doctor Image */}
          <div className="shrink-0">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
                sizes="288px"
                priority
              />
            </div>
          </div>

          {/* Right: Doctor Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full mb-4">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-bold text-gray-900">{doctor.rating}</span>
              <span className="text-gray-600">Rating</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {doctor.name}
            </h1>
            
            <p className="text-2xl text-white/95 font-medium mb-6">
              {doctor.specialty}
            </p>

            <p className="text-lg text-white/90 mb-8 max-w-2xl">
              {doctor.bio}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="bg-green-500 hover:bg-[#209f00] text-white rounded-full px-8 py-6 text-lg shadow-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="bg-white hover:bg-gray-50 text-gray-900 rounded-full px-8 py-6 text-lg border-2">
                Contact Doctor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
    </div>
  );
}
