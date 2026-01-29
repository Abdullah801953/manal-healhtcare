import { Calendar, Activity, CheckCircle } from 'lucide-react';

interface RecoveryPhase {
  phase: string;
  timeframe: string;
  activities: string[];
  icon: 'calendar' | 'activity' | 'check';
}

const recoveryTimeline: RecoveryPhase[] = [
  {
    phase: 'Immediate Post-Procedure',
    timeframe: '0-24 Hours',
    activities: [
      'Rest and monitoring in recovery area',
      'Pain management and comfort care',
      'Initial assessment by medical staff',
      'Instructions for immediate care',
    ],
    icon: 'calendar',
  },
  {
    phase: 'Early Recovery',
    timeframe: '1-7 Days',
    activities: [
      'Gradual return to light activities',
      'Follow medication schedule',
      'Attend first follow-up appointment',
      'Monitor for any complications',
    ],
    icon: 'activity',
  },
  {
    phase: 'Intermediate Recovery',
    timeframe: '1-4 Weeks',
    activities: [
      'Increase activity level progressively',
      'Physical therapy if recommended',
      'Return to work (if cleared)',
      'Continue prescribed medications',
    ],
    icon: 'activity',
  },
  {
    phase: 'Full Recovery',
    timeframe: '4-12 Weeks',
    activities: [
      'Resume normal daily activities',
      'Complete physical therapy program',
      'Final assessment and clearance',
      'Long-term wellness planning',
    ],
    icon: 'check',
  },
];

const IconComponent = ({ type }: { type: string }) => {
  const className = 'w-6 h-6';
  switch (type) {
    case 'calendar':
      return <Calendar className={className} />;
    case 'activity':
      return <Activity className={className} />;
    case 'check':
      return <CheckCircle className={className} />;
    default:
      return <Calendar className={className} />;
  }
};

export default function RecoveryTimeline() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Recovery Timeline
            </h2>
            <p className="text-gray-600 text-lg">
              What to expect during your recovery journey
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#209f00] via-emerald-400 to-teal-300 hidden md:block"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {recoveryTimeline.map((phase, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Icon */}
                  <div className="relative z-10 shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#209f00] text-white flex items-center justify-center shadow-lg">
                      <IconComponent type={phase.icon} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {phase.phase}
                        </h3>
                        <span className="px-4 py-1 bg-[#209f00]/10 text-[#209f00] rounded-full text-sm font-semibold">
                          {phase.timeframe}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Note */}
          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Individual Recovery May Vary
            </h4>
            <p className="text-gray-700 text-sm">
              This timeline represents typical recovery expectations. Your actual recovery may be faster or slower depending on your overall health, age, and adherence to post-treatment instructions. Always follow your physician\'s specific recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
