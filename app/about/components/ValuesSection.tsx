import { Shield, Lightbulb, Users2, Sparkles, Clock, Heart } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Every patient deserves empathy, respect, and personalized attention throughout their healthcare journey.',
    },
    {
      icon: Shield,
      title: 'Patient Safety',
      description: 'We maintain the highest standards of safety protocols and quality assurance in all our services.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Embracing cutting-edge medical technology and research to provide the best treatment options.',
    },
    {
      icon: Users2,
      title: 'Collaboration',
      description: 'Working together as a unified team to deliver comprehensive and coordinated patient care.',
    },
    {
      icon: Sparkles,
      title: 'Excellence',
      description: 'Committed to the highest standards of medical practice and continuous professional development.',
    },
    {
      icon: Clock,
      title: 'Accessibility',
      description: 'Making quality healthcare accessible and available to all members of our community.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 bg-linear-to-br from-[#209f00] to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
