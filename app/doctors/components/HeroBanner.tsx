import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function HeroBanner() {
  return (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden bg-linear-to-r from-emerald-500 via-[#209f00] to-green-600 mb-16">
      {/* Background Pattern/Clouds */}
      <div className="absolute inset-0 bg-[url('/clouds.svg')] opacity-20 bg-cover bg-center"></div>

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left Content */}
        <div className="flex-1 z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            HEALTH TRUST
          </h1>
          <p className="text-xl text-white/90 font-medium mb-2">
            Trusted Medical
          </p>
          <p className="text-xl text-white/90 font-medium mb-6">
            Experts Team
          </p>
          <Button className="bg-white text-[#209F00] hover:bg-gray-50 rounded-full px-6 py-3 font-medium shadow-lg">
            Schedule Meeting
          </Button>
        </div>

       
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-20 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 left-40 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
    </div>
  );
}
