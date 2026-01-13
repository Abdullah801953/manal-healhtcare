"use client";

import { useState } from 'react';
import { testimonials } from './data';
import { TestimonialsHero } from './components/TestimonialsHero';
import { TestimonialCard } from './components/TestimonialCard';
import { Pagination } from './components/Pagination';
import { WhyTrustUs } from './components/WhyTrustUs';
import { CTASection } from './components/CTASection';

const ITEMS_PER_PAGE = 9;

export default function TestimonialsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTestimonials = testimonials.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <main>
      {/* Hero Section */}
      <TestimonialsHero />

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Results Count */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Patient Testimonials
              <span className="ml-3 text-xl font-normal text-gray-600">
                ({testimonials.length} verified reviews)
              </span>
            </h2>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {paginatedTestimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      {/* Why Trust Us Section */}
      <WhyTrustUs />

      {/* CTA Section */}
      <CTASection />

      {/* SEO Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Authentic Patient Testimonials from Around the World
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              At Manal Healthcare, we are proud to have served thousands of international patients 
              seeking world-class medical treatment in India. Our patient testimonials reflect the 
              quality of care, medical expertise, and compassionate service that define our healthcare 
              network. Each testimonial is verified and represents a real patient's journey from 
              diagnosis to recovery.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Why International Patients Choose Manal Healthcare
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Medical tourism has grown significantly, and India has emerged as a leading destination 
              for affordable, high-quality healthcare. Manal Healthcare stands out for several reasons:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li>• World-renowned doctors and specialists with international training</li>
              <li>• State-of-the-art medical facilities with latest technology</li>
              <li>• Affordable treatment costs - up to 70% less than Western countries</li>
              <li>• Comprehensive care from consultation to post-treatment follow-up</li>
              <li>• Dedicated international patient services and language support</li>
              <li>• Accredited hospitals meeting global quality standards</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Comprehensive Medical Treatments and Specialties
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our testimonials showcase successful outcomes across diverse medical specialties including 
              cardiac surgery, orthopedic procedures, cancer treatment, cosmetic surgery, neurosurgery, 
              organ transplants, fertility treatments, and more. Each patient story demonstrates our 
              commitment to clinical excellence and patient satisfaction.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Verified Reviews You Can Trust
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Every testimonial on this page is verified and comes from patients who have completed 
              their treatment at Manal Healthcare facilities. We maintain transparency in sharing 
              both the successes and challenges faced during medical journeys, ensuring you make 
              informed decisions about your healthcare needs.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
