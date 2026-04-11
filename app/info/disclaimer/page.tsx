import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Manal Healthcare - Medical Tourism Services",
  description:
    "Read the medical disclaimer for Manal Healthcare. Important legal information about our role as a facilitator, medical advice, liability, and third-party providers.",
  robots: "index, follow",
  alternates: {
    canonical: "https://manalhealthcare.com/info/disclaimer",
  },
};

const sections = [
  {
    number: "01",
    title: "General Information",
    icon: "ℹ️",
    content:
      "All information on this website is provided for general informational purposes only. We aim to keep it helpful and updated, but it may not always be complete or current.",
  },
  {
    number: "02",
    title: "No Medical Advice",
    icon: "🩺",
    content:
      "The content on this platform is not medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns.",
  },
  {
    number: "03",
    title: "No Doctor–Patient Relationship",
    icon: "🤝",
    content:
      "Using this website does not create a doctor–patient relationship between you and Manal Healthcare or any listed provider.",
  },
  {
    number: "04",
    title: "Our Role",
    icon: "🏢",
    content:
      "Manal Healthcare is only a facilitator. We are not a hospital, clinic, or medical provider. We simply help connect patients with independent doctors and healthcare institutions.",
  },
  {
    number: "05",
    title: "Independent Providers",
    icon: "🏥",
    content:
      "All doctors, hospitals, and clinics listed on this platform operate independently and are fully responsible for the care and services they provide.",
  },
  {
    number: "06",
    title: "No Verification or Endorsement",
    icon: "✅",
    content:
      "We do not verify or guarantee the qualifications, credentials, or services of any listed provider.",
  },
  {
    number: "07",
    title: "No Guarantees",
    icon: "⚠️",
    items: [
      "Treatment outcomes",
      "Accuracy of information",
      "Expected results",
    ],
    intro: "We do not guarantee:",
  },
  {
    number: "08",
    title: "Use at Your Own Risk",
    icon: "⚡",
    content:
      "Any action you take based on the information on this website is strictly at your own risk.",
  },
  {
    number: "09",
    title: "Medical Risks",
    icon: "💊",
    content:
      "All medical treatments and procedures involve risks. It is important to understand these risks before proceeding.",
  },
  {
    number: "10",
    title: "Results May Vary",
    icon: "📊",
    content:
      "Every patient is different. Treatment outcomes can vary from person to person.",
  },
  {
    number: "11",
    title: "Cost Estimates",
    icon: "💰",
    content:
      "Any cost information shared is approximate and may change depending on the provider and treatment.",
  },
  {
    number: "12",
    title: "Limitation of Responsibility",
    icon: "📋",
    content:
      "Manal Healthcare is not responsible for medical decisions, outcomes, complications, or any issues arising from services provided by third parties.",
  },
  {
    number: "13",
    title: "Emergency Notice",
    icon: "🚨",
    content:
      "This platform is not meant for emergencies. If you need urgent care, please contact a doctor or visit the nearest hospital immediately.",
    isEmergency: true,
  },
  {
    number: "14",
    title: "Acceptance of Terms",
    icon: "📝",
    content:
      "By using this website, you acknowledge that you have read and agree to this disclaimer.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#209f00] via-emerald-600 to-teal-700 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 right-20 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-16 py-16">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wide">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Medical Disclaimer
          </h1>
          <p className="text-white/70 text-base">
            Last Updated: April 8, 2026 &nbsp;·&nbsp; Manal Health Care
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16 max-w-5xl">

        {/* Intro notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-12 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#209f00] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Please read this disclaimer carefully before using the Manal Health Care website or services.
            This is a legally binding document. If you have any questions, contact us at the details provided below.
          </p>
        </div>

        {/* Sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((section) => (
            <div
              key={section.number}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col ${
                section.isEmergency
                  ? "border-red-200 md:col-span-2"
                  : "border-gray-100"
              }`}
            >
              {/* Card header */}
              <div
                className={`flex items-center gap-3 px-6 py-4 border-b ${
                  section.isEmergency
                    ? "border-red-100 bg-red-50"
                    : "border-gray-100"
                }`}
              >
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full tracking-widest border ${
                    section.isEmergency
                      ? "text-red-600 bg-red-100 border-red-200"
                      : "text-[#209f00] bg-emerald-50 border-emerald-200"
                  }`}
                >
                  {section.number}
                </span>
                <h2
                  className={`text-sm font-semibold ${
                    section.isEmergency ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  {section.title}
                </h2>
              </div>

              {/* Card body */}
              <div className="px-6 py-5 flex-1">
                {"intro" in section && section.intro && (
                  <p className="text-gray-600 text-sm mb-3">{section.intro}</p>
                )}
                {"items" in section && section.items && (
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#209f00] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {"content" in section && section.content && (
                  <p
                    className={`text-sm leading-relaxed ${
                      section.isEmergency ? "text-red-700 font-medium" : "text-gray-600"
                    }`}
                  >
                    {section.content}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Your Responsibility</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Medical decisions are highly personal. You are ultimately responsible for your own health. We strongly encourage you to conduct independent research and consult qualified medical professionals before proceeding with any treatment.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-6 bg-gradient-to-br from-[#209f00] via-emerald-600 to-teal-700 rounded-2xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative px-8 py-10">
            <h2 className="text-xl font-semibold text-white mb-1">Contact Us</h2>
            <p className="text-white/60 text-sm mb-6">Have questions about this disclaimer? Reach out to us.</p>
            <p className="text-white font-semibold text-lg mb-6">Manal Health Care</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: "📧", label: "Email", value: "info@manalhealthcare.com" },
                { icon: "📞", label: "Phone", value: "+91-XXX-XXX-XXXX" },
                { icon: "🌐", label: "Website", value: "www.manalhealthcare.com" },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-5 py-4"
                >
                  <p className="text-white/60 text-xs mb-1">{contact.icon} {contact.label}</p>
                  <p className="text-white text-sm font-medium">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} Manal Health Care. All rights reserved.
        </p>

      </div>
    </div>
  );
}