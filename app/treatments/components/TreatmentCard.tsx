import Link from 'next/link';
import { Treatment } from '../types';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TreatmentCardProps {
  treatment: Treatment;
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="relative sm:w-64 h-52 sm:h-auto shrink-0 overflow-hidden bg-gray-100">
          <Image
            src={treatment.image}
            alt={treatment.title}
            width={256}
            height={208}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {treatment.featured && (
            <div className="absolute top-4 right-4 bg-[#209f00] text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
            {treatment.category}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#209f00] transition-colors">
              {treatment.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-2">
              {treatment.shortDescription}
            </p>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-[#209f00]" />
                <span className="text-sm font-medium">{treatment.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <DollarSign className="w-5 h-5 text-[#209f00]" />
                <span className="text-sm font-medium">{treatment.price}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <Link href={`/treatments/${treatment.slug}`} className="flex-1 min-w-50">
              <Button 
                className="w-full bg-[#209f00] hover:bg-[#1a8000] text-white"
              >
                View Details
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="flex-1 min-w-40 hover:bg-gray-50"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
