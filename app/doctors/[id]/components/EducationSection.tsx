import { GraduationCap, Award, Briefcase } from 'lucide-react';

export function EducationSection() {
  const education = [
    {
      icon: GraduationCap,
      title: 'Medical Degree (MD)',
      institution: 'Harvard Medical School',
      year: '2008',
      color: 'blue',
    },
    {
      icon: Award,
      title: 'Board Certification',
      institution: 'American Board of Medical Specialties',
      year: '2012',
      color: 'teal',
    },
    {
      icon: Briefcase,
      title: 'Fellowship',
      institution: 'Johns Hopkins Hospital',
      year: '2010-2012',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    teal: 'bg-teal-50 text-teal-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Education & Certifications</h2>
      
      <div className="space-y-4">
        {education.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-teal-300 transition-colors">
              <div className={`p-3 rounded-lg ${colorClasses[item.color as keyof typeof colorClasses]}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.institution}</p>
                <p className="text-sm text-gray-500 mt-1">{item.year}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
