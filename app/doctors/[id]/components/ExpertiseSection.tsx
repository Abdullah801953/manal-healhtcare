import { CheckCircle } from 'lucide-react';

export function ExpertiseSection() {
  const expertiseAreas = [
    'Advanced Diagnostic Procedures',
    'Minimally Invasive Surgery',
    'Preventive Care & Consultation',
    'Emergency Medical Response',
    'Chronic Disease Management',
    'Post-Operative Care',
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {expertiseAreas.map((area, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-teal-50 transition-colors">
            <CheckCircle className="w-6 h-6 text-[#209f00] flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 font-medium">{area}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
