import { CheckCircle, Shield, Clock, Users, Award, Stethoscope } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    {
      icon: Shield,
      title: 'Advanced Medical Technology',
      description: 'State-of-the-art equipment and cutting-edge medical technology ensure accurate diagnosis and effective treatment for all our patients.',
    },
    {
      icon: Users,
      title: 'Expert Medical Team',
      description: 'Board-certified physicians and healthcare professionals with decades of combined experience in specialized medical fields.',
    },
    {
      icon: Clock,
      title: '24/7 Emergency Care',
      description: 'Round-the-clock emergency services with rapid response teams ready to handle critical medical situations at any time.',
    },
    {
      icon: Award,
      title: 'Award-Winning Care',
      description: 'Recognized nationally for excellence in patient care, safety standards, and medical innovation by leading healthcare organizations.',
    },
    {
      icon: Stethoscope,
      title: 'Comprehensive Services',
      description: 'Full spectrum of medical services from preventive care to specialized treatments, all under one roof for your convenience.',
    },
    {
      icon: CheckCircle,
      title: 'Patient-Centered Approach',
      description: 'Personalized treatment plans tailored to individual needs, ensuring every patient receives the care and attention they deserve.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Manal Healthcare?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We combine medical excellence with compassionate care to deliver exceptional healthcare 
            services that exceed expectations. Our commitment to quality and patient satisfaction 
            sets us apart as a leading healthcare provider.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-8 hover:border-[#209f00] transition-all group"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100 group-hover:text-[#209f00]/10 transition-colors">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                <div className="relative">
                  <div className="w-14 h-14 bg-[#209f00] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
