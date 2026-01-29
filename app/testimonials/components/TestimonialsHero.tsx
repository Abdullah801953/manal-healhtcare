"use client";

import { Heart, Users, Globe, Star } from 'lucide-react';

export function TestimonialsHero() {
  return (
    <section className="relative bg-linear-to-br from-[#209f00]/10 via-white to-[#209f00]/5 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#209f00]/10 px-4 py-2 rounded-full mb-6">
            <Heart className="w-5 h-5 text-[#209f00]" />
            <span className="text-[#209f00] font-semibold">
              Patient Success Stories
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Real Stories from Real Patients
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Read authentic testimonials from international patients who chose Manal Healthcare 
            for their medical journey. Over 500 verified success stories from 50+ countries.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-[#209f00]/10 rounded-full mx-auto mb-3">
                <Users className="w-6 h-6 text-[#209f00]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-sm text-gray-600">Patient Reviews</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-[#209f00]/10 rounded-full mx-auto mb-3">
                <Star className="w-6 h-6 text-[#209f00]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-[#209f00]/10 rounded-full mx-auto mb-3">
                <Globe className="w-6 h-6 text-[#209f00]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-[#209f00]/10 rounded-full mx-auto mb-3">
                <Heart className="w-6 h-6 text-[#209f00]" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">98%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
