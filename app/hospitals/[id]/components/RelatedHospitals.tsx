import Link from 'next/link';
import { Hospital } from '../../types';
import { ArrowRight, Star, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RelatedHospitalsProps {
  hospitals: Hospital[];
}

export default function RelatedHospitals({ hospitals }: RelatedHospitalsProps) {
  if (hospitals.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Similar Healthcare Facilities
            </h2>
            <p className="text-gray-600 text-lg">
              Explore other hospitals in our network
            </p>
          </div>

          {/* Hospitals Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {hospital.featured && (
                    <div className="absolute top-3 right-3 bg-[#209f00] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-[#209f00] font-semibold mb-2">
                    {hospital.type}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#209f00] transition-colors">
                    {hospital.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {hospital.shortDescription}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-[#209f00] text-[#209f00]" />
                      <span className="font-semibold">{hospital.rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{hospital.beds} beds</span>
                    </div>
                  </div>
                  
                  <Link href={`/hospitals/${hospital.id}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group/btn hover:bg-[#209f00] hover:text-white hover:border-[#209f00] transition-all duration-300"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link href="/hospitals">
              <Button size="lg" className="bg-[#209f00] hover:bg-[#1a8000] text-white">
                View All Hospitals
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
