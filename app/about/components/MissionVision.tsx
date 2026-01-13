import { Target, Eye, Heart } from 'lucide-react';

export function MissionVision() {
  const sections = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To deliver world-class healthcare services that improve the quality of life for our patients through innovative treatments, compassionate care, and medical excellence.',
      color: 'from-emerald-500 to-teal-600',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading healthcare provider recognized for exceptional patient care, medical innovation, and commitment to community health and wellbeing.',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Compassion, integrity, excellence, innovation, and respect guide every decision we make and every interaction we have with our patients and community.',
      color: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Foundation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built on principles of excellence and compassion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 bg-linear-to-br ${section.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {section.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
