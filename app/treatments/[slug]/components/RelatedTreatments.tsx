import Link from 'next/link';
import { Treatment } from '../../types';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface RelatedTreatmentsProps {
  treatments: Treatment[];
}

export default function RelatedTreatments({ treatments }: RelatedTreatmentsProps) {
  if (treatments.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Related Treatments
            </h2>
            <p className="text-gray-600 text-lg">
              Explore other treatments in this specialty
            </p>
          </div>

          {/* Treatments Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {treatments.map((treatment) => (
              <div
                key={treatment.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fill
                  />
                  {treatment.featured && (
                    <div className="absolute top-3 right-3 bg-[#209f00] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-sm text-[#209f00] font-semibold mb-2">
                    {treatment.category}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#209f00] transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {treatment.shortDescription}
                  </p>
                  
                  <Link href={`/treatments/${treatment.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full group/btn hover:bg-[#209f00] hover:text-white hover:border-[#209f00] transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link href="/treatments">
              <Button size="lg" className="bg-[#209f00] hover:bg-[#1a8000] text-white">
                View All Treatments
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
