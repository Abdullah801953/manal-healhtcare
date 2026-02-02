import { Clock, Phone, MapPin, Mail } from 'lucide-react';

const visitingHours = [
  { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Emergency', hours: '24/7 Available' },
];

export default function VisitingInfo() {
  return (
    <section className="py-16 bg-gray-50 px-3 xs:px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Visit Us
            </h2>
            <p className="text-gray-600 text-lg">
              Important information for patients and visitors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Visiting Hours */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-[#209f00]" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Visiting Hours
                </h3>
              </div>
              <div className="space-y-4">
                {visitingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-900">
                      {schedule.day}
                    </span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Visiting hours may vary by department. Please check with the nursing station for specific restrictions.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <Phone className="w-6 h-6 text-[#209f00]" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Contact Us
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#209f00] mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Main Line</div>
                      <a href="tel:+1234567890" className="text-[#209f00] hover:underline">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Emergency</div>
                      <a href="tel:911" className="text-red-500 hover:underline">
                        911 or (123) 456-7899
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#209f00] mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <a href="mailto:info@hospital.com" className="text-[#209f00] hover:underline">
                        info@hospital.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#209f00] mt-1" />
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <p className="text-gray-600">
                        123 Healthcare Blvd<br />
                        Medical District, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-linear-to-br from-[#209f00] to-emerald-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-white/90 mb-6">
                  Our emergency department is open 24/7 for urgent medical care
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:911"
                    className="block text-center px-6 py-3 bg-white text-[#209f00] rounded-full font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Call Emergency: 911
                  </a>
                  <a
                    href="/contact"
                    className="block text-center px-6 py-3 bg-white/10 border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
                  >
                    Request Appointment
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
