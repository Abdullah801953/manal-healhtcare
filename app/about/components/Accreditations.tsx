import { Award, CheckCircle2, Shield, Star } from 'lucide-react';

export function Accreditations() {
  const certifications = [
    {
      icon: Award,
      title: 'Joint Commission Accreditation',
      description: 'Gold Seal of Approval for meeting highest standards in patient safety and quality care.',
      year: '2020-2026',
    },
    {
      icon: Shield,
      title: 'ISO 9001:2015 Certified',
      description: 'International quality management system certification for healthcare services.',
      year: 'Current',
    },
    {
      icon: Star,
      title: 'Magnet Recognition',
      description: 'Excellence in nursing services and quality patient outcomes recognition.',
      year: '2021',
    },
    {
      icon: CheckCircle2,
      title: 'HIMSS Stage 7',
      description: 'Highest level of health information technology adoption and optimization.',
      year: '2023',
    },
  ];

  const awards = [
    'Best Healthcare Provider 2024',
    'Patient Safety Excellence Award',
    'Top 100 Hospitals in Patient Experience',
    'Healthcare Innovation Leader',
    'Green Healthcare Facility Award',
    'Community Choice Healthcare Award',
  ];

  return (
    <section className="py-20 px-3 xs:px-4 sm:px-6 lg:px-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Certifications & Recognition
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence is validated through prestigious accreditations and 
            industry recognition from leading healthcare organizations worldwide.
          </p>
        </div>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-[#209f00] transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#209f00] rounded-full mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {cert.description}
                </p>
                <span className="inline-block px-3 py-1 bg-[#209f00]/10 text-[#209f00] text-xs font-semibold rounded-full">
                  {cert.year}
                </span>
              </div>
            );
          })}
        </div>

        {/* Awards */}
        <div className="bg-gradient-to-br from-[#209f00] to-emerald-600 rounded-3xl p-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Recent Awards & Honors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              >
                <Star className="w-6 h-6 text-yellow-300 shrink-0" />
                <span className="text-white font-medium">{award}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
