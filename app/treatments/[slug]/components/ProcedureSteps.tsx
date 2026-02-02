import { Treatment } from '../../types';
import { ClipboardList } from 'lucide-react';

interface ProcedureStepsProps {
  treatment: Treatment;
}

export default function ProcedureSteps({ treatment }: ProcedureStepsProps) {
  return (
    <section className="py-16 bg-white px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-[#209f00]/10 rounded-xl">
              <ClipboardList className="w-6 h-6 text-[#209f00]" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Procedure Steps</h2>
              <p className="text-gray-600 mt-1">What happens during this treatment</p>
            </div>
          </div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#209f00] to-emerald-300"></div>

            {/* Steps */}
            <div className="space-y-8">
              {treatment.procedures.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Step Number */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#209f00] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-3">
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                      <h3 className="font-bold text-gray-900 text-lg mb-2">
                        Step {index + 1}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-12 bg-linear-to-br from-[#209f00] to-emerald-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to Get Started?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our medical team is here to answer your questions and schedule a consultation to discuss your treatment options.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-white text-[#209f00] rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Schedule Consultation
              </a>
              <a
                href="tel:+1234567890"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
