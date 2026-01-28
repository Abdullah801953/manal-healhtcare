import { Shield, Lightbulb,  Sparkles, Clock, Heart, DollarSign } from 'lucide-react';

export function ValuesSection() {
  const values = [
    {
      icon: Heart,
      title: 'Quality Care',
      description: 'Your health comes first. We partner with reputed Indian hospitals and skilled doctors known for clinical excellence.',
    },
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We believe in clear and honest communication about treatment options, costs, procedures, and timelines.',
    },
    {
      icon: Lightbulb,
      title: 'Personalized Attention',
      description: 'Medical travel can be challenging, so we customize every step of your treatment journey in India to suit your needs.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Solutions',
      description: 'India offers world-class healthcare at competitive costs, and we help you access the best treatment without unnecessary expenses',
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
            What We Value
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
