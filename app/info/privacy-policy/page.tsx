import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Manal Healthcare - Medical Tourism Services",
  description: "Read Manal Healthcare's privacy policy. Learn how we collect, use, protect, and manage your personal and medical information in compliance with international privacy regulations.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://manalhealthcare.com/info/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 15, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            At Manal Healthcare (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we are committed to protecting your privacy 
            and ensuring the security of your personal and medical information. This Privacy Policy explains how we 
            collect, use, disclose, and safeguard your information when you use our medical tourism services and website.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Personal Information</h3>
          <p>We collect personal information that you voluntarily provide to us, including:</p>
          <ul>
            <li><strong>Identity Information:</strong> Full name, date of birth, gender, passport number, nationality</li>
            <li><strong>Contact Information:</strong> Email address, phone number, mailing address, emergency contact details</li>
            <li><strong>Financial Information:</strong> Payment card details, bank account information (for payments)</li>
            <li><strong>Travel Information:</strong> Passport details, visa information, travel dates, flight details</li>
          </ul>

          <h3>1.2 Medical Information</h3>
          <p>To facilitate your medical care, we collect:</p>
          <ul>
            <li>Medical history and current medical conditions</li>
            <li>Diagnostic test results and imaging studies</li>
            <li>Treatment plans and medical reports</li>
            <li>Medications and allergies</li>
            <li>Insurance information</li>
            <li>Previous surgical history</li>
            <li>Family medical history (when relevant)</li>
          </ul>

          <h3>1.3 Information Collected Automatically</h3>
          <p>When you visit our website, we automatically collect:</p>
          <ul>
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Geographic location data</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>

          <h2>2. How We Use Your Information</h2>

          <h3>2.1 Primary Purposes</h3>
          <p>We use your information to:</p>
          <ul>
            <li><strong>Facilitate Medical Care:</strong> Coordinate your treatment with hospitals and doctors</li>
            <li><strong>Arrange Services:</strong> Book appointments, arrange travel, secure accommodation</li>
            <li><strong>Communication:</strong> Respond to inquiries, provide updates, share medical information</li>
            <li><strong>Process Payments:</strong> Handle financial transactions securely</li>
            <li><strong>Visa Assistance:</strong> Help with medical visa applications</li>
            <li><strong>Follow-up Care:</strong> Coordinate post-treatment support and monitoring</li>
          </ul>

          <h3>2.2 Secondary Purposes</h3>
          <p>With your consent, we may use your information to:</p>
          <ul>
            <li>Send marketing communications about our services</li>
            <li>Conduct satisfaction surveys and quality improvement studies</li>
            <li>Provide educational content about medical procedures</li>
            <li>Share anonymized success stories (with explicit permission only)</li>
          </ul>

          <h3>2.3 Legal Obligations</h3>
          <p>We may use your information to:</p>
          <ul>
            <li>Comply with applicable laws and regulations</li>
            <li>Respond to legal requests and prevent fraud</li>
            <li>Protect our rights and the safety of our users</li>
            <li>Enforce our terms and conditions</li>
          </ul>

          <h2>3. How We Share Your Information</h2>

          <h3>3.1 Medical Service Providers</h3>
          <p>
            We share your medical information with hospitals, doctors, and healthcare professionals involved in your 
            care. This sharing is essential for providing medical services and occurs under strict confidentiality 
            agreements.
          </p>

          <h3>3.2 Service Providers</h3>
          <p>We may share information with third-party service providers who assist us, including:</p>
          <ul>
            <li>Travel agencies for flight and accommodation bookings</li>
            <li>Visa processing services</li>
            <li>Payment processors for financial transactions</li>
            <li>Cloud storage providers for secure data storage</li>
            <li>Communication platforms for video consultations</li>
          </ul>
          <p>All service providers are contractually obligated to maintain confidentiality and security.</p>

          <h3>3.3 Legal Requirements</h3>
          <p>We may disclose your information when required by law or when we believe disclosure is necessary to:</p>
          <ul>
            <li>Comply with legal obligations or court orders</li>
            <li>Protect our rights, property, or safety</li>
            <li>Prevent fraud or security threats</li>
            <li>Respond to government requests</li>
          </ul>

          <h3>3.4 With Your Consent</h3>
          <p>
            We will never share your information for marketing purposes or with third parties not involved in your 
            care without your explicit consent.
          </p>

          <h2>4. Data Security</h2>

          <h3>4.1 Security Measures</h3>
          <p>We implement robust security measures to protect your information:</p>
          <ul>
            <li><strong>Encryption:</strong> All data transmission uses SSL/TLS encryption</li>
            <li><strong>Access Controls:</strong> Strict access limitations based on role and need</li>
            <li><strong>Secure Storage:</strong> Data stored on encrypted, secure servers</li>
            <li><strong>Regular Audits:</strong> Security assessments and vulnerability testing</li>
            <li><strong>Employee Training:</strong> Staff trained on data protection and confidentiality</li>
            <li><strong>Physical Security:</strong> Secure facilities with controlled access</li>
          </ul>

          <h3>4.2 Data Retention</h3>
          <p>We retain your information for as long as necessary to:</p>
          <ul>
            <li>Provide services and support</li>
            <li>Comply with legal and medical recordkeeping requirements</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          <p>
            Medical records are typically retained for 7-10 years or as required by applicable law. You may request 
            deletion of your personal information, subject to legal and medical requirements.
          </p>

          <h2>5. Your Rights and Choices</h2>

          <h3>5.1 Access and Correction</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal and medical information</li>
            <li>Request corrections to inaccurate information</li>
            <li>Obtain copies of your medical records</li>
            <li>Receive information in portable format</li>
          </ul>

          <h3>5.2 Consent Withdrawal</h3>
          <p>You may withdraw consent for:</p>
          <ul>
            <li>Marketing communications (unsubscribe anytime)</li>
            <li>Non-essential data processing</li>
            <li>Sharing of information beyond what's required for care</li>
          </ul>
          <p>
            Note: Withdrawal of consent may limit our ability to provide services, and some data processing is 
            necessary for legal obligations.
          </p>

          <h3>5.3 Data Deletion</h3>
          <p>
            You may request deletion of your personal information, subject to legal and medical recordkeeping 
            requirements. We will respond to deletion requests within 30 days.
          </p>

          <h3>5.4 Objection and Restriction</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Object to certain data processing activities</li>
            <li>Request restriction of processing in specific circumstances</li>
            <li>Lodge complaints with data protection authorities</li>
          </ul>

          <h2>6. International Data Transfers</h2>

          <p>
            As a medical tourism facilitator, we may transfer your information internationally to provide services. 
            When we transfer data across borders, we ensure appropriate safeguards are in place:
          </p>
          <ul>
            <li>Standard contractual clauses approved by regulatory authorities</li>
            <li>Data transfer agreements with adequate protection measures</li>
            <li>Compliance with applicable international data protection laws</li>
            <li>Verification that recipient countries have adequate protection standards</li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>

          <h3>7.1 Types of Cookies We Use</h3>
          <ul>
            <li><strong>Essential Cookies:</strong> Necessary for website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
          </ul>

          <h3>7.2 Managing Cookies</h3>
          <p>
            You can control cookies through your browser settings. Note that disabling certain cookies may limit 
            website functionality.
          </p>

          <h2>8. Children's Privacy</h2>

          <p>
            Our services are not directed to children under 16. We do not knowingly collect personal information from 
            children. When we provide services to minors, we obtain consent from parents or legal guardians and 
            maintain strict confidentiality of all medical information.
          </p>

          <h2>9. Third-Party Links</h2>

          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices of 
            these external sites. We encourage you to review their privacy policies before providing any information.
          </p>

          <h2>10. HIPAA Compliance</h2>

          <p>
            While Manal Healthcare is not a covered entity under the U.S. Health Insurance Portability and 
            Accountability Act (HIPAA), we adhere to HIPAA standards for protecting health information when serving 
            U.S. patients:
          </p>
          <ul>
            <li>Maintaining confidentiality of protected health information</li>
            <li>Implementing appropriate safeguards</li>
            <li>Limiting use and disclosure of health information</li>
            <li>Ensuring business associates maintain privacy standards</li>
          </ul>

          <h2>11. GDPR Compliance</h2>

          <p>
            For patients from the European Union, we comply with the General Data Protection Regulation (GDPR):
          </p>
          <ul>
            <li>Lawful basis for processing personal data</li>
            <li>Transparent privacy notices</li>
            <li>Rights to access, rectification, and erasure</li>
            <li>Data portability and restriction of processing</li>
            <li>Data breach notifications within 72 hours</li>
            <li>Privacy by design and by default</li>
          </ul>

          <h2>12. Changes to This Privacy Policy</h2>

          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. 
            We will notify you of material changes by:
          </p>
          <ul>
            <li>Posting the updated policy on our website with a new &quot;Last Updated&quot; date</li>
            <li>Sending email notifications for significant changes</li>
            <li>Obtaining renewed consent when required by law</li>
          </ul>
          <p>Continued use of our services after changes indicates acceptance of the updated policy.</p>

          <h2>13. Data Protection Officer</h2>

          <p>
            We have appointed a Data Protection Officer (DPO) responsible for overseeing data protection strategy and 
            implementation. You may contact the DPO with questions or concerns about data protection:
          </p>
          <p>
            <strong>Email:</strong> privacy@manalhealthcare.com<br />
            <strong>Phone:</strong> +91-XXX-XXX-XXXX<br />
            <strong>Mail:</strong> Data Protection Officer, Manal Healthcare, [Address]
          </p>

          <h2>14. Contact Us</h2>

          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>

          <div className="bg-gray-50 p-6 rounded-lg mt-6">
            <p><strong>Manal Healthcare</strong></p>
            <p>Email: info@manalhealthcare.com</p>
            <p>Phone: +91-XXX-XXX-XXXX</p>
            <p>Address: [Company Address]</p>
          </div>

          <h2>15. Your Consent</h2>

          <p>
            By using our services, you consent to the collection, use, and sharing of your information as described in 
            this Privacy Policy. For medical information specifically, we obtain explicit consent before collecting and 
            sharing your health data.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Notice</h3>
            <p className="text-gray-700 text-sm">
              Your privacy is our priority. We are committed to transparency in how we handle your information and to 
              providing you with control over your personal data. If you ever have concerns about how your information 
              is being used, please don't hesitate to contact us.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Information Security</h3>
            <p className="text-gray-700 text-sm">
              We take special care to protect your medical information, recognizing its sensitive nature. All medical 
              data is encrypted in transit and at rest, and access is strictly limited to healthcare professionals and 
              staff who need it to provide services to you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
