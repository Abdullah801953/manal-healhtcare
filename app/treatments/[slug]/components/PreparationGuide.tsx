import { ClipboardCheck, AlertCircle } from 'lucide-react';

interface PreparationStep {
  category: string;
  instructions: string[];
}

const preparationSteps: PreparationStep[] = [
  {
    category: 'Before Your Appointment',
    instructions: [
      'Complete all required pre-procedure tests and lab work',
      'Provide complete medical history including medications and allergies',
      'Arrange for transportation to and from the facility',
      'Confirm your appointment 24-48 hours in advance',
    ],
  },
  {
    category: 'Medication Instructions',
    instructions: [
      'Review current medications with your doctor',
      'Stop blood thinners if instructed (aspirin, warfarin, etc.)',
      'Continue essential medications unless told otherwise',
      'Bring a list of all current medications and supplements',
    ],
  },
  {
    category: 'Day Before Procedure',
    instructions: [
      'Follow fasting instructions if provided (typically 8-12 hours)',
      'Shower and wash with antibacterial soap if recommended',
      'Avoid alcohol and smoking',
      'Get adequate rest and sleep',
    ],
  },
  {
    category: 'Day of Procedure',
    instructions: [
      'Wear comfortable, loose-fitting clothing',
      'Leave valuables and jewelry at home',
      'Bring insurance cards and identification',
      'Arrive at the scheduled time (usually 1-2 hours before)',
    ],
  },
];

const importantReminders = [
  'Inform staff if you feel unwell or have fever/infection',
  'Ask questions if you don\'t understand any instructions',
  'Have someone stay with you for 24 hours post-procedure',
  'Keep emergency contact numbers readily available',
];

export default function PreparationGuide() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <ClipboardCheck className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Preparation Guide</h2>
              <p className="text-gray-600 mt-1">How to prepare for your treatment</p>
            </div>
          </div>

          {/* Preparation Steps */}
          <div className="space-y-6 mb-8">
            {preparationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#209f00] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  {step.category}
                </h3>
                <ul className="space-y-3">
                  {step.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <svg
                        className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Important Reminders */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-gray-900">
                Important Reminders
              </h3>
            </div>
            <ul className="space-y-3">
              {importantReminders.map((reminder, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0 mt-2"></span>
                  <span className="font-medium">{reminder}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Checklist CTA */}
          <div className="mt-8 text-center">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#209f00] text-[#209f00] rounded-full font-semibold hover:bg-[#209f00] hover:text-white transition-colors shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Preparation Checklist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
