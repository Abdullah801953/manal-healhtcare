import { Doctor } from '../../types';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Briefcase } from 'lucide-react';
import Image from 'next/image';

interface DoctorDetailHeroProps {
  doctor: Doctor;
}

export function DoctorDetailHero({ doctor }: DoctorDetailHeroProps) {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-linear-to-r from-emerald-500 via-[#209f00] to-green-600 mb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/clouds.svg')] opacity-20 bg-cover bg-center"></div>
      
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Doctor Image */}
          <div className="shrink-0">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src={doctor.image || '/doctor.png'}
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
              <Briefcase className="w-5 h-5 text-[#209f00]" />
              <span className="text-sm font-medium text-gray-700">Experice:{doctor.experienceYears}Years</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {doctor.name}
            </h1>
            
            <p className="text-2xl text-white/95 font-medium mb-3">
              {doctor.designation}
            </p>

            <div className="flex items-center gap-2 text-white/90 mb-6 justify-center lg:justify-start">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{doctor.hospital}</span>
            </div>

            {/* <p className="text-lg text-white/90 mb-8 max-w-2xl">
              {doctor.overview}
            </p> */}

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button className="bg-white hover:bg-gray-50 text-[#209f00] rounded-full px-8 py-6 text-lg shadow-lg font-semibold cursor-pointer">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
              <Button variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white border-2 rounded-full px-8 py-6 text-lg cursor-pointer">
                Contact
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
