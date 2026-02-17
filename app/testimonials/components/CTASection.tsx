"use client";

import { Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-16 bg-linear-to-br from-[#209f00] to-[#1a8000]">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Begin Your Medical Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied patients who trusted us with their health. 
            Get a free consultation and personalized treatment plan today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#209f00] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Get Free Consultation
            </Link>
            <Link
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-75 mb-4">Available 24/7 for Emergency Consultations</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91-123-456-7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>contact@manalhealthcare.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
