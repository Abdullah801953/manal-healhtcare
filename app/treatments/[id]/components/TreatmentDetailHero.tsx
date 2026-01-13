import { Treatment } from '../../types';
import { ArrowLeft, Clock, DollarSign, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface TreatmentDetailHeroProps {
  treatment: Treatment;
}

export default function TreatmentDetailHero({ treatment }: TreatmentDetailHeroProps) {
  return (
    <section className="relative bg-linear-to-br from-[#209f00] via-emerald-600 to-teal-700 text-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back Button */}
        <Link href="/treatments">
          <Button variant="ghost" className="mb-6 text-white hover:bg-white/20 hover:text-white">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Treatments
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-medium">{treatment.category}</span>
              {treatment.featured && (
                <>
                  <span className="text-white/50">•</span>
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">Featured</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {treatment.title}
            </h1>

            {/* Short Description */}
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {treatment.shortDescription}
            </p>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Clock className="w-8 h-8 mb-3" />
                <div className="text-sm text-white/80 mb-1">Duration</div>
                <div className="text-xl font-bold">{treatment.duration}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <DollarSign className="w-8 h-8 mb-3" />
                <div className="text-sm text-white/80 mb-1">Cost Range</div>
                <div className="text-xl font-bold">{treatment.price}</div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
