import { Treatment } from '../../types';

interface SEOContentProps {
  treatment: Treatment;
}

export default function SEOContent({ treatment }: SEOContentProps) {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto prose prose-lg">
          {/* Main SEO Content */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comprehensive {treatment.title} at Manal Healthcare
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                At Manal Healthcare, we specialize in providing world-class {treatment.title.toLowerCase()} services 
                using the most advanced medical technology and evidence-based practices. Our team of board-certified 
                {' '}{treatment.category.toLowerCase()} specialists brings decades of combined experience to ensure 
                optimal patient outcomes and satisfaction.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Understanding {treatment.title}
              </h3>
              <p>
                {treatment.title} is a specialized medical procedure designed to address specific health conditions 
                within the field of {treatment.category.toLowerCase()}. This treatment has helped thousands of patients 
                improve their quality of life through minimally invasive techniques and comprehensive post-operative care.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Advanced Technology and Expert Care
              </h3>
              <p>
                Our state-of-the-art medical facilities are equipped with cutting-edge technology specifically designed 
                for {treatment.category.toLowerCase()} procedures. We utilize advanced imaging systems, precision surgical 
                instruments, and computer-assisted navigation to ensure the highest level of accuracy and safety during 
                every procedure.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Comprehensive Patient Support
              </h3>
              <p>
                From your initial consultation through recovery and follow-up care, our dedicated medical team provides 
                comprehensive support every step of the way. We believe in personalized medicine, taking the time to 
                understand your unique needs, medical history, and treatment goals to develop a customized care plan 
                that&apos;s right for you.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Why Patients Choose Manal Healthcare
              </h3>
              <p>
                Patients from across the region choose Manal Healthcare for {treatment.title.toLowerCase()} because of 
                our commitment to excellence, compassionate care, and proven track record of successful outcomes. Our 
                multidisciplinary approach ensures that you receive coordinated care from a team of specialists working 
                together to achieve the best possible results.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Insurance and Accessibility
              </h3>
              <p>
                We work with most major insurance providers to make {treatment.title.toLowerCase()} accessible to patients 
                who need it. Our dedicated billing specialists will work with your insurance company to maximize your 
                coverage and help you understand your financial responsibilities before treatment begins.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Schedule Your Consultation Today
              </h3>
              <p>
                If you&apos;re considering {treatment.title.toLowerCase()}, we encourage you to schedule a consultation 
                with one of our experienced {treatment.category.toLowerCase()} specialists. During your visit, we&apos;ll 
                perform a comprehensive evaluation, discuss your treatment options, answer all your questions, and help 
                you make an informed decision about your healthcare.
              </p>

              <div className="mt-8 p-6 bg-[#209f00]/10 rounded-xl border border-[#209f00]/20">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Ready to Take the Next Step?
                </h4>
                <p className="text-gray-700 mb-4">
                  Contact Manal Healthcare today to learn more about {treatment.title.toLowerCase()} and schedule 
                  your consultation with our expert medical team.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-[#209f00] text-white rounded-full font-semibold hover:bg-[#1a8000] transition-colors"
                  >
                    Request Appointment
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center px-6 py-3 bg-white border-2 border-[#209f00] text-[#209f00] rounded-full font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Call: (123) 456-7890
                  </a>
                </div>
              </div>

              {/* Additional SEO Keywords */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Related Services and Specialties
                </h3>
                <p className="text-gray-600 text-sm">
                  Our {treatment.category.toLowerCase()} department also offers a comprehensive range of related 
                  services including diagnostic imaging, pre-operative consultations, post-operative rehabilitation, 
                  pain management, and long-term follow-up care. We are committed to providing integrated healthcare 
                  solutions that address all aspects of your treatment and recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
