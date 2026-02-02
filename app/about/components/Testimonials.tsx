import { Quote } from 'lucide-react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'The care I received at Manal Healthcare was exceptional. The doctors took time to listen, explain everything clearly, and made me feel comfortable throughout my treatment. I highly recommend them to anyone seeking quality healthcare.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Patient Family Member',
      content: 'When my father needed emergency care, the team at Manal Healthcare responded immediately with professionalism and compassion. Their 24/7 support gave our family peace of mind during a difficult time.',
      rating: 5,
    },
    {
      name: 'Emily Roberts',
      role: 'Regular Patient',
      content: 'I\'ve been coming here for annual checkups for years. The staff is always friendly, the facilities are clean and modern, and I never have to wait long. It\'s healthcare done right.',
      rating: 5,
    },
    {
      name: 'David Martinez',
      role: 'Patient',
      content: 'The specialists here are top-notch. They diagnosed my condition quickly and created a treatment plan that worked perfectly. I\'m grateful for their expertise and caring approach.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Patients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real stories from real patients who have experienced the quality and compassion 
            of care at Manal Healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:border-[#209f00] transition-all"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#209f00]/20" />
              
              <div className="relative">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#209f00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 flex-wrap justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#209f00] mb-2">4.9/5</div>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#209f00] mb-2">5,000+</div>
              <p className="text-gray-600">Patient Reviews</p>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#209f00] mb-2">98%</div>
              <p className="text-gray-600">Would Recommend</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
