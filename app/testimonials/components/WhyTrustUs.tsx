"use client";

import { Shield, Award, Heart, TrendingUp } from 'lucide-react';

export function WhyTrustUs() {
  const features = [
    {
      icon: Shield,
      title: 'Verified Reviews',
      description: 'All testimonials are verified from real patients who received treatment at our facilities.',
    },
    {
      icon: Award,
      title: 'World-Class Care',
      description: 'Our hospitals are accredited by international organizations with highest quality standards.',
    },
    {
      icon: Heart,
      title: 'Patient-Centered',
      description: 'We prioritize patient comfort, safety, and satisfaction throughout the treatment journey.',
    },
    {
      icon: TrendingUp,
      title: '98% Success Rate',
      description: 'High success rates across all specialties with continuous improvement initiatives.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Patients Trust Manal Healthcare
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied patients from around the world who chose us for their medical care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 bg-[#209f00]/10 rounded-full mb-4">
                <feature.icon className="w-7 h-7 text-[#209f00]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
