"use client";

import { Testimonial } from '../types';
import { Star, MapPin, Calendar, CheckCircle, Quote } from 'lucide-react';
import Image from 'next/image';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const formattedDate = new Date(testimonial.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          {/* Profile Image */}
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="rounded-full object-cover"
            />
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 bg-[#209f00] rounded-full p-1">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Patient Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {testimonial.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span className="text-lg">{testimonial.countryFlag}</span>
              <span>{testimonial.country}</span>
              <span>•</span>
              <span>{testimonial.age} years</span>
            </div>
            {/* Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(testimonial.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : i < testimonial.rating
                      ? 'fill-yellow-200 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-gray-700">
                {testimonial.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Details */}
      <div className="px-6 py-4 bg-gray-50">
        <div className="grid grid-cols-1 gap-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Treatment:</span>{' '}
            <span className="text-gray-600">{testimonial.treatment}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Hospital:</span>{' '}
            <span className="text-gray-600">{testimonial.hospital}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Doctor:</span>{' '}
            <span className="text-gray-600">{testimonial.doctor}</span>
          </div>
        </div>
      </div>

      {/* Testimonial Text */}
      <div className="p-6">
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#209f00]/20" />
          <p className="text-gray-700 leading-relaxed pl-6">
            {testimonial.testimonial.length > 200
              ? `${testimonial.testimonial.substring(0, 200)}...`
              : testimonial.testimonial}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {testimonial.verified && (
          <div className="flex items-center gap-1 text-[#209f00]">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>
    </article>
  );
}
