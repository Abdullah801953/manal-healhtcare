import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  age: number;
  condition: string;
  rating: number;
  review: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    age: 52,
    condition: 'Recovered Patient',
    rating: 5,
    review: 'The entire experience exceeded my expectations. The medical team was professional, caring, and kept me informed every step of the way. Recovery was smoother than I anticipated, and I\'m grateful for the excellent care.',
    date: 'December 2025',
  },
  {
    name: 'Michael Chen',
    age: 45,
    condition: 'Successfully Treated',
    rating: 5,
    review: 'I was nervous about the procedure, but the doctors made me feel comfortable and explained everything clearly. The results have been life-changing, and I would highly recommend this treatment to anyone facing similar health challenges.',
    date: 'November 2025',
  },
  {
    name: 'Emily Rodriguez',
    age: 38,
    condition: 'Post-Treatment',
    rating: 5,
    review: 'Outstanding medical care from start to finish. The state-of-the-art facilities and compassionate staff made all the difference. I\'m now back to my normal activities and feeling better than I have in years.',
    date: 'October 2025',
  },
];

export default function PatientTestimonials() {
  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Patient Success Stories
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from patients who underwent this treatment
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow"
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-[#209f00]/10">
                  <Quote className="w-12 h-12 fill-current" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#209f00] text-[#209f00]" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                  &quot;{testimonial.review}&quot;
                </p>

                {/* Patient Info */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">
                    {testimonial.condition} • Age {testimonial.age}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{testimonial.date}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Individual results may vary. These testimonials reflect individual patient experiences and are not a guarantee of similar outcomes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
