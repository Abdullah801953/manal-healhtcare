import { Hospital } from '../../types';

interface SEOContentProps {
  hospital: Hospital;
}

export default function HospitalSEOContent({ hospital }: SEOContentProps) {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto prose prose-lg">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              About {hospital.name}
            </h2>
            
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                {hospital.name} is a {hospital.type.toLowerCase()} located in {hospital.city}, {hospital.state}, 
                serving patients since {hospital.established}. With {hospital.beds} beds and a team of highly qualified 
                medical professionals, we provide comprehensive healthcare services across multiple specialties.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Comprehensive Healthcare Services
              </h3>
              <p>
                Our hospital specializes in {hospital.specialties.join(', ')}, offering state-of-the-art medical care 
                with advanced diagnostic and treatment facilities. We are committed to delivering patient-centered care 
                with compassion, expertise, and the latest medical technology.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Accredited Excellence
              </h3>
              <p>
                {hospital.name} is accredited by {hospital.accreditations.join(', ')}, demonstrating our commitment 
                to maintaining the highest standards of patient care, safety, and quality. Our accreditations reflect 
                our dedication to continuous improvement and adherence to best practices in healthcare delivery.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Advanced Medical Facilities
              </h3>
              <p>
                Our facility features {hospital.facilities.length}+ modern amenities and specialized units designed 
                to provide comprehensive care. From advanced diagnostic equipment to comfortable patient rooms, every 
                aspect of our facility is designed with patient comfort and safety in mind.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Expert Medical Departments
              </h3>
              <p>
                With {hospital.specialties.length} specialized departments, our multidisciplinary team of physicians, 
                nurses, and healthcare professionals work collaboratively to provide integrated care. Each department 
                is equipped with specialized resources and staffed by experts in their respective fields.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Patient-Centered Approach
              </h3>
              <p>
                At {hospital.name}, we believe in treating the whole person, not just the illness. Our patient-centered 
                approach ensures that each individual receives personalized care tailored to their unique needs, preferences, 
                and circumstances. We strive to make every patient&apos;s experience as comfortable and stress-free as possible.
              </p>

              {hospital.emergency && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    24/7 Emergency Services
                  </h3>
                  <p>
                    Our emergency department operates around the clock, providing immediate medical attention for urgent 
                    and life-threatening conditions. Equipped with advanced life-saving equipment and staffed by experienced 
                    emergency medicine specialists, we are prepared to handle any medical emergency.
                  </p>
                </>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Community Commitment
              </h3>
              <p>
                As a trusted healthcare provider in {hospital.city}, we are deeply committed to improving the health 
                and well-being of our community. Through health education programs, preventive care initiatives, and 
                community outreach, we work to promote wellness and healthy living for all residents.
              </p>

              <div className="mt-8 p-6 bg-[#209f00]/10 rounded-xl border border-[#209f00]/20">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Schedule Your Visit
                </h4>
                <p className="text-gray-700 mb-4">
                  Contact {hospital.name} today to schedule an appointment, tour our facilities, or learn more 
                  about our comprehensive healthcare services. Visit our facility in {hospital.city}, {hospital.state}.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Choose {hospital.name}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#209f00] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Highly qualified medical professionals with extensive experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#209f00] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>State-of-the-art medical technology and equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#209f00] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive range of medical specialties and services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#209f00] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Patient-centered care with focus on comfort and dignity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-[#209f00] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Accredited facility meeting highest quality standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
