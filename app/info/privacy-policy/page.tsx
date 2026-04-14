import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Manal Healthcare - Medical Tourism Services",
  description:
    "Read Manal Healthcare's privacy policy. Learn how we collect, use, protect, and manage your personal and medical information.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://manalhealthcare.com/info/privacy-policy",
  },
};

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: [
      "Welcome to Manal Healthcare. Manal Healthcare is a medical tourism facilitation company registered in India. We work as a connecting platform that helps patients — both from India and other countries — get in touch with licensed hospitals, clinics, and medical professionals. We do not provide medical services, diagnosis, or treatment ourselves.",
      "This Privacy Policy explains how we collect, use, store, share, and protect the information you provide while using our website and services. By using our website, you agree to the practices described in this policy.",
      "Manal Healthcare acts only as a facilitator, not a healthcare provider. Any personal or medical information you share with us is used only to help connect you with third-party doctors, hospitals, or healthcare institutions.",
    ],
  },
  {
    number: "02",
    title: "Information We Collect",
    subsections: [
      {
        title: "2.1 Personal Identification Data",
        intro: "When you use our platform, we may collect:",
        items: [
          "Your full name and date of birth",
          "Your nationality and country of residence",
          "Your email address and phone number",
          "Passport or government ID details (if needed for international coordination)",
          "Your communication or messages with our team",
        ],
      },
      {
        title: "2.2 Medical Information (User-Submitted)",
        intro: "To help us connect you with the right doctor or hospital, you may choose to share:",
        items: [
          "Details about your medical condition or concern",
          "Your past treatment history or medical reports (uploaded or described)",
          "Your preferred treatment, hospital, or specialist",
          "The urgency or timeline of your treatment",
        ],
        note: "This information is shared only with the healthcare providers you are being referred to, and only for the purpose of helping you get proper care.",
      },
      {
        title: "2.3 Technical and Usage Data",
        intro: "When you visit our website, we may automatically collect:",
        items: [
          "Your IP address and approximate location",
          "Your browser, device type, and operating system",
          "Pages you visit, time spent, and how you navigate the site",
          "Cookie data and tracking technologies (see Section 8)",
          "Referring links and search terms",
        ],
      },
    ],
  },
  {
    number: "03",
    title: "Purpose of Data Collection",
    intro: "We collect and use your information to:",
    items: [
      "Understand your medical needs and connect you with suitable healthcare providers",
      "Schedule appointments and communicate with hospitals or doctors on your behalf",
      "Help with travel and arrangements if requested",
      "Send updates, confirmations, and service-related messages",
      "Improve our website and services",
      "Meet legal requirements under Indian law",
      "Respond to your questions and provide support",
    ],
    note: "We do not use your data for unrelated commercial purposes, and we will not send you marketing messages without your clear consent.",
  },
  {
    number: "04",
    title: "Data Sharing and Disclosure",
    subsections: [
      {
        title: "4.1 Healthcare Providers",
        content:
          "With your knowledge, we share necessary personal and medical details with hospitals, clinics, and doctors only to help coordinate your treatment.",
      },
      {
        title: "4.2 Third-Party Service Partners",
        content:
          "We may work with trusted third parties such as travel agents, accommodation providers, and technical service providers. They are required to keep your information confidential and use it only for the intended purpose.",
      },
      {
        title: "4.3 Legal and Regulatory Disclosure",
        items: [
          "We may share your information if required by law, court orders, or government authorities, or to protect the rights and safety of Manal Healthcare or others.",
          "We do not sell, rent, or trade your personal information to anyone for marketing or commercial purposes.",
        ],
      },
    ],
  },
  {
    number: "05",
    title: "International Data Transfers",
    items: [
      "Since we connect patients with healthcare providers around the world, your data may be transferred to or processed in other countries. These countries may have different data protection laws than your own.",
      "In such cases, we take reasonable steps to ensure your data is handled safely and in line with applicable laws, including GDPR (where applicable) and Indian data protection laws.",
      "By using our services, you agree to such transfers when needed for your treatment coordination.",
    ],
  },
  {
    number: "06",
    title: "Data Protection and Security Measures",
    intro: "We take reasonable steps to protect your personal and medical data, including:",
    items: [
      "Using encryption (SSL/TLS) during data transfer",
      "Limiting access to authorized staff only",
      "Secure storage of documents and records",
      "Regular checks of our data practices",
    ],
    note: "However, no system on the internet is completely secure, and we cannot guarantee absolute security. You share information at your own risk.",
  },
  {
    number: "07",
    title: "Your Rights as a Data Subject",
    intro: "Depending on applicable laws, you have the right to:",
    items: [
      "Access the data we hold about you",
      "Correct any incorrect or incomplete information",
      "Request deletion of your data (where legally allowed)",
      "Withdraw your consent at any time",
      "Object to certain types of data use",
      "Request your data in a structured format",
    ],
    note: "To use any of these rights, please contact us using the details below.",
  },
  {
    number: "08",
    title: "Cookies and Tracking Technologies",
    intro: "We use cookies to improve your experience and understand how our website is used. These include:",
    items: [
      "Essential cookies (for basic functionality)",
      "Analytics cookies (to understand website usage)",
      "Preference cookies (to remember your settings)",
    ],
    note: "You can control or disable cookies through your browser settings, but some features may not work properly if you do.",
  },
  {
    number: "09",
    title: "Third-Party Links and External Websites",
    content: [
      "Our website may contain links to other websites, such as hospitals or clinics. These websites have their own privacy policies, and we are not responsible for their content or practices.",
      "We recommend reviewing their privacy policies before sharing any information.",
    ],
  },
  {
    number: "10",
    title: "Updates to This Policy",
    content: [
      "We may update this Privacy Policy from time to time. Any important changes will be posted on this page with a new effective date.",
      "By continuing to use our website, you accept the updated policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-white/70 text-base">
            Effective Date: January 15, 2026 &nbsp;·&nbsp; Manal Health Care
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
            This policy applies to all users of the Manal Health Care website and services. Please read it carefully.
            If you have any questions, contact us at <span className="text-[#209f00] font-medium">support@manalhealthcare.com</span> or call <span className="text-[#209f00] font-medium">+91 7394966566</span>.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.number}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 px-8 py-5 border-b border-gray-100">
                <span className="text-xs font-bold text-[#209f00] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full tracking-widest flex-shrink-0">
                  {section.number}
                </span>
                <h2 className="text-base font-semibold text-gray-900">{section.title}</h2>
              </div>

              {/* Section body */}
              <div className="px-8 py-6 space-y-4">

                {/* Plain paragraphs */}
                {"content" in section && Array.isArray(section.content) && section.content.map((para, i) => (
                  <p key={i} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                ))}

                {/* Intro + bullet list */}
                {"intro" in section && section.intro && (
                  <p className="text-gray-600 text-sm leading-relaxed">{section.intro}</p>
                )}
                {"items" in section && section.items && !("subsections" in section) && (
                  <ul className="space-y-2.5">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#209f00] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {"note" in section && section.note && (
                  <p className="text-gray-500 text-xs italic border-l-2 border-emerald-300 pl-3 mt-2">
                    {section.note}
                  </p>
                )}

                {/* Subsections */}
                {"subsections" in section && section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((sub, si) => (
                      <div key={si} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">{sub.title}</h3>
                        {"content" in sub && sub.content && (
                          <p className="text-gray-600 text-sm leading-relaxed">{sub.content}</p>
                        )}
                        {"intro" in sub && sub.intro && (
                          <p className="text-gray-600 text-sm mb-2">{sub.intro}</p>
                        )}
                        {"items" in sub && sub.items && (
                          <ul className="space-y-2">
                            {sub.items.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-3 text-sm text-gray-600">
                                <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#209f00] rounded-full" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                        {"note" in sub && sub.note && (
                          <p className="text-gray-500 text-xs italic border-l-2 border-emerald-300 pl-3 mt-3">
                            {sub.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-10 bg-gradient-to-br from-[#209f00] via-emerald-600 to-teal-700 rounded-2xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-white/70 bg-white/15 border border-white/20 px-3 py-1 rounded-full tracking-widest">11</span>
              <h2 className="text-xl font-semibold text-white">Contact Information</h2>
            </div>
            <p className="text-white/60 text-sm mb-6">Have questions about this policy? We're here to help.</p>
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