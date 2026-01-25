import { Award, Users, Clock, TrendingUp } from 'lucide-react';

const whyChooseUs = [
  {
    icon: Award,
    title: 'Expert Medical Team',
    description: 'Board-certified physicians with extensive experience in advanced treatment procedures',
  },
  {
    icon: Users,
    title: 'Patient-Centered Care',
    description: 'Personalized treatment plans tailored to your unique needs and health goals',
  },
  {
    icon: Clock,
    title: 'Minimal Wait Times',
    description: 'Efficient scheduling and streamlined processes for faster access to care',
  },
  {
    icon: TrendingUp,
    title: 'Proven Success Rates',
    description: 'Track record of excellent outcomes and high patient satisfaction scores',
  },
];

export default function WhyChooseSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Choose Manal Healthcare
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We combine cutting-edge medical technology with compassionate care to deliver exceptional treatment outcomes
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00]/10 rounded-2xl mb-4 group-hover:bg-[#209f00] transition-colors">
                    <Icon className="w-8 h-8 text-[#209f00] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 p-8 bg-linear-to-br from-[#209f00] to-emerald-600 rounded-3xl text-white">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/80 text-sm">Years of Excellence</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80 text-sm">Successful Procedures</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-white/80 text-sm">Patient Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-white/80 text-sm">Medical Specialists</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
