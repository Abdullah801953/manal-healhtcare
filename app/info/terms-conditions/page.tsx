import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Manal Healthcare - Medical Tourism Services",
  description: "Read the terms and conditions for using Manal Healthcare's medical tourism services. Understand your rights, responsibilities, and our service agreements.",
  robots: "noindex, nofollow",
  alternates: {
    canonical: "https://manalhealthcare.com/info/terms-conditions",
  },
};

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last Updated: January 15, 2026</p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of Manal Healthcare&apos;s services and website. 
            By accessing our services, you agree to be bound by these Terms. Please read them carefully.
          </p>

          <h2>1. Definitions</h2>

          <p>In these Terms:</p>
          <ul>
            <li><strong>&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;</strong> refers to Manal Healthcare</li>
            <li><strong>&quot;Services&quot;</strong> refers to medical tourism facilitation, coordination, and related services</li>
            <li><strong>&quot;Client,&quot; &quot;you,&quot; &quot;your&quot;</strong> refers to the person using our services</li>
            <li><strong>&quot;Medical Provider&quot;</strong> refers to hospitals, doctors, and healthcare professionals</li>
            <li><strong>&quot;Website&quot;</strong> refers to manalhealthcare.com and all associated subdomains</li>
          </ul>

          <h2>2. Acceptance of Terms</h2>

          <p>
            By using our services or website, you acknowledge that you have read, understood, and agree to be bound by 
            these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use our services.
          </p>

          <h2>3. Nature of Services</h2>

          <h3>3.1 Facilitation Services</h3>
          <p>
            Manal Healthcare provides medical tourism facilitation services, including but not limited to:
          </p>
          <ul>
            <li>Connecting clients with medical providers</li>
            <li>Coordinating appointments and treatment schedules</li>
            <li>Arranging travel and accommodation</li>
            <li>Providing translation and interpretation services</li>
            <li>Assisting with documentation and visa processes</li>
            <li>Offering post-treatment follow-up support</li>
          </ul>

          <h3>3.2 Not a Healthcare Provider</h3>
          <p>
            <strong>Important:</strong> Manal Healthcare is NOT a healthcare provider. We do not:
          </p>
          <ul>
            <li>Provide medical advice, diagnosis, or treatment</li>
            <li>Practice medicine or provide clinical services</li>
            <li>Make medical decisions on your behalf</li>
            <li>Guarantee medical outcomes or results</li>
          </ul>
          <p>
            All medical care is provided by independent, licensed medical professionals and facilities. Medical 
            decisions should be made in consultation with qualified healthcare providers.
          </p>

          <h2>4. Client Responsibilities</h2>

          <h3>4.1 Accurate Information</h3>
          <p>You agree to:</p>
          <ul>
            <li>Provide complete and accurate personal and medical information</li>
            <li>Update information promptly if circumstances change</li>
            <li>Disclose all relevant medical history, conditions, and medications</li>
            <li>Provide valid identification and travel documents</li>
          </ul>

          <h3>4.2 Medical Decision-Making</h3>
          <p>You acknowledge that:</p>
          <ul>
            <li>You are ultimately responsible for your healthcare decisions</li>
            <li>You should seek independent medical advice</li>
            <li>You should verify credentials of medical providers</li>
            <li>You understand risks associated with medical procedures</li>
          </ul>

          <h3>4.3 Compliance</h3>
          <p>You agree to:</p>
          <ul>
            <li>Follow all medical advice and treatment plans</li>
            <li>Comply with laws of your home country and destination country</li>
            <li>Obtain necessary visas and travel documents</li>
            <li>Maintain valid travel insurance</li>
            <li>Respect hospital rules and policies</li>
          </ul>

          <h2>5. Fees and Payment</h2>

          <h3>5.1 Service Fees</h3>
          <p>
            Our facilitation services may involve fees which will be clearly communicated before you commit to services. 
            Fees may include:
          </p>
          <ul>
            <li>Consultation and coordination fees</li>
            <li>Medical record review fees</li>
            <li>Administrative processing fees</li>
            <li>Commission from partner hospitals (transparent disclosure)</li>
          </ul>

          <h3>5.2 Medical Costs</h3>
          <p>
            Medical costs are separate from our service fees and are paid directly to medical providers. We provide 
            cost estimates but:
          </p>
          <ul>
            <li>Final costs may vary based on treatment complexity</li>
            <li>Additional procedures or complications may increase costs</li>
            <li>Exchange rate fluctuations may affect costs</li>
            <li>You are responsible for all medical expenses</li>
          </ul>

          <h3>5.3 Payment Terms</h3>
          <ul>
            <li>Payment schedules will be specified in service agreements</li>
            <li>Deposits may be required to secure appointments</li>
            <li>Cancellation policies apply to refunds (see Section 7)</li>
            <li>Disputed charges must be reported within 30 days</li>
          </ul>

          <h2>6. Booking and Reservations</h2>

          <h3>6.1 Appointment Scheduling</h3>
          <p>
            We coordinate appointments with medical providers on your behalf. However:
          </p>
          <ul>
            <li>Appointments are subject to provider availability</li>
            <li>Providers may reschedule due to emergencies or circumstances beyond control</li>
            <li>We will notify you promptly of any changes</li>
            <li>You should arrive punctually for scheduled appointments</li>
          </ul>

          <h3>6.2 Travel Arrangements</h3>
          <p>
            When we assist with travel bookings:
          </p>
          <ul>
            <li>We act as an intermediary between you and service providers</li>
            <li>Airlines, hotels, and other providers have their own terms and conditions</li>
            <li>Cancellation and change policies vary by provider</li>
            <li>Travel insurance is strongly recommended</li>
          </ul>

          <h2>7. Cancellation and Refund Policy</h2>

          <h3>7.1 Client-Initiated Cancellation</h3>
          <p>
            If you cancel services:
          </p>
          <ul>
            <li><strong>More than 30 days before treatment:</strong> Full refund minus administrative fees</li>
            <li><strong>15-30 days before treatment:</strong> 50% refund of service fees</li>
            <li><strong>Less than 15 days before treatment:</strong> No refund of service fees</li>
            <li><strong>After treatment begins:</strong> No refund</li>
          </ul>
          <p>
            Medical provider fees, travel costs, and other third-party expenses are subject to their respective 
            cancellation policies.
          </p>

          <h3>7.2 Provider-Initiated Cancellation</h3>
          <p>
            If a medical provider cancels:
          </p>
          <ul>
            <li>We will attempt to reschedule or find alternative providers</li>
            <li>If rescheduling is not possible, full refund will be provided</li>
            <li>We are not liable for consequential damages or expenses</li>
          </ul>

          <h3>7.3 Force Majeure</h3>
          <p>
            Cancellations due to circumstances beyond our control (natural disasters, pandemics, war, etc.) will be 
            handled on a case-by-case basis with maximum flexibility for rescheduling or refunds.
          </p>

          <h2>8. Limitations of Liability</h2>

          <h3>8.1 Medical Outcomes</h3>
          <p>
            We do NOT guarantee:
          </p>
          <ul>
            <li>Successful treatment outcomes</li>
            <li>Absence of complications or side effects</li>
            <li>Specific medical results</li>
            <li>Complete recovery or cure</li>
          </ul>
          <p>
            All medical procedures carry inherent risks. Outcomes depend on many factors including your health status, 
            medical provider skill, and post-treatment care.
          </p>

          <h3>8.2 Third-Party Services</h3>
          <p>
            We coordinate with third-party service providers but are not responsible for:
          </p>
          <ul>
            <li>Medical malpractice or negligence by healthcare providers</li>
            <li>Airline delays or cancellations</li>
            <li>Hotel quality or service issues</li>
            <li>Actions or omissions of independent contractors</li>
          </ul>

          <h3>8.3 Maximum Liability</h3>
          <p>
            To the maximum extent permitted by law, our liability for any claim shall not exceed the amount you paid 
            for our services. We are not liable for indirect, consequential, or punitive damages.
          </p>

          <h2>9. Medical Records and Privacy</h2>

          <p>
            Your medical information is handled according to our Privacy Policy. By using our services, you consent to:
          </p>
          <ul>
            <li>Sharing medical information with medical providers involved in your care</li>
            <li>Transfer of medical records between facilities</li>
            <li>Storage of records in secure, encrypted systems</li>
            <li>Use of information for coordination and follow-up care</li>
          </ul>

          <h2>10. Intellectual Property</h2>

          <h3>10.1 Website Content</h3>
          <p>
            All content on our website (text, images, logos, etc.) is owned by Manal Healthcare or licensed to us. 
            You may not:
          </p>
          <ul>
            <li>Copy, reproduce, or distribute content without permission</li>
            <li>Use our trademarks or logos without authorization</li>
            <li>Modify or create derivative works</li>
            <li>Use content for commercial purposes</li>
          </ul>

          <h3>10.2 User-Generated Content</h3>
          <p>
            If you submit testimonials, reviews, or feedback:
          </p>
          <ul>
            <li>You grant us license to use, display, and distribute such content</li>
            <li>You represent that content is accurate and does not violate rights of others</li>
            <li>We may edit or remove inappropriate content</li>
            <li>You remain responsible for content you post</li>
          </ul>

          <h2>11. Warranties and Disclaimers</h2>

          <h3>11.1 Limited Warranty</h3>
          <p>We warrant that:</p>
          <ul>
            <li>Our services will be performed with reasonable care and skill</li>
            <li>We will make good faith efforts to coordinate quality healthcare</li>
            <li>We will maintain confidentiality of your information</li>
          </ul>

          <h3>11.2 Disclaimer of Warranties</h3>
          <p>
            EXCEPT AS EXPRESSLY STATED, SERVICES ARE PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR 
            IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR PARTICULAR PURPOSE, OR 
            NON-INFRINGEMENT.
          </p>

          <h2>12. Indemnification</h2>

          <p>
            You agree to indemnify and hold harmless Manal Healthcare, its officers, directors, employees, and agents 
            from any claims, damages, losses, or expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your violation of these Terms</li>
            <li>Your violation of any laws or regulations</li>
            <li>Your medical treatment or care</li>
            <li>Inaccurate information provided by you</li>
            <li>Your interaction with medical providers</li>
          </ul>

          <h2>13. Dispute Resolution</h2>

          <h3>13.1 Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to 
            conflict of law principles.
          </p>

          <h3>13.2 Arbitration</h3>
          <p>
            Any disputes arising from these Terms or our services shall be resolved through binding arbitration in 
            accordance with the Arbitration and Conciliation Act, 1996. Arbitration shall be conducted in English in 
            [City], India.
          </p>

          <h3>13.3 Class Action Waiver</h3>
          <p>
            You agree to resolve disputes individually and waive the right to participate in class actions or 
            representative proceedings.
          </p>

          <h2>14. Termination</h2>

          <h3>14.1 Termination by Client</h3>
          <p>
            You may terminate services at any time subject to cancellation policies outlined in Section 7.
          </p>

          <h3>14.2 Termination by Us</h3>
          <p>We may terminate services if:</p>
          <ul>
            <li>You violate these Terms</li>
            <li>You provide false or misleading information</li>
            <li>You engage in abusive or threatening behavior</li>
            <li>You fail to pay required fees</li>
            <li>Continuing services would violate laws or regulations</li>
          </ul>

          <h3>14.3 Effect of Termination</h3>
          <p>
            Upon termination:
          </p>
          <ul>
            <li>Outstanding fees remain due and payable</li>
            <li>We will provide copies of your medical records upon request</li>
            <li>Confidentiality obligations continue</li>
            <li>Provisions intended to survive termination remain in effect</li>
          </ul>

          <h2>15. Medical Emergencies</h2>

          <p className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <strong>IMPORTANT:</strong> In case of medical emergency, immediately call local emergency services 
            (dial 108 or 102 in India) or go to the nearest emergency room. Do not rely solely on our services for 
            emergency medical assistance.
          </p>

          <h2>16. Insurance</h2>

          <p>
            We strongly recommend that all clients:
          </p>
          <ul>
            <li>Maintain comprehensive travel insurance</li>
            <li>Obtain medical tourism insurance if available</li>
            <li>Verify insurance coverage for treatment abroad</li>
            <li>Understand limitations and exclusions of policies</li>
          </ul>
          <p>
            We can provide guidance on insurance options but are not insurance providers and make no representations 
            about insurance coverage.
          </p>

          <h2>17. Consent for Treatment</h2>

          <p>
            While we coordinate appointments:
          </p>
          <ul>
            <li>You must provide informed consent directly to medical providers</li>
            <li>You should fully understand procedures, risks, and alternatives</li>
            <li>You have the right to refuse or withdraw consent</li>
            <li>We facilitate but do not obtain medical consent on your behalf</li>
          </ul>

          <h2>18. Communication</h2>

          <p>
            By using our services, you consent to:
          </p>
          <ul>
            <li>Electronic communications regarding your care</li>
            <li>SMS and WhatsApp messages for coordination</li>
            <li>Email correspondence</li>
            <li>Phone calls as necessary for service delivery</li>
          </ul>
          <p>
            You may opt out of marketing communications but cannot opt out of service-related communications.
          </p>

          <h2>19. Modifications to Terms</h2>

          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the 
            website with an updated &quot;Last Updated&quot; date. Continued use of services after changes constitutes 
            acceptance. For material changes, we will provide additional notice.
          </p>

          <h2>20. Severability</h2>

          <p>
            If any provision of these Terms is found to be invalid or unenforceable, that provision shall be limited 
            or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force 
            and effect.
          </p>

          <h2>21. Entire Agreement</h2>

          <p>
            These Terms, together with our Privacy Policy and any service-specific agreements, constitute the entire 
            agreement between you and Manal Healthcare regarding our services.
          </p>

          <h2>22. Contact Information</h2>

          <p>For questions about these Terms, please contact us:</p>

          <div className="bg-gray-50 p-6 rounded-lg my-6">
            <p><strong>Manal Healthcare</strong></p>
            <p>Email: legal@manalhealthcare.com</p>
            <p>Phone: +91-XXX-XXX-XXXX</p>
            <p>Address: [Company Address]</p>
          </div>

          <h2>23. Acknowledgment</h2>

          <p>
            BY USING OUR SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE 
            TERMS AND CONDITIONS.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Medical Disclaimer</h3>
            <p className="text-gray-700 text-sm mb-2">
              Manal Healthcare is a medical tourism facilitator, not a medical provider. All medical services are 
              provided by independent, licensed healthcare professionals and facilities. We do not provide medical 
              advice, make diagnoses, or guarantee medical outcomes.
            </p>
            <p className="text-gray-700 text-sm">
              Always consult qualified healthcare professionals for medical decisions. Seek independent medical 
              opinions and verify credentials of all healthcare providers.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Rights</h3>
            <p className="text-gray-700 text-sm">
              You have the right to ask questions, seek clarification, obtain copies of agreements, and understand 
              all terms before committing to services. If anything is unclear, please contact us before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
