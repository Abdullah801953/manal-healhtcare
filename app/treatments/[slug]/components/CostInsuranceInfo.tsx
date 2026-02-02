import { DollarSign, CreditCard, FileText } from 'lucide-react';

interface CostFactor {
  item: string;
  description: string;
}

const costFactors: CostFactor[] = [
  {
    item: 'Procedure Fee',
    description: 'Primary cost for the medical procedure and surgical team',
  },
  {
    item: 'Facility Fee',
    description: 'Hospital or surgical center charges for use of facilities',
  },
  {
    item: 'Anesthesia',
    description: 'Cost of anesthesiologist services and medications',
  },
  {
    item: 'Medical Supplies',
    description: 'Specialized equipment, implants, and consumables',
  },
  {
    item: 'Pre-operative Tests',
    description: 'Lab work, imaging, and diagnostic tests required',
  },
  {
    item: 'Post-operative Care',
    description: 'Follow-up visits, medications, and rehabilitation',
  },
];

const insuranceProviders = [
  'Medicare',
  'Medicaid',
  'Blue Cross Blue Shield',
  'United Healthcare',
  'Aetna',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
];

export default function CostInsuranceInfo() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Cost & Insurance Information
            </h2>
            <p className="text-gray-600 text-lg">
              Understanding your treatment investment and coverage options
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Cost Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[#209f00]/10 rounded-xl">
                  <DollarSign className="w-6 h-6 text-[#209f00]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Cost Components
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                Treatment costs vary based on individual needs. Typical components include:
              </p>

              <div className="space-y-4">
                {costFactors.map((factor, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#209f00]/10 text-[#209f00] flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">
                        {factor.item}
                      </div>
                      <div className="text-sm text-gray-600">
                        {factor.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Final costs depend on complexity, duration, and your specific medical needs. Request a detailed estimate during your consultation.
                </p>
              </div>
            </div>

            {/* Insurance Information */}
            <div className="space-y-8">
              {/* Accepted Insurance */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#209f00]/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-[#209f00]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Insurance Accepted
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">
                  We work with most major insurance providers:
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {insuranceProviders.map((provider, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 font-medium"
                    >
                      <svg className="w-5 h-5 text-[#209f00]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {provider}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#209f00]/10 rounded-xl">
                    <FileText className="w-6 h-6 text-[#209f00]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Payment Options
                  </h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Insurance Coverage:</strong> Direct billing to your insurance provider</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Flexible Payment Plans:</strong> Interest-free financing available</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>HSA/FSA:</strong> Health savings and flexible spending accounts accepted</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700">
                    <svg className="w-5 h-5 text-[#209f00] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span><strong>Multiple Payment Methods:</strong> Credit cards, debit cards, and cash</span>
                  </li>
                </ul>

                <div className="mt-6">
                  <a
                    href="/contact"
                    className="block w-full text-center px-6 py-3 bg-[#209f00] text-white rounded-full font-semibold hover:bg-[#1a8000] transition-colors"
                  >
                    Verify Insurance Coverage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
