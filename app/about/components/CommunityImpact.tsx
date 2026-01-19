import { Heart, Users, GraduationCap, TreePine } from 'lucide-react';

export function CommunityImpact() {
  const initiatives = [
    {
      icon: Heart,
      title: 'Free Health Camps',
      description: 'Organizing monthly health screening camps in underserved communities, providing free consultations, diagnostics, and basic treatments to thousands of families.',
      impact: '10,000+ people served annually',
    },
    {
      icon: GraduationCap,
      title: 'Medical Education Programs',
      description: 'Training next generation of healthcare professionals through scholarships, internships, and continuing medical education programs for doctors and nurses.',
      impact: '500+ students trained',
    },
    {
      icon: Users,
      title: 'Senior Care Initiative',
      description: 'Specialized programs for elderly care including home visits, health monitoring, and wellness activities designed to improve quality of life for seniors.',
      impact: '2,000+ seniors supported',
    },
    {
      icon: TreePine,
      title: 'Environmental Health',
      description: 'Sustainable healthcare practices including waste reduction, renewable energy, and community environmental health awareness campaigns.',
      impact: '30% carbon footprint reduction',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community Impact & Social Responsibility
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Beyond providing medical care, we're committed to improving community health through 
            outreach programs, education, and sustainable healthcare practices that benefit everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-16 h-16 bg-[#209f00] rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {initiative.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {initiative.description}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#209f00]/10 px-4 py-2 rounded-full">
                      <span className="text-[#209f00] font-semibold text-sm">
                        {initiative.impact}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership section */}
        <div className="bg-white rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Our Community Partners
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            We collaborate with local organizations, schools, government agencies, and non-profits 
            to create a healthier community. Together, we're making healthcare accessible to all.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Local Schools', 'Community Centers', 'NGO Partners', 'Government Health Dept', 'Senior Living Facilities', 'Sports Organizations'].map((partner, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-100 hover:bg-[#209f00] hover:text-white rounded-full transition-colors cursor-default"
              >
                <span className="font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
