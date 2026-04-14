import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Manal Healthcare - Medical Tourism Services",
  description:
    "Read the terms and conditions for using Manal Healthcare's medical tourism services. Understand your rights, responsibilities, and our service agreements.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://manalhealthcare.com/info/terms-conditions",
  },
};

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: [
      "By using this website, you agree to follow these Terms & Conditions.",
      "If you do not agree, please do not use the platform.",
    ],
  },
  {
    number: "02",
    title: "Platform Role",
    content: [
      "Manal Healthcare is a facilitation platform. We are not a hospital, clinic, or medical provider.",
      "We only connect users with independent healthcare professionals and institutions.",
    ],
  },
  {
    number: "03",
    title: "User Responsibility",
    intro: "You agree to:",
    items: [
      "Provide accurate and complete information",
      "Use the platform responsibly",
      "Not misuse or attempt to harm the platform",
    ],
  },
  {
    number: "04",
    title: "No Medical Advice",
    content: [
      "The platform does not provide medical advice, diagnosis, or treatment.",
      "Always consult a qualified healthcare professional.",
    ],
  },
  {
    number: "05",
    title: "Independent Providers",
    content: [
      "All doctors, hospitals, and clinics listed are independent.",
      "They are solely responsible for their services and medical care.",
    ],
  },
  {
    number: "06",
    title: "No Guarantees",
    intro: "We do not guarantee:",
    items: [
      "Availability of doctors or services",
      "Treatment outcomes",
      "Accuracy of information",
    ],
  },
  {
    number: "07",
    title: "Appointments & Services",
    items: [
      "Appointment availability depends on the provider",
      "We do not guarantee confirmation or scheduling",
      "Delays or cancellations may occur",
    ],
  },
  {
    number: "08",
    title: "Payments & Costs",
    items: [
      "Any cost shown is approximate",
      "Final pricing is decided by the provider",
      "We are not responsible for billing disputes",
    ],
  },
  {
    number: "09",
    title: "Limitation of Liability",
    intro: "Manal Healthcare is not responsible for:",
    items: [
      "Medical decisions or outcomes",
      "Complications or damages",
      "Delays, cancellations, or service issues",
    ],
  },
  {
    number: "10",
    title: "Website Use",
    intro: "You agree not to:",
    items: [
      "Use the site for unlawful purposes",
      "Attempt to hack, damage, or disrupt the platform",
    ],
  },
  {
    number: "11",
    title: "Intellectual Property",
    content: [
      "All content on this website belongs to Manal Healthcare and may not be copied or reused without permission.",
    ],
  },
  {
    number: "12",
    title: "Privacy",
    content: [
      "Your use of the platform is also governed by our Privacy Policy.",
    ],
  },
  {
    number: "13",
    title: "Changes to Terms",
    content: [
      "We may update these Terms at any time.",
      "Continued use of the website means you accept the updated terms.",
    ],
  },
  {
    number: "14",
    title: "Termination",
    content: [
      "We reserve the right to restrict or terminate access if terms are violated.",
    ],
  },
  {
    number: "15",
    title: "Governing Law",
    content: [
      "These Terms shall be governed by the laws of India.",
    ],
  },
];

export default function TermsConditionsPage() {
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
            Terms & Conditions
          </h1>
          <p className="text-white/70 text-base">
            Last Updated: January 15, 2026 &nbsp;·&nbsp; Manal Health Care
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-16 max-w-5xl">

        {/* Intro notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-12 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-[#209f00] rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            Please read these Terms & Conditions carefully before using the Manal Health Care website or services.
            By accessing or using our platform, you acknowledge that you have read, understood, and agreed to be bound by these terms.
          </p>
        </div>

        {/* Sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((section) => (
            <div
              key={section.number}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Card header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <span className="text-xs font-bold text-[#209f00] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full tracking-widest flex-shrink-0">
                  {section.number}
                </span>
                <h2 className="text-sm font-semibold text-gray-900">{section.title}</h2>
              </div>

              {/* Card body */}
              <div className="px-6 py-5 flex-1 space-y-3">
                {"content" in section && section.content?.map((para, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                ))}
                {"intro" in section && section.intro && (
                  <p className="text-gray-600 text-sm leading-relaxed">{section.intro}</p>
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
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-red-800 mb-1">Emergency Notice</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              This platform is not meant for emergencies. In case of a medical emergency, immediately call local emergency services (dial <strong>108</strong> or <strong>102</strong> in India) or visit the nearest hospital. Do not rely on this platform for urgent medical assistance.
            </p>
          </div>
        </div>

        {/* Medical Disclaimer notice */}
        <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20A10 10 0 0012 2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Important Medical Disclaimer</h3>
            <p className="text-amber-800 text-sm leading-relaxed">
              Manal Healthcare is a medical tourism facilitator, not a medical provider. All medical services are provided by independent, licensed healthcare professionals. We do not provide medical advice, make diagnoses, or guarantee medical outcomes. Always consult qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </div>

        {/* Contact / Acknowledgement Section */}
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
            <h2 className="text-xl font-semibold text-white mb-1">Contact & Acknowledgement</h2>
            <p className="text-white/60 text-sm mb-6">
              By using our services, you confirm you have read and agreed to these Terms & Conditions.
              For any questions, reach us at:
            </p>
            <p className="text-white font-semibold text-lg mb-6">Manal Health Care</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "📧", label: "Email", value: "support@manalhealthcare.com" },
                { icon: "📞", label: "Phone", value: "+91 7394966566" },
                { icon: "🌐", label: "Website", value: "manalhealthcare.com" },
                { icon: "📍", label: "Location", value: "India" },
              ].map((contact) => (
                <div
                  key={contact.label}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-5 py-4"
                >
                  <p className="text-white/60 text-xs mb-1">{contact.icon} {contact.label}</p>
                  <p className="text-white text-sm font-medium break-all">{contact.value}</p>
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